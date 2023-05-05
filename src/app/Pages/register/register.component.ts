import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";
import {UserCreate, UserLogin} from "../../Models/user-model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = {username: '', email: '', password: ''};


  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const userCreate: UserCreate = this.registerForm;
    this.authService.register(userCreate).subscribe({
      next: () => {
        this.alertService.success("Inscription réussi !");
        const userLogin: UserLogin = this.registerForm;
        this.authService.login(userLogin).subscribe({
          next: (data) => {
            this.authService.setCurrentToken(data)
          },
          error: err => this.alertService.error(err.error.message)
        });
      },
      error: err => this.alertService.error(err.error.message)
    });
  }
}
