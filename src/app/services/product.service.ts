import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../common/products';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private base_url = 'http://localhost:8080/api/products';

  private category_url = 'http://localhost:8080/api/product-category';

  constructor(private _http:HttpClient) { }

  getSearchedProducts(keyword: String) {
   const searchUrl = `${this.base_url}/search/findByNameContaining?name=${keyword}`;
   return this._http.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories() {
    return this._http.get<GetResponseProductCategory>(this.category_url).pipe(map(response => response._embedded.productCategory));
  }

  getProductList(categoryId:number): Observable<Products[]>{
    const categorySearchUrl = `${this.base_url}/search/findByCategoryId?id=${categoryId}`;
    return this._http.get<GetResponseProducts>(categorySearchUrl).pipe(map(response => response._embedded.products));
  }

  getProductListPaginate(thePage:number,thePageSize:number,categoryId:number): Observable<GetResponseProducts>{
    const categorySearchUrl = `${this.base_url}/search/findByCategoryId?id=${categoryId}`+`&page=${thePage}&size=${thePageSize}`;
    return this._http.get<GetResponseProducts>(categorySearchUrl);
  }

  getProduct(productid:number):Observable<Products>{
    const productUrl = `${this.base_url}/${productid}`;
    return this._http.get<Products>(productUrl);
  }

}

interface GetResponseProducts{
_embedded:{
  products:Products[];
},
page: {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}