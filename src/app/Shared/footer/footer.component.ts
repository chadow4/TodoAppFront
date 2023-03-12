import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.authService.authStateChanged.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  public logout(): void {
    this.authService.logout();
  }
}
