import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../../Models/todo.model";
import {UserService} from "../../Services/user.service";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../Services/alert.service";
import {User} from "../../Models/user-model";
import {Category, CategoryListing} from 'src/app/Models/category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countTodo: number = 0;

  user: User = {
    username: 'John Doe',
    email: 'john@example.com',
    todos: [
      {
        title: 'Finir de coder cette todoList',
        finished: false,
        date: new Date('2023-03-11'),
        categories: {title: 'Développement'},
      },
      {
        title: 'Faire la lessive',
        finished: true,
        date: new Date('2023-03-10'),
        categories: {title: 'Tâches ménagères'},
      },
      {
        title: 'Se promener',
        finished: false,
        date: new Date('2023-03-09'),
        categories: {title: 'Quotidien'},
      },
      {
        title: 'Réviser la base de données',
        finished: false,
        date: new Date('2023-03-08'),
        categories: {title: 'Devoir'},
      },
      {
        title: 'Faire le ménage',
        finished: true,
        date: new Date('2023-03-07'),
        categories: {title: 'Tâches ménagères'},
      },
      {
        title: 'Finir le TP de Gentoo',
        finished: false,
        date: new Date('2023-03-06'),
        categories: {title: 'Devoir'},
      },
    ],
  };

  categories: CategoryListing[] = [];
  selectedCategory = '';


  user$!: Observable<User>
  finishedTodos$!: Observable<Todo[]>
  notFinishedTodos$!: Observable<Todo[]>;

  constructor(private userService: UserService,
              private auth: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.setCategoriesAndTodosForUser(this.user);
    this.countTodo = this.user.todos.filter(todo => !todo.finished).length;
  }

  setCategoriesAndTodosForUser(user: User): void {
    for (const todo of user.todos) {
      if (!todo.finished) {
        let categoryIndex = this.categories.findIndex(c => c.title === todo.categories.title)
        if (categoryIndex === -1) {
          this.categories.push({title: todo.categories.title, todos: [todo]})
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

  deleteTodo(todo: Todo) {
    const confirmMessage = `Avez vous bien terminé la tâche "${todo.title}" ?`;
    if (confirm(confirmMessage)) {
      console.log("supprimé");
    }
  }

}
