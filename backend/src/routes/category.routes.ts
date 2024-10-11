import { Router } from "express";
import { getCategories, addCategoryController, updateCategoryController, deleteCategoryController, getCategoryBySlugController } from "../controller/category.controller";
import { authenticateJWT, authenticateJWTOptional } from "../shared/auth.util";

const router = Router();

router.get('/', authenticateJWTOptional, getCategories);
router.post('/', authenticateJWT, addCategoryController);
router.put('/', authenticateJWT,updateCategoryController);
router.delete('/', authenticateJWT, deleteCategoryController);
router.get('/slug/:slug', getCategoryBySlugController)

export default router;
