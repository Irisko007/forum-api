import type { Category, NewCategory } from "../domain/category/entity.js";

export type CategoryDto = Category;

export type CreateCategoryDto = NewCategory;

export interface GetCategoryParamsDto {
  id: string;
}
