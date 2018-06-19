const articleHelper = require('../utilities/articleHelper');

module.exports  = {
    index: async (req, res) => {
        let menuStuff = await articleHelper.getSummaryOfLastArticle();
        if(!menuStuff){
            return res.render('home/index');    
        }
        let {summary, articleId, articleTitle} = menuStuff;
        let lastThreeArticles = await articleHelper.getFirstThreeArticles();
        summary = summary.split(' ').slice(0, 50).join(' ') + '...';
        res.render('home/index', {summary, articleId, articleTitle, lastThreeArticles});
    },
    about: (req, res) => {
        res.render('home/about');
    }
};