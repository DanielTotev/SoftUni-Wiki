const mongoose = require('mongoose');
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';


let articleSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    lockedStatus: { type: mongoose.Schema.Types.Boolean, default: false },
    edits: {type: [mongoose.Schema.Types.ObjectId], ref: 'Edit'}
});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;