import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Todo} from "../../Models/todo.model";
import {UserService} from "../../Services/user.service";
import {UserInformation} from "../../Models/user.information.models";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user$!: Observable<UserInformation>
  finishedTodos$!: Observable<Todo[]>
  notFinishedTodos$!: Observable<Todo[]>;

  constructor(private userService: UserService,
              private auth: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    if (this.auth.getUserSession()) {
      this.user$ = this.userService.getUserInformation(this.auth.getUserSession().id);
      this.finishedTodos$ = this.user$.pipe(
        map(user => user.todos.filter(todo => todo.finished))
      );
      this.notFinishedTodos$ = this.user$.pipe(
        map(user => user.todos.filter(todo => !todo.finished))
      );
    } else {
      this.router.navigate(['home']).then(r =>
        this.alertService.error('Redirection to the home page due to a connection error!')
      )
    }
  }

}
