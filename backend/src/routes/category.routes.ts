import { Router } from "express";
import { getCategories, addCategoryController, updateCategoryController, deleteCategoryController } from "../controller/category.controller";

const router = Router();

router.get('/', getCategories);
router.post('/', addCategoryController);
router.put('/', updateCategoryController);
router.delete('/', deleteCategoryController);

export default router;
