import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Products } from 'src/app/common/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Products[] =[];
  currentCategoryId:number = 1;
  searchMethod:boolean=false;
  keyword:String|undefined;
  thePageNumber:number=1;
  thePageSize:number=10;
  theTotalElements:number=0;
  previousCategoryId: number = 1;
  
  constructor(private productService:ProductService,private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProducts();
    });
  }

  listProducts(){
    this.searchMethod = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMethod){
      console.log(this.searchMethod);
      this.searchProducts();
  }
    else{
      this.handleListProducts();
    }
      }

  handleListProducts(){
    const hashCategoryId: boolean=this.route.snapshot.paramMap.has('id');
    
    if(hashCategoryId){
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    }
    else{
        this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}`,`thePageNumber=${this.thePageNumber}`);

     this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).
                                               subscribe(this.processResult());

    // this.productService.getProductList(this.currentCategoryId).subscribe(data =>{
    //    this.products=data;
    //    console.log(this.products.length);
    //    console.log('products='+JSON.stringify(data));
    // })

  }

  processResult(){
    return (data: { _embedded: { products: Products[]; }; page: { number: number; size: number; totalElements: number; }; }) =>{
      this.products = data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }

  }

  searchProducts(){
    this.keyword = this.route.snapshot.paramMap.get('keyword')! as String;
    this.productService.getSearchedProducts(this.keyword).subscribe(data =>{
      this.products=data;
      console.log('products='+JSON.stringify(data));
   })
  }

  addToCart(theProduct:Products){
    console.log(`add to cart: ${theProduct.name}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
