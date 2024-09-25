import { Router } from "express";
import { addCommentController, deleteCommentController, getCommentsController, updateCommentController } from "../controller/comment.controller";

const router = Router();

router.get('/:postId', getCommentsController);
router.post('/', addCommentController);
router.put('/', updateCommentController);
router.delete('/', deleteCommentController);

export default router;
