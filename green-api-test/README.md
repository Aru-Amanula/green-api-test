# GREEN-API: тестовое задание

HTML-страница для вызова методов GREEN-API: `getSettings`, `getStateInstance`, `sendMessage`, `sendFileByUrl`.

**Демо:** https://ВАШ-НИК.github.io/green-api-test/

## Как пользоваться
1. Создайте инстанс на [green-api.com](https://green-api.com) (тариф WhatsApp: Developer) и подключите номер через QR-код.
2. Откройте страницу и введите `idInstance` и `ApiTokenInstance` из личного кабинета.
3. Нажимайте кнопки методов, ответ появляется в поле «Ответ».
4. Для `sendMessage` и `sendFileByUrl` вводите номер цифрами с кодом страны, без «+» (например `77771234567`).
   Для `sendFileByUrl` нужна прямая ссылка на файл.

## Структура
```
index.html     разметка страницы
css/style.css  оформление
js/app.js      вызовы API и обработка ответов
```

## Технологии
HTML, CSS, JavaScript (fetch API), без фреймворков. Данные подключения не хранятся: токен вводится только в браузере.
