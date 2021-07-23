import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Products } from 'src/app/common/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Products = new Products();
  
  constructor(private productService:ProductService, private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(()=>{
    this.handleProductDetails();
    })
  }

  handleProductDetails(){
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(productId).subscribe(data =>{
      this.product=data;
    })
  }

  addToCart(theProduct:Products){
    console.log(`add to cart: ${theProduct.name}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
  
}
