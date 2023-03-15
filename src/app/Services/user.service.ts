import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user-model";

const USER_API = 'https://jsmb.fr:33000/users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUserInformation(id?: number): Observable<User> {
    const url = `${USER_API}${id}`;
    return this.http.get<User>(url);
  }

}
