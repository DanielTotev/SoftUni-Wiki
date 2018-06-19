const express = require('express');

let app = express();

let env = process.env.NODE_ENV || 'development';
const settings = require('./server/config/settings')[env];

require('./server/config/database')(settings);

require('./server/config/express')(app);

require('./server/config/passport')();

require('./server/config/routes')(app);


app.listen(settings.port);