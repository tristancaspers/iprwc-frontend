import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../models/user";

@Injectable()
export class UserService {

  constructor(private api: ApiService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  public signin(model: UserModel, remember: boolean) {
    this.authService.setAuthorization(model.email, model.password);
    this.api.get('users/me')
      .subscribe(response => {
        this.authService.storeAuthorization(response, remember);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
        window.location.reload();
      });
  }

  public signout() {
    this.authService.deleteAuthorization();
  }
}
