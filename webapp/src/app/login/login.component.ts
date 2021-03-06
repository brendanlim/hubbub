import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showLogin: boolean = false;
  returnUrl: string;

  constructor(public userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.userService.user$.subscribe(user => {
      this.showLogin = (user == null);
    })
  }

  login() {
      this.userService.login().then(() => {
          this.router.navigate([this.returnUrl]);
      })
  }

}
