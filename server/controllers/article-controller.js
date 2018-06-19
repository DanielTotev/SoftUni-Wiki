let articleHelper = require('../utilities/articleHelper');
let User = require('mongoose').model('User');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: async (req, res) => {
        let { title, content } = req.body;
        let author = req.user._id;
        try {
            await articleHelper.createArticle(title, content, author);
            res.redirect('/');
        } catch (err) {
            res.locals.globalError = err.message;
            res.render('article/create');
        }
    },
    getAll: async (req, res) => {
        let articles = await articleHelper.getAll();
        res.render('article/all', { articles: articles });
    },
    getDetails: async (req, res) => {
        let { article, edits } = await articleHelper.getDetails(req.params.id);
        let finalEdit = edits[0];
        let contents = finalEdit.content.split('\n\n');
        try {
            let isAdmin = req.user && req.user.roles.includes('Admin');
            let hasEditRights = article.lockedStatus === false && req.user || req.user.roles.includes('Admin');
            res.render('article/details', { article: article, contents: contents, isAdmin: isAdmin, hasEditRights: hasEditRights });
        } catch (err) {
            res.render('article/details', { article: article, contents: contents, isAdmin: false, hasEditRights: false });

        }
    },
    getEdit: async (req, res) => {
        let { article, edits } = await articleHelper.getDetails(req.params.id);
        let finalEdit = edits[0];
        let contents = finalEdit.content.split('\n\n');
        let isAdmin = req.user && req.user.roles.includes('Admin');
        res.render('article/edit', { article: article, contents: contents, isAdmin: isAdmin });
    },
    postEdit: async (req, res) => {
        let { articleId, content } = req.body;
        let author = req.user._id;
        let { article, edits } = await articleHelper.getDetails(req.params.id);
        let finalEdit = edits[0];
        let contents = finalEdit.content.split('\n\n');
        let isAdmin = req.user && req.user.roles.includes('Admin');
        try {
            await articleHelper.update(articleId, content, author);
            res.redirect('/');
        } catch (err) {
            res.locals.globalError = err.message;
            res.render('article/edit', { article: article, contents: contents, isAdmin: isAdmin });
        }
    },
    getHistory: async (req, res) => {
        try {
            let { article, edits } = await articleHelper.getDetails(req.params.articleId);
            for (let edit of edits) {
                edit.author = await User.findById(edit.author);
            }
            res.render('edits/all', { edits: edits, article: article });
        } catch (err) {
            res.locals.globalError = err.message;
            res.render('home/index');
        }
    },
    lock: async (req, res) => {
        let id = req.params.id;
        try {
            articleHelper.lockArticle(id);
            res.redirect('/');
        } catch (err) {
            throw err;
        }
    },
    unlock: async (req, res) => {
        let id = req.params.id;
        try {
            articleHelper.unLockArticle(id);
            res.redirect('/');
        } catch (err) {
            throw err;
        }
    },
    getLast: async (req, res) => {
        let  last  = await articleHelper.getLatestArticle();
        if(!last) {
            return res.send('404 not found');
        }
        res.redirect('/article/details/' + last._id);
    },
    search: async (req, res) => {
        let articles = await articleHelper.search(req.body.filter);
        res.render('article/all', { articles: articles });
    }
};