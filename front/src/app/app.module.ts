import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { PriceNettoToBruttoPipe } from './pipes/price-netto-to-brutto.pipe';
import { DatePipe } from '@angular/common';
import { OrderListFilterPipe } from './pipes/order-list-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {CustomerListComponent} from './components/customer-list/customer-list.component';
import { ProductListFilterPipe } from './pipes/product-list-filter.pipe';
import { CustomerListFilterPipe } from './pipes/customer-list-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrdersListComponent,
    OrderAddComponent,
    OrderEditComponent,
    TopBarComponent,
    ProductListComponent,
    CartComponent,
    ProductDetailsComponent,
    CustomerDetailsComponent,
    PriceNettoToBruttoPipe,
    OrderListFilterPipe,
    CustomerListComponent,
    ProductListFilterPipe,
    CustomerListFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
