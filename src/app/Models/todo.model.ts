import {Category} from "./category.model";

export interface Todo {

  id: number;
  content: string;
  finished: boolean;
  createdAt: Date;
  category: Category;
  desiredEndDate: Date;

}

export interface TodoCreate {
  content: string;
  idCategory: number;
  desiredEndDate: Date;
}
