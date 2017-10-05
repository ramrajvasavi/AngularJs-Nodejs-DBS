class Product{
	
	constructor(productId,productName,size,price,discount,color,category){
		this.productId=productId;
		this.productName=productName;
		this.size=size;
		this.price=price;
		this.discount=discount;
		this.color=color;
		this.category=category;
	}
	
	getProductId(){
		return this.productId;
	}
	
	getProductName(){
		return this.productName;
	}
	
	setProductId(productId){
		this.productId=productId;
	}
	
	toString(){
		return JSON.stringify(this);
	}
}

module.exports=Product;