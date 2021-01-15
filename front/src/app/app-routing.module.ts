import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component'; 

const routes: Routes = [
  { path: '', component: OrdersListComponent },
  { path: 'add', component: OrderAddComponent },
  { path: 'edit/:id', component: OrderEditComponent },  
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
