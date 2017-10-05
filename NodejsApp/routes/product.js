var express = require('express');
var Product=require('../model/Product');

var productservice=require('../service/product-service');
var router = express.Router();

/* Save the product with the details. */
router.post('/save', function(req, res) {
	
	 console.log("product save is called ");
	
	 var product=new Product(req.body.productId,req.body.productName,req.body.size,req.body.price,req.body.discount,req.body.color,req.body.category);
	 console.log("Product to be saved "+product.toString());
	 productservice.saveProduct(product); 
	 res.setHeader('Content-Type', 'application/json');
	 res.json(JSON.parse(product));
});

/* Get the product with product Id. */
router.get('/get/:productId', function(req, res) {
	
	 console.log("product get is called ");
	 var productId=req.params.productId;
	 console.log("product id is "+productId);
	 var product=productservice.getProduct(productId);
	 console.log("Got the product with product id "+productId+" is "+JSON.stringify(product));
	 
	 res.json(JSON.parse(product));
});

module.exports = router;