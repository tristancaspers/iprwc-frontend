import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "./shared/services/auth.service";
import {AuthGuardService} from "./shared/services/auth-guard.service";
import {UserService} from "./shared/services/user.service";
import {AdminAuthGuardService} from "./shared/services/admin-auth-guard.service";
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {FormsModule} from "@angular/forms";
import {ProductService} from "./shared/services/product.service";
import {CustomFormsModule} from "ng2-validation";
import {DataTableModule} from "angular-4-data-table";
import { ProductCardComponent } from './products/product-card/product-card.component';
import {ShoppingCartService} from "./shared/services/shopping-cart.service";
import { FooterComponent } from './footer/footer.component';
import {ApiService} from "./shared/services/api.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      {path: "", component: ProductsComponent},
      {path: "products", component: ProductsComponent},
      {path: "shopping-cart", component: ShoppingCartComponent},
      {path: "login", component: LoginComponent},

      {path: "admin/products/new", component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: "admin/products/:id", component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: "admin/products", component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]}
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    ProductService,
    ShoppingCartService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
