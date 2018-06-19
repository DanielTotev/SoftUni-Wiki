const editHelper = require('../utilities/editHelper');

module.exports = {
    getDetails: async (req, res) => {
        try {
            let edit = await editHelper.findById(req.params.id);
            if (!edit) {
                res.locals.globalError = 'Invalid edit';
                res.render('home/index');
            }
            res.render('edits/details', {edit: edit});
        } catch (err) {
            res.locals.globalError = err.message;
            res.render('home/index');
        }
    }
};