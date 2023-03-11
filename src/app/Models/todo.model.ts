import {Category} from "./category.model";

export interface Todo {
  title: string;
  finished: boolean;
  date: Date;
  categories: Category;

}

export interface TodoCreate {
  title: string;
  description: string;
  category: Category;
}
