import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Todo, TodoCreate} from "../Models/todo.model";

const TODO_API = 'http://localhost:3000/todos/';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }
  public createTodo(TodoCreate: TodoCreate): Observable<Todo> {
    return this.http.post<Todo>(TODO_API,
        TodoCreate
    );
  }

  public setFinished(id: number): Observable<any> {
    const url = `${TODO_API}${id}`;
    return this.http.put(url, {});
  }

}
