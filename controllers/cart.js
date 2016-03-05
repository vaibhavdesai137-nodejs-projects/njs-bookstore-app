'use strict';

var Book = require('./../models/bookModel');

module.exports = function (router) {

    // show cart
    router.get('/', function (req, res) {

        // get cart from session
        var cart = req.session.cart;

        console.log("CART: " + JSON.stringify(cart));

        var cartItems = [];
        var cartGlobalTotal = 0;

        // populate cart items
        for (var item in cart) {
            cartItems.push(cart[item]);
            cartGlobalTotal += cart[item].qty * cart[item].price;
        }

        // set model for view
        var displayCart = {
            items: cartItems,
            globalTotal: cartGlobalTotal
        }

        var model = {
            cart: displayCart,
            title: "Cart",
            activeNav: "cart"
        };

        res.render('cart/index', model);
    });


    // add new book in cart
    router.post('/add/:id', function (req, res) {

        var id = req.params.id;

        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        Book.findOne({
            _id: id
        }, function (err, book) {

            if (err) throw err;

            if (cart[id]) {
                cart[id].qty++;
            } else {
                cart[id] = {
                    id: book._id,
                    title: book.title,
                    price: book.price,
                    qty: 1
                }
            }

            res.location('/cart');
            res.redirect('/cart');

        });
    });

    // delete book from cart
    router.delete('/delete/:id', function (req, res) {

        var id = req.params.id;

        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        if (cart[id]) {
            cart[id] = null;
            delete cart[id];
        }

        res.writeHead(200);
        res.end();

    });

};