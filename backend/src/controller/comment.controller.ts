import { Request, Response } from "express";
import { z } from "zod";
import { getPostById } from "../services/post.service";
import { addComment, deleteComment, getCommentById, getPostComments, updateComment } from "../services/comment.service";
import { User } from "../models/User";

export const getCommentsController = async(req: Request, res: Response) => {
    const schema = z.object({
        postId: z.number(),
    });

    const schemaValidator = schema.safeParse({
        postId: parseInt(req.params.postId)
    });
    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error)

    const {postId} = schemaValidator.data;

    const post = await getPostById(postId);

    if(!post) {
        return res.status(400).json({message: "Invalid post id"});
    }

    const comments = await getPostComments(postId);

    return res.json(comments);
}

export const addCommentController = async(req: Request, res: Response) => {
    const schema = z.object({
        postId: z.number(),
        content: z.string()
    });

    const user: User = (req as any).user;

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error)

    const {postId, content} = schemaValidator.data;
    const userId = user.get('id');

    const post = await getPostById(postId);

    if(!post) {
        return res.status(400).json({message: "Invalid post id"});
    }

    const comment = await addComment(postId, userId, content);

    return res.json(comment);
}

export const updateCommentController = async(req: Request, res: Response) => {
    const schema = z.object({
        commentId: z.number(),
        content: z.string()
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error)

    const {commentId, content} = schemaValidator.data;
    const userId = 1;

    const comment = await getCommentById(commentId);

    if(!comment) {
        return res.status(400).json({message: "Invalid comment id"});
    }

    if(comment.userId !== userId) {
        return res.status(400).json({message: "Another user"});
    }

    const updatedComment = await updateComment(commentId, content);

    return res.json(updatedComment);
}

export const deleteCommentController = async(req: Request, res: Response) => {
    const schema = z.object({
        commentId: z.number(),
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error)

    const {commentId} = schemaValidator.data;
    const userId = 1;

    const comment = await getCommentById(commentId);
    if(!comment) {
        return res.status(400).json({message: "Invalid comment id"});
    }

    if(comment.userId !== userId) {
        return res.status(400).json({message: "Another user"});
    }

    await deleteComment(commentId);

    return res.json(comment); 
}
