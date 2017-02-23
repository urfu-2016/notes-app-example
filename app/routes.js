'use strict';

const pages = require('./controllers/pages');
const notes = require('./controllers/notes');

module.exports = function (app) {
    app.get('/', notes.list);

    app
        .route('/notes')
        .get(notes.list)
        .post(notes.create);

    app.get('/notes/:name([A-z]+)', notes.show);

    app.all('*', pages.error404);
};
