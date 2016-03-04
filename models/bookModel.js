'use strict';

var mongoose = require('mongoose');

var bookModel = function () {

    var bookSchema = new mongoose.Schema({
        title: String,
        category: String,
        desc: String,
        author: String,
        publisher: String,
        price: Number,
        cover: String
    });

    bookSchema.methods.shortenDesc = function (length) {
        
        if (this.desc.length > length) {
            return this.desc.substr(0, length) + "...";
        }

        return this.desc;
    }

    return mongoose.model('books', bookSchema);
};

module.exports = new bookModel();