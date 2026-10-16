import type { Category, NewCategory } from "../domain/category/entity.js";

export interface CategoryService {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category>;
  createCategory(category: NewCategory): Promise<Category>;
}
