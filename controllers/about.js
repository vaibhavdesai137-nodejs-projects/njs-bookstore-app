'use strict';

module.exports = function (router) {

    router.get('/', function (req, res) {
        
        var model = {
            title: "About",
            activeNav: "about"
        };

        res.render('about/index', model);
    });

};