'use strict';
var mongoose = require('mongoose');

var db = function () {

    return {
        config: function (conf) {
            var mongoUri = 'mongodb://' + conf.dbUser + ':' + conf.dbPassword + '@' + conf.dbHost + ':' + conf.dbPort + '/' + conf.dbName;
            mongoose.connect(mongoUri);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'DB connection error: '));
            db.once('open', function callback() {
                console.log('DB connected');
            });
        }
    };
};

module.exports = db();