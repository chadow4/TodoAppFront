import {Todo} from "./todo.model";

export interface User {

  username: string;
  email: string;
  todos: Todo[];
}

export interface UserJwtSession {
  id: number;
  username: string;
  email: string;
}

export interface UserJwtToken {
  expiresIn: string;
  accessToken: string;

}

export interface UserCreate {
  username: string;

  password: string;

  email: string;
}

export interface UserLogin {
  username: string;

  password: string;
}
