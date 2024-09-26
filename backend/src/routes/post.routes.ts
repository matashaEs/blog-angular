import { Router } from "express";
import { addPostController, getPostsController, updatePostController, deletePostController } from "../controller/post.controller";
import { authenticateJWT } from "../shared/auth.util";

const router = Router();

router.get('/', getPostsController);
router.post('/', authenticateJWT, addPostController);
router.put('/', authenticateJWT, updatePostController);
router.delete('/', authenticateJWT, deletePostController);

export default router;
