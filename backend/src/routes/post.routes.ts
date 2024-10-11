import { Router } from "express";
import { addPostController, getPostsController, updatePostController, deletePostController, getPostBySlugController } from "../controller/post.controller";
import { authenticateJWT, authenticateJWTOptional } from "../shared/auth.util";

const router = Router();

router.get('/', authenticateJWTOptional, getPostsController);
router.get('/slug/:slug', getPostBySlugController)
router.post('/', authenticateJWT, addPostController);
router.put('/', authenticateJWT, updatePostController);
router.delete('/', authenticateJWT, deletePostController);

export default router;
