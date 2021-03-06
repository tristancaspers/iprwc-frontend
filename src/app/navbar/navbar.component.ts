import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {UserModel} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {ShoppingCartModel} from "../shared/models/shopping-cart";
import {ShoppingCartService} from "../shared/services/shopping-cart.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserModel = {};
  public cart: ShoppingCartModel;

  constructor(private userService: UserService, private authService: AuthService, private cartService: ShoppingCartService, private router: Router) {
    this.user = this.authService.getAuthenticator();
  }

  checkAdmin() {
    if (this.user.role === "ADMIN") {
      return true;
    }
  }
  ngOnInit(): void {
    this.user = this.authService.getAuthenticator();
    this.cart = this.cartService.getAuthenticatorCart();
  }

  logout() {
    this.userService.signout();
    this.router.navigate(["/"]);
    window.location.reload();
  }

  redirect() {
    swal({
      title: "Oops...",
      text: 'This function is not implemented yet!',
      type: 'error',
      confirmButtonText: 'OK'});
  }
}
