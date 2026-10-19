import type { RequestHandler } from "express";
import type {
  CategoryDto,
  CreateCategoryDto,
  GetCategoryParamsDto,
} from "../../dto/category.dto.js";
import type { ErrorDto } from "../../dto/error.dto.js";
import type { CategoryService } from "../../services/category.types.js";
import { isValidId } from "../validation.js";

export function createCategoryHandlers(categoryService: CategoryService) {
  const getCategories: RequestHandler<{}, CategoryDto[] | ErrorDto> = async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  };

  const getCategoryById: RequestHandler<
    GetCategoryParamsDto,
    CategoryDto | ErrorDto
  > = async (req, res) => {
    if (!isValidId(req.params.id)) {
      res.status(400).json({ message: "id має бути цілим числом більше 0" });
      return;
    }

    const category = await categoryService.getCategoryById(Number(req.params.id));
    res.status(200).json(category);
  };

  const createCategory: RequestHandler<
    {},
    CategoryDto | ErrorDto,
    Partial<CreateCategoryDto>
  > = async (req, res) => {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(422).json({ message: "Потрібно передати об'єкт з полем name" });
      return;
    }

    if (Object.keys(req.body).some((field) => field !== "name")) {
      res.status(422).json({ message: "Дозволено лише поле name" });
      return;
    }

    const { name } = req.body;

    if (typeof name !== "string" || name.trim() === "") {
      res.status(422).json({ message: "name має бути непорожнім текстом" });
      return;
    }

    const category = await categoryService.createCategory({ name: name.trim() });
    res.status(201).json(category);
  };

  return { getCategories, getCategoryById, createCategory };
}
