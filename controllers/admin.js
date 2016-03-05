'use strict';

var Book = require('./../models/bookModel');
var Category = require('./../models/categoryModel');

var availableBookCovers = [
    "mongo1.jpg",
    "mongo2.jpg",
    "mongo3.jpg",
    "mongo4.jpg",
    "node1.jpg",
    "node2.jpg",
    "node3.jpg",
    "node4.jpg",
    "php1.jpg",
    "php2.jpg",
    "php3.jpg",
    "php4.jpg"
];

module.exports = function (router) {

    // dashboard
    router.get('/', function (req, res) {

        var model = {
            title: "Manage Books",
            activeNav: "dashboard"
        };

        res.render('admin/index', model);
    });

    // all books
    router.get('/books', function (req, res) {

        Book.find({}, function (err, books) {

            if (err) throw err;

            var model = {
                books: books,
                title: "Manage Books",
                activeNav: "books"
            };

            res.render('admin/books/index', model);
        });
    });

    // show add book page
    router.get('/books/add', function (req, res) {

        Category.find({}, function (err, categories) {
            res.render('admin/books/add', {
                categories: categories,
                title: 'Add Book',
                activeNav: "books"
            });
        });

    });

    // add new book
    router.post('/books', function (req, res) {

        var bookTitle = req.body.bookTitle && req.body.bookTitle.trim();
        var bookCategory = req.body.bookCategory && req.body.bookCategory.trim();
        var bookDesc = req.body.bookDesc && req.body.bookDesc.trim();
        var bookAuthor = req.body.bookAuthor && req.body.bookAuthor.trim();
        var bookPublisher = req.body.bookPublisher && req.body.bookPublisher.trim();
        var bookPrice = req.body.bookPrice && req.body.bookPrice.trim();
        var bookCover = req.body.bookCover && req.body.bookCover.trim();

        if (availableBookCovers.indexOf(bookCover) < 0) {
            bookCover = "default.jpg";
        }

        var newBook = new Book({
            title: bookTitle,
            category: bookCategory,
            desc: bookDesc,
            author: bookAuthor,
            publisher: bookPublisher,
            price: bookPrice,
            cover: bookCover
        });

        newBook.save(function (err) {

            if (err) throw err;

            req.flash('success', 'Book successfully added');
            res.location('/admin/books');
            res.redirect('/admin/books');

        });
    });

    // show edit book page
    router.get('/books/edit/:id', function (req, res) {
        var id = req.params.id;
        Book.findOne({
            _id: id
        }, function (err, book) {

            if (err) throw err;

            Category.find({}, function (err, categories) {
                var model = {
                    book: book,
                    categories: categories,
                    title: "Edit Book",
                    activeNav: "books"
                };

                res.render('admin/books/edit', model);
            });

        });

    });

    // edit book
    router.post('/books/edit/:id', function (req, res) {

        var id = req.params.id;
        var bookTitle = req.body.bookTitle && req.body.bookTitle.trim();
        var bookCategory = req.body.bookCategory && req.body.bookCategory.trim();
        var bookDesc = req.body.bookDesc && req.body.bookDesc.trim();
        var bookAuthor = req.body.bookAuthor && req.body.bookAuthor.trim();
        var bookPublisher = req.body.bookPublisher && req.body.bookPublisher.trim();
        var bookPrice = req.body.bookPrice && req.body.bookPrice.trim();
        
        Book.update({
            _id: id
        }, {
            title: bookTitle,
            category: bookCategory,
            desc: bookDesc,
            author: bookAuthor,
            publisher: bookPublisher,
            price: bookPrice,
            cover: bookCover
        }, function (err) {

            if (err) throw err;

            req.flash('success', 'Book successfully saved');
            res.location('/admin/books');
            res.redirect('/admin/books');

        });

    });

    // delete book
    router.delete('/books/delete/:id', function (req, res) {

        var id = req.params.id;

        Book.remove({
            _id: id
        }, function (err) {

            if (err) throw err;

            req.flash('success', 'Book successfully deleted');
            res.writeHead(200);
            res.end();

        });

    });

    // all categories
    router.get('/categories', function (req, res) {

        Category.find({}, function (err, categories) {

            if (err) throw err;

            var model = {
                categories: categories,
                title: "Manage Categories",
                activeNav: "categories"
            };

            res.render('admin/categories/index', model);
        });
    });

    // show add category page
    router.get('/categories/add', function (req, res) {
        res.render('admin/categories/add', {
            title: 'Add Categories',
            activeNav: "categories"
        });
    });

    // add new category
    router.post('/categories', function (req, res) {

        var categoryTitle = req.body.categoryTitle && req.body.categoryTitle.trim();

        var newCategory = new Category({
            title: categoryTitle
        });

        newCategory.save(function (err) {

            if (err) throw err;

            req.flash('success', 'Category successfully added');
            res.location('/admin/categories');
            res.redirect('/admin/categories');

        });

    });

    // show edit category page
    router.get('/categories/edit/:id', function (req, res) {
        var id = req.params.id;
        Category.findOne({
            _id: id
        }, function (err, category) {

            if (err) throw err;

            var model = {
                category: category,
                title: "Edit Categories",
                activeNav: "categories"
            };

            res.render('admin/categories/edit', model);
        });
    });

    // edit category
    router.post('/categories/edit/:id', function (req, res) {

        var id = req.params.id;
        var categoryTitle = req.body.categoryTitle && req.body.categoryTitle.trim();

        Category.update({
            _id: id
        }, {
            title: categoryTitle
        }, function (err) {

            if (err) throw err;

            req.flash('success', 'Category successfully saved');
            res.location('/admin/categories');
            res.redirect('/admin/categories');

        });

    });

    // delete category
    router.delete('/categories/delete/:id', function (req, res) {

        var id = req.params.id;

        Category.remove({
            _id: id
        }, function (err) {

            if (err) throw err;

            req.flash('success', 'Category successfully deleted');
            res.writeHead(200);
            res.end();

        });

    });

};