import { Injectable } from '@angular/core';
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import {UserModel} from "../models/user";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  private login: string = null;
  private password: string = null;
  private authenticator: UserModel = null;

  public authorized$ = new Subject<boolean>();
  public authorizedModel$ = new Subject<UserModel>();

  constructor() {
    this.restoreAuthorization();
  }

  public hasAuthorization(): boolean {
    return this.login !== null && this.password !== null;
  }

  public setAuthorization(email: string, password: string): void {
    this.login = email;
    this.password = password;
  }

  public storeAuthorization(authenticator: UserModel, local: boolean) {
    this.authenticator = authenticator;

    const authorizationString = JSON.stringify(this.authenticator);
    const storage = local ? localStorage : sessionStorage;

    storage.setItem('authorization', authorizationString);

    this.authorizedModel$.next(this.authenticator);
    this.authorized$.next(true);
  }

  private restoreAuthorization(): void {
    let authorizationString = sessionStorage.getItem('authorization');

    if (authorizationString === null) {
      authorizationString = localStorage.getItem('authorization');
    }

    if (authorizationString !== null) {
      const authorization = JSON.parse(authorizationString);
      const newAuthorization: UserModel = JSON.parse(authorizationString);

      this.login = authorization['login'];
      this.password = authorization['password'];

      this.authenticator = newAuthorization;

      this.authorizedModel$.next(this.authenticator);
      this.authorized$.next(true);
    }
  }

  public deleteAuthorization(): void {
    this.authenticator = null;

    sessionStorage.removeItem('authorization');
    localStorage.removeItem('authorization');

    this.authorized$.next(false);
  }

  public createAuthorizationString(): string {
    return 'Basic ' + btoa(this.login + ':' + this.password);
  }

  public getAuthenticator(): UserModel {
    this.restoreAuthorization();
    return this.authenticator;
  }

  public setAuthenticator(authenticator: UserModel): void {
    this.authenticator = authenticator;
  }
}
