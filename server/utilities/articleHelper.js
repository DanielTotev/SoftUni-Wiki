const Article = require('mongoose').model('Article');
const editHelper = require('../utilities/editHelper');

module.exports = {
    createArticle: async (title, content, author) => {
        let edit = await editHelper.create(content, author);
        let article = await Article.create({ title });
        article.edits.push(edit);
        return await article.save();
    },
    getAll: async () => {
        return await Article.find({}).sort({ title: 1 });
    },
    getDetails: async (id) => {
        let article = await Article.findById(id);
        let edits = [];
        //for some reason populate did not work so I used this...
        for(let editId of article.edits) {
            let edit = await editHelper.findById(editId);
            edits.push(edit);
        }
        edits = edits.sort((a, b) => b.creationDate - a.creationDate);
        return { article, edits };
    },
    update: async (articleId, content, author) => {
        let edit = await editHelper.create(content, author);
        let article = await Article.findById(articleId);
        article.edits.push(edit);
        return await article.save();
    },
    getSummaryOfLastArticle: async () => {
        let articles = await Article.find({});
        if(!articles || articles.length == 0) {
            return;
        }
        let article = articles[articles.length - 1];
        let edits = [];
        for(let editId of article.edits) {
            let edit = await editHelper.findById(editId);
            edits.push(edit);
        }
        edits = edits.sort((a, b) => b.creationDate - a.creationDate);
        let latestEdit = edits[0];

        return {summary: latestEdit.content,articleId: article._id, articleTitle: article.title};
    },

    getFirstThreeArticles: async () => {
        let articles = await Article.find({}).sort();
        let articlesToReturn = [];
        for(let i = articles.length - 1; i >= 0; i--) {
            articlesToReturn.push(articles[i]);
            if(articlesToReturn.length === 3){
                break;
            }
        }
        return articlesToReturn;
    },
    lockArticle: async (id) => {
        let article = await Article.findById(id);
        article.lockedStatus = true;
        return await article.save();
    },
    unLockArticle: async (id) => {
        let article = await Article.findById(id);
        article.lockedStatus = false;
        return await article.save();
    },
    getLatestArticle: async () => {
        let articles = await Article.find({});
        if(!articles || articles.length == 0) {
            return;
        }
        let last = articles[articles.length - 1];
        let lastEditId = last.edits[last.edits.length - 1];
        let edit = await editHelper.findById(lastEditId);
        return last;
    },
    search: async (filter) => {
        let articles = await Article.find({});
        let articlesToSend = [];
        for(let article of articles){
            if(article.title.toLowerCase().includes(filter.toLowerCase())) {
                articlesToSend.push(article);
            }
        }
        return articlesToSend;
    }
};