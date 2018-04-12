import { Component } from '@angular/core';
import {UserModel} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: UserModel = new UserModel();

  constructor(private userService: UserService, private authService: AuthService) {
    if (this.authService.hasAuthorization()) {
      this.user = this.authService.getAuthenticator();
    }
  }

  public signin() {
    this.userService.signin(this.user, false);
  }

  public loginWithGoogle() {}
}
