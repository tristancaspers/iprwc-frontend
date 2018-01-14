import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {UserService} from "./services/user.service";
import {AdminAuthGuardService} from "./services/admin-auth-guard.service";
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {CategoryService} from "./services/category.service";
import {FormsModule} from "@angular/forms";
import {ProductService} from "./services/product.service";
import {CustomFormsModule} from "ng2-validation";
import {DataTableModule} from "angular-4-data-table";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {ShoppingCartService} from "./services/shopping-cart.service";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    OrderSuccessComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      {path: "", component: ProductsComponent},
      {path: "products", component: ProductsComponent},
      {path: "shopping-cart", component: ShoppingCartComponent},
      {path: "login", component: LoginComponent},

      {path: "check-out", component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: "order-success", component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: "my/orders", component: MyOrdersComponent, canActivate: [AuthGuardService]},

      {path: "admin/products/new", component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: "admin/products/:id", component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: "admin/products", component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: "admin/orders", component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]},
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
