import {Todo} from "./todo.model";

export interface UserInformation {
  username: string;
  email: string;
  todos: Todo[];
}
