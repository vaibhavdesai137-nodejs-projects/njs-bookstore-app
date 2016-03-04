'use strict';

var mongoose = require('mongoose');

var categoryModel = function () {

    var categorySchema = new mongoose.Schema({
        title: String
    });

    return mongoose.model('categories', categorySchema);
};

module.exports = new categoryModel();