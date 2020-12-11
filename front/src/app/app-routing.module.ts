import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {OrderAddComponent} from './components/order-add/order-add.component';
import {OrderEditComponent} from './components/order-edit/order-edit.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

const routes: Routes = [
  {path: '', component: OrdersListComponent},
  {path: 'add', component: OrderAddComponent},
  {path: 'edit', component: OrderEditComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
