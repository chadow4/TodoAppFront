import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../Services/auth.service";
import {AlertService} from "../../Services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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


  public logout(): void {
    this.authService.logout();
  }
}
