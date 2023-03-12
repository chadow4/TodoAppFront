import {Category} from "./category.model";

export interface Todo {

  id: number;
  content: string;
  finished: boolean;
  createdAt: Date;
  category: Category;

}

export interface TodoCreate {
  content: string;
  idUser: number;
  idCategory: number;
}
