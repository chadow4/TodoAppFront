import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../Services/todo.service";
import {AuthService} from "../../Services/auth.service";
import {UserJwtSession} from "../../Models/user-model";
import {CategoryService} from 'src/app/Services/category.service';
import {Category} from "../../Models/category.model";
import {TodoCreate} from "../../Models/todo.model";
import {AlertService} from 'src/app/Services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adding-todo',
  templateUrl: './adding-todo.component.html',
  styleUrls: ['./adding-todo.component.scss']
})
export class AddingTodoComponent implements OnInit {

  userSession!: UserJwtSession;
  categoriesList?: Category[];

  addingTodoForm = {content: '', idCategory: 0}

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userSession = this.authService.getCurrentSession();
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categoriesList = categories;
    });
  }

  onSubmit() {
      const todoCreate = this.addingTodoForm as TodoCreate;
    this.todoService.createTodo(todoCreate).subscribe({
      next: data => {
        this.router.navigate(['dashboard']).then(() => this.alertService.success('La tâche a été ajoutée'));
      },
      error: err => {
        this.alertService.error(err.error.message);
      }
    });
  }

}
