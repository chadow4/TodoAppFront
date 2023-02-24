import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInformation} from "../Models/user.information.models";

const USER_API = 'http://localhost:8080/api/user/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUserInformation(id: number): Observable<UserInformation> {
    const url = `${USER_API}${id}`;
    return this.http.get<UserInformation>(url);
  }

}
