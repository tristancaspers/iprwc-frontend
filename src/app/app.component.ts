import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private userStorage: UserService, router: Router) {
    auth.user$.subscribe(user => {
      if (!user) return;
      userStorage.save(user);
      let returnUrl = localStorage.getItem("returnUrl");

      if(!returnUrl) return;
      localStorage.removeItem("returnUrl");
      router.navigateByUrl(returnUrl);
    });
  }
}
