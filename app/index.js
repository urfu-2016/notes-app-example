'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');

const app = express();

// Закрепляем набор необходимых директорий
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

// Подключаем шаблонизатор и определяем директории, где будут храниться шаблоны
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Логируем запросы к приложению
app.use(morgan('dev'));

// Отдаём статичные файлы. Например, файл со стилями
// Но только локально, в бою используем CDN
// NODE_ENV в Heroku будет равен production
// Локально NODE_ENV мы определяеи в package.json
if (process.env.NODE_ENV === 'local') {
    app.use(express.static(publicDir));
}

// Разбираем тело POST запроса, чтобы сохранить заметку
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Записываем ошибку, если не смогли разобрать POST запрос, и продолжаем работу
app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */

    console.error(err.stack);

    next();
});

// Собираем общие данные для всех страниц приложения
app.use(require('./midwares/common-data'));

// Подключаем маршруты
require('./routes')(app);

// Записываем фатальную ошибку в лог, пользователю отвечаем с кодом 500
app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */

    console.error(err.stack);

    res.sendStatus(500);
});

// Запускаем сервер
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);

    if (process.env.NODE_ENV === 'local') {
        console.info(`Open http://localhost:${port}/ to view service`);
    }
});
