import { FileInfo } from "./file.interface";

export type Exercise = {
  _id: string;
  description: string;
  posible_solution: string;
  solution: string;
  anotations: string;
  exercise_files_info: FileInfo[];
}