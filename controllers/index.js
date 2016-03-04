'use strict';

module.exports = function (router) {

    // redirect
    router.get('/', function (req, res) {
        res.location('/books');
        res.redirect('/books');
    });

};
