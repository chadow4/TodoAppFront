import {Component, OnInit} from '@angular/core';
import {Todo} from "../../Models/todo.model";
import {UserService} from "../../Services/user.service";
import {AuthService} from "../../Services/auth.service";
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


  userSession?: UserJwtSession;
  userInformation!: User;

  categoriesWithTodosNotFinished: CategoryListing[] = [];
  categoriesWithTodosFinished: CategoryListing[] = [];

  selectedCategoryFinished = '';
  selectedCategoryNotFinished = '';

  displayTodosFinished = false;


  constructor(private userService: UserService,
              private auth: AuthService,
              private alertService: AlertService,
              private todoService: TodoService) {
  }

  ngOnInit() {
    this.cleanFields();
    this.userSession = this.auth.getCurrentSession();
    this.getUserInformation();
  }

  getUserInformation() {
    this.userService.getUserInformation().subscribe(res => {
      this.userInformation = res;
      this.setCategoriesAndTodosForUser(this.userInformation);
    })
  }

  setCategoriesAndTodosForUser(user: User): void {

    const categoriesWithTodosNotFinished: CategoryListing[] = [];
    const categoriesWithTodosFinished: CategoryListing[] = [];


    for (const todo of user.todos) {
      const targetArray = todo.finished ? categoriesWithTodosFinished : categoriesWithTodosNotFinished;
      let categoryIndex = targetArray.findIndex(c => c.title === todo.category.title)
      if (categoryIndex === -1) {
        targetArray.push({title: todo.category.title, todos: [todo]})
      } else {
        if (todo && targetArray[categoryIndex]) {
          targetArray[categoryIndex].todos.push(todo);
        }
      }
    }
    this.categoriesWithTodosFinished = categoriesWithTodosFinished;
    this.categoriesWithTodosNotFinished = categoriesWithTodosNotFinished;
  }


  get filteredCategoriesNotFinished() {
    return this.categoriesWithTodosNotFinished.filter((category) =>
      category.title.toLowerCase().includes(this.selectedCategoryNotFinished.toLowerCase())
    );
  }

  get filteredCategoriesFinished() {
    return this.categoriesWithTodosFinished.filter((category) =>
      category.title.toLowerCase().includes(this.selectedCategoryFinished.toLowerCase())
    );
  }

  finishTodo(todo: Todo) {
    let confirmMessage = '';
      this.todoService.setFinished(todo.id).subscribe((res) => {
        if(res.finished){
          this.alertService.success(`${todo.content} est maintenant finie`);
        }else{
          this.alertService.success(`${todo.content} est de nouveau à faire`);
        }
        this.ngOnInit();
        window.scrollTo(0, 0);
      }, (error) => {
        this.alertService.error(`Erreur : ${error.message}`)
      });

  }


  private cleanFields() {
    this.categoriesWithTodosNotFinished = [];
    this.categoriesWithTodosFinished = [];
    this.selectedCategoryNotFinished = '';
    this.selectedCategoryFinished = '';
  }

}
