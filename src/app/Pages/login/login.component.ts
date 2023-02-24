import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = { username: '', password: '' };
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.router.navigate(['home']).then(r =>
        this.alertService.success('You are already connected')
      )
    }
  }

  onSubmit() {
    const {username, password} = this.loginForm;
    console.log("username : ",username);
    console.log("password : ",password);
    this.authService.signIn(username, password).subscribe({
      next: data => {
        this.saveTokenAndSession(data);
        this.router.navigate(['home']).then(r => {
          this.alertService.success('You are now connected');
        })
      },
      error: err => {
        this.alertService.error(err.error.message);
      }
    })

  }

  saveTokenAndSession(signInResponse: any) {
    this.authService.saveToken(signInResponse.accessToken);
    this.authService.saveUserSession(signInResponse);
  }

}
