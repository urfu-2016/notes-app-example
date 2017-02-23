module.exports = (req, res, next) => {
    // Складывать данные в res.locals – рекомендованный способ
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Awesome notes'
    };

    res.locals.title = 'Awesome notes';

    // В бою статику получаем с CDN
    if (process.env.NODE_ENV !== 'local') {
        res.locals.staticBasePath = '//urfu2016-notes.surge.sh';
    }

    next();
};
