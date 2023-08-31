import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user-model";
import {API_URL} from "./config";

const USER_API =  API_URL + '/users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUserInformation(): Observable<User> {
    const url = `${USER_API}infos`;
    return this.http.get<User>(url);
  }

}
