'use strict';

var express = require('express');
var kraken = require('kraken-js');
var flash = require('connect-flash');
var lusca = require('lusca');
var expressMessages = require('express-messages');
var db = require('./lib/db');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        db.config(config.get('dbConfig'));
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

// flash
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = expressMessages(req, res);
    next();
});

app.use(lusca({
    csrf: false
}));

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
    console.log('DB details: %s', JSON.stringify(app.kraken.get('dbConfig')));
});
