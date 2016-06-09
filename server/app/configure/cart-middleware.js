module.exports = function (app, db) {

  var Order = db.model('orders');
  app.use(function(req, res, next){
  	if(!req.session.cart){
  		Order.create()
  		.then(function(cart){
  			req.session.cart = cart.id; 
  			next(); 
  		})
  		.catch(next);
  	}
  	else next();
  })

  //deserialize cart 
  function deserializeCart(id){
  	return Order.findById(id); 
  }

  app.use(function(req, res, next){
  	deserializeCart(req.session.cart)
  	.then(function(cart){
  		req.cart = cart; 
  		next()
  	})
  	.catch(next);
  })

  app.get('/cart', function(req, res, next){
  	res.send(req.cart);
  })
}