// Адрес API. Если у вашего инстанса другой хост (например https://7103.api.greenapi.com),
// замените его здесь (смотрите в личном кабинете GREEN-API).
const API_URL = "https://api.green-api.com";

const $ = id => document.getElementById(id);
const out = $("out");

// Вывод ответа в поле только для чтения
function show(data) {
  out.value = typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

// Номер -> chatId в формате GREEN-API (77771234567@c.us)
function chatId(raw) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) throw new Error("Введите номер телефона (только цифры, с кодом страны)");
  return digits + "@c.us";
}

// Универсальный вызов метода: без body это GET, с body это POST
async function call(method, body) {
  const id = $("idInstance").value.trim();
  const token = $("apiToken").value.trim();
  if (!id || !token) throw new Error("Заполните idInstance и ApiTokenInstance");

  const url = `${API_URL}/waInstance${id}/${method}/${token}`;
  const res = await fetch(url, body ? {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  } : { method: "GET" });

  const text = await res.text();
  try { return JSON.parse(text); } catch { return text || `HTTP ${res.status}`; }
}

// Действия кнопок
const actions = {
  getSettings: () => call("getSettings"),
  getStateInstance: () => call("getStateInstance"),

  sendMessage: () => {
    const message = $("msgText").value;
    if (!message.trim()) throw new Error("Введите текст сообщения");
    return call("sendMessage", { chatId: chatId($("msgPhone").value), message });
  },

  sendFileByUrl: () => {
    const urlFile = $("fileUrl").value.trim();
    if (!/^https?:\/\//.test(urlFile)) throw new Error("Введите корректную ссылку на файл (http/https)");
    const fileName = decodeURIComponent(urlFile.split("?")[0].split("/").pop()) || "file";
    return call("sendFileByUrl", { chatId: chatId($("filePhone").value), urlFile, fileName });
  }
};

// Один обработчик на все кнопки (имя метода берётся из data-act)
document.querySelectorAll("button[data-act]").forEach(btn => {
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    show("Загрузка...");
    try {
      show(await actions[btn.dataset.act]());
    } catch (e) {
      show("Ошибка: " + e.message);
    } finally {
      btn.disabled = false;
    }
  });
});
