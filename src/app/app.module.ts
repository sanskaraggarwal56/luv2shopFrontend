import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import {HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes,RouterModule } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartService } from './services/cart.service';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopizerService } from './services/shopizer.service';

const routes: Routes = [
  {path:'checkout', component: CheckoutComponent},
  {path:'cart-details', component: CartDetailsComponent},
  {path:'product/:id', component: ProductDetailsComponent},
  {path:'search/:keyword', component: ProductListComponent},
  {path:'category/:id', component: ProductListComponent},
  {path:'products', component: ProductListComponent},
  {path:'', redirectTo:'/products', pathMatch:'full'},
  // {path:'**', redirectTo:'/products', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService,CartService,ShopizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
