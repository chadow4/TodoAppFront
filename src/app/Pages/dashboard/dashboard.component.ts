import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../../Models/todo.model";
import {UserService} from "../../Services/user.service";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";
import {User, UserJwtSession} from "../../Models/user-model";
import {CategoryListing} from 'src/app/Models/category.model';
import {TodoService} from "../../Services/todo.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countTodo: number = 0;

  userSession?: UserJwtSession;
  userInformation!: User;

  categories: CategoryListing[] = [];
  selectedCategory = '';

  constructor(private userService: UserService,
              private auth: AuthService,
              private router: Router,
              private alertService: AlertService,
              private todoService: TodoService) {
  }

  ngOnInit() {
    this.userSession = this.auth.getCurrentSession();
    this.getUserInformation();
    this.categories = [];
  }

  getUserInformation() {
    this.categories = [];
    this.userService.getUserInformation(this.userSession?.id).subscribe(res => {
      this.userInformation = res;
      this.setCategoriesAndTodosForUser(this.userInformation);
      this.countTodo = this.userInformation.todos.filter(todo => !todo.finished).length;
    })
  }

  setCategoriesAndTodosForUser(user: User): void {
    for (const todo of user.todos) {
      if (!todo.finished) {
        let categoryIndex = this.categories.findIndex(c => c.title === todo.category.title)
        if (categoryIndex === -1) {
          this.categories.push({title: todo.category.title, todos: [todo]})
        } else {
          if (todo && this.categories[categoryIndex]) {
            this.categories[categoryIndex].todos.push(todo);
          }
        }
      }
    }
  }

  get filteredCategories() {
    return this.categories.filter((category) =>
      category.title.toLowerCase().includes(this.selectedCategory.toLowerCase())
    );
  }

  finishTodo(todo: Todo) {
    const confirmMessage = `Avez vous bien terminé la tâche "${todo.content}" ?`;
    if (confirm(confirmMessage)) {
      this.todoService.setFinished(todo.id).subscribe(() => {
        this.alertService.success(`${todo.content} est maintenant finie`);
        this.getUserInformation();
        this.selectedCategory = '';
        window.scrollTo(0, 0);
      }, (error) => {
        this.alertService.error(`Erreur : ${error.message}`)
      });
    }
  }

}
