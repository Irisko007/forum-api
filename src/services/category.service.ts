import type { Repository } from "../domain/category/repository.js";
import type { CategoryService } from "./category.types.js";

export function createCategoryService(repository: Repository): CategoryService {
  return {
    getAllCategories() {
      return repository.getAll();
    },

    async getCategoryById(id) {
      const category = await repository.getById(id);

      if (!category) {
        throw new Error("CATEGORY_NOT_FOUND");
      }

      return category;
    },

    createCategory(category) {
      return repository.addCategory(category);
    },
  };
}
