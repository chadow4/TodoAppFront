import {Todo} from "./todo.model";

export interface Category{
  id: string;
  title: string;
  todos? : Todo[];
}

export interface CategoryListing{
  title: string;
  todos : Todo[];
}
