import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {UserModel} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserModel = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {
    this.user = this.authService.getAuthenticator();
  }

  checkAdmin() {
    if (this.user.role === "ADMIN") {
      return true;
    }
  }
  ngOnInit(): void {
    this.user = this.authService.getAuthenticator();
  }

  logout() {
    this.userService.signout();
    this.router.navigate([""]);
  }
}
