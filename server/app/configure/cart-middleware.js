module.exports = function (app, db) {

    var Order = db.model('order');
    app.use(function (req, res, next) { // TODO: this is broken
        if (!req.session.cart) {
            Order.create()
                .then(function (cart) {
                    req.session.cart = cart.id;
                    next();
                })
                .catch(next);
        } else if (req.user) {
            req.user.getOrders({
                    where: {
                        active: true
                    }
                })
                .then(function (orders) {
                    if(orders.length) {
                        console.log('ARRAY', orders.length);
                        return orders[0].id;
                    } else {
                        console.log('REQSESSIONCART', req.session.cart);
                        return req.session.cart;
                    }
                })
                .then(function(cartId){
                    req.session.cart = cartId;
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
                //console.log('CART', cart);
                //console.log('REQ.CART', req.cart);
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
