import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const TODO_API = 'http://localhost:8080/api/todo/';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }
  public createTodo(title: string, description: string, userId: number, categories: String[]): Observable<any> {
    return this.http.post(TODO_API, {
        title,
        description,
        userId,
        categories
      }
    );
  }
}
