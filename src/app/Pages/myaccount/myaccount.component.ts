import { Component, OnInit } from '@angular/core';
import {User, UserJwtSession} from 'src/app/Models/user-model';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {


  user!: UserJwtSession | null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.user = this.authService.getCurrentSession();

  }

}
