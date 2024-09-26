import { Router } from "express";
import { addCommentController, deleteCommentController, getCommentsController, updateCommentController } from "../controller/comment.controller";
import { authenticateJWT } from "../shared/auth.util";

const router = Router();

router.get('/:postId', getCommentsController);
router.post('/', authenticateJWT, addCommentController);
router.put('/', authenticateJWT, updateCommentController);
router.delete('/', authenticateJWT, deleteCommentController);

export default router;
