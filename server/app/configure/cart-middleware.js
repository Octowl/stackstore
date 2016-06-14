module.exports = function (app, db) {

    var Order = db.model('order');
    app.use(function (req, res, next) {
        if (req.user) {
            req.user.getOrders({
                    where: {
                        active: true
                    }
                })
                .then(function (orders) {
                    if(orders.length) {
                        return orders[0].id;
                    } else {
                        return req.session.cart;
                    }
                })
                .then(function(cartId){
                    req.session.cart = cartId;
                    next();
                })
                .catch(next);
        } else if (!req.session.cart) {
            Order.create()
                .then(function (cart) {
                    req.session.cart = cart.id;
                    next();
                })
                .catch(next);
        } else next();
    })

    //deserialize cart
    function deserializeCart(id) {
        return Order.findById(id);
    }

    app.use(function (req, res, next) {
        deserializeCart(req.session.cart)
            .then(function (cart) {
                req.cart = cart;
                if(req.user) return req.cart.setUser(req.user)
            })
            .then(function(){
                next();
            })
            .catch(next);
    })

    app.get('/cart', function (req, res, next) {
        res.send(req.cart);
    })
}
