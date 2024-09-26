import { Router } from "express";
import { getCategories, addCategoryController, updateCategoryController, deleteCategoryController } from "../controller/category.controller";
import { authenticateJWT } from "../shared/auth.util";

const router = Router();

router.get('/', getCategories);
router.post('/', authenticateJWT, addCategoryController);
router.put('/', authenticateJWT,updateCategoryController);
router.delete('/', authenticateJWT, deleteCategoryController);

export default router;
