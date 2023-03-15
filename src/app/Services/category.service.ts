import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user-model";
import {Category} from "../Models/category.model";

const CATEGORY_API = 'https://jsmb.fr:33000/categories/';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORY_API);
  }

}
