const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));
let port = process.env.PORT || 1337;
let db = 'mongodb://localhost:27017/test';

module.exports = {
    development: {
        rootPath,
        port,
        db
    },

    production: {}
};