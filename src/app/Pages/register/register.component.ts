import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";
import {UserCreate} from "../../Models/user-model";

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
    const userCreate = this.registerForm as UserCreate;
    this.authService.register(userCreate).subscribe({
      next: () => {
        this.router.navigate(['login']).then(() => this.alertService.success('Inscription réussie'));
      },
      error: err => this.alertService.error(err.error.message)
    });
  }
}
