import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = {username: '', email: '', password: '', passwordRetype: ''};

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.router.navigate(['home']).then(r =>
        this.alertService.success('Vous êtes déjà connecté')
      )
    }
  }
  onSubmit() {
    const {username, email, password, passwordRetype} = this.registerForm;
    this.authService.signUp(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['home']).then(r => {
          this.alertService.success('Inscription réussi')
        })
      },
      error: err => {
        this.alertService.error(err.error.message);
      }
    })

  }

}
