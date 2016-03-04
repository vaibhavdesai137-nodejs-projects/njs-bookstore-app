'use strict';

var Book = require('./../models/bookModel');
var Category = require('./../models/categoryModel');

module.exports = function (router) {

    // all books
    router.get('/', function (req, res) {

        Book.find({}, function (err, books) {

            if (err) throw err;

            books.forEach(function (book) {
                book.shortDesc = book.shortenDesc(50);
            });

            var model = {
                books: books,
                title: "Books",
                activeNav: "books"
            };

            res.render('books/index', model);
        });

    });

    // book details
    router.get('/details/:id', function (req, res) {

        var id = req.params.id;

        var filters = {
            _id: id
        };

        Book.findOne(filters, function (err, book) {

            if (err) throw err;

            var model = {
                book: book,
                title: "Book Details",
                activeNav: "books"
            };

            res.render('books/details', model);
        });

    });

};