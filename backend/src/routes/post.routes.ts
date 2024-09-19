import { Router } from "express";
import { addPostController, getPostsController, updatePostController, deletePostController } from "../controller/post.controller";

const router = Router();

router.get('/', getPostsController);
router.post('/', addPostController);
router.put('/', updatePostController);
router.delete('/', deletePostController);

export default router;
