import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import "rxjs/add/operator/map";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.authService.getAuthenticator();
    if (user && user.role === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
