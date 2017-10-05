var Product=require("../model/Product");
var HashMap = require('hashmap');
//var rabbitmqconn=require('../messaging/rabbitmqconnection');
var productrepository={
		
		productMap: null,
		
		initializeMap: function(){
			console.log("Initializing the hash map");
			this.productMap=new HashMap();
		},

				
		saveProduct:function(product){
			console.log("save product is called"+product);
			this.productMap.set(product.productId,JSON.stringify(product));
			
		},
		
		getProduct:function(productId){
			console.log("get product is called"+productId);
			return this.productMap.get(productId);
		}
};
productrepository.initializeMap();

var productservice={
		
		productRepo: null,
		
		setProductRepo: function(repo){
			this.productRepo=repo;
		},
		
		getProductRepo:function(){
			return this.productRepo;
		},

		saveProduct:function(product){
			console.log("save product service is called"+product);
			this.getProductRepo().saveProduct(product);
		},
		
		getProduct:function(productId){
			console.log("get product service is called"+productId);
			return this.getProductRepo().getProduct(productId);
		}
		
		
};

productservice.setProductRepo(productrepository);

module.exports=productservice;