'use strict';

module.exports = function (router) {

    // show cart
    router.get('/', function (req, res) {

        // get cart from session
        var cart = req.session.cart;
        var cartItems = [];
        var cartTotal = 0;

        // populate cart items
        for (item in cart) {
            cartItems.push(cart[item]);
            cartTotal += cart[item].qty * cart[item].price;
        }

        // set model for view
        var displayCart = {
            items: cartItems,
            total: cartTotal
        }

        var model = {
            cart: displayCart,
            title: "Cart",
            activeNav: "cart"
        };

        res.render('cart/index', model);
    });

};