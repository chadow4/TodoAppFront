import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";
import {UserCreate, UserLogin} from "../../Models/user-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = {username: '', password: ''};

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    const userLogin = this.loginForm as UserLogin;
    this.authService.login(userLogin).subscribe({
      next: (data) => {
        this.authService.setCurrentToken(data)
      },
      error: err => this.alertService.error(err.error.message)
    });
  }
}
