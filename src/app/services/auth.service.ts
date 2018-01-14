import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "./user.service";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth, private userStorage: UserService, private route: ActivatedRoute, private router: Router) {
    this.user$ = auth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);
    this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
    this.router.navigate(["/"]);
  }

  get appUser$(): Observable<User> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userStorage.get(user.uid);
        return Observable.of(null);
      });
  }
}
