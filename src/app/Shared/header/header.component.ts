import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {
  }


  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

}
