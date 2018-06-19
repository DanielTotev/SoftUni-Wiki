const controllers = require('../controllers');
const auth = require('../config/auth');


module.exports = (app) => {
    app.get('/', controllers.home.index);

    app.get('/about', auth.isAuthenticated, controllers.home.about);

    app.get('/user/register', controllers.user.registerGet);
    app.post('/user/register', controllers.user.registerPost);

    app.post('/user/logout', controllers.user.logout);

    app.get('/user/login', controllers.user.loginGet);
    app.post('/user/login', controllers.user.loginPost);

    app.get('/article/create', auth.isAuthenticated, controllers.article.createGet);
    app.post('/article/create', auth.isAuthenticated, controllers.article.createPost);

    app.get('/article/all', controllers.article.getAll);

    app.get('/article/details/:id', controllers.article.getDetails);

    app.get('/article/edit/:id', auth.isAuthenticated, controllers.article.getEdit);
    app.post('/article/edit/:id', auth.isAuthenticated, controllers.article.postEdit);
    
    app.get('/article/:articleId/history', auth.isAuthenticated, controllers.article.getHistory);

    app.get('/article/lock/:id', auth.isInRole('Admin'), controllers.article.lock);
    app.get('/article/unlock/:id', auth.isInRole('Admin'), controllers.article.unlock);

    app.post('/search', controllers.article.search);

    app.get('/article/latest', controllers.article.getLast);

    app.get('/edit/details/:id', auth.isAuthenticated, controllers.edit.getDetails);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not found');
    });
};