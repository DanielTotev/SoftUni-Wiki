const Edit = require('mongoose').model('Edit');

module.exports = {
    create: async (content, author) => {
        return await Edit.create({content, author});
    },
    findById: async (id) => {
        return await Edit.findById(id);
    }
}