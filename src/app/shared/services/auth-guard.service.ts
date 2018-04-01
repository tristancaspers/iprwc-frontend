import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.hasAuthorization()) {
      return true;
    } else {
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
