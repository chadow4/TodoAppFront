import {Category} from "./category.model";

export interface Todo{
  title: string;
  description : string;
  finished : boolean;
  categories : Category[];

}
