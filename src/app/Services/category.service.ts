import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user-model";
import {Category} from "../Models/category.model";
import {API_URL} from "./config";

const CATEGORY_API = API_URL + '/categories/';


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
