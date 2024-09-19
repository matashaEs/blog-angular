import {Request, Response } from "express";
import { addPost, deletePost, getAllPosts, getPostById, getPostBySlug, updatePost } from "../services/post.service";
import { z } from "zod";
import { generateSlug } from "../shared/general.util";
import { getCategories } from "./category.controller";
import { getCategoryById } from "../services/category.service";
import { Post } from "../models/Post";
import { getTagsById } from "../services/tag.service";
import { addPostTags } from "../services/post-tag.service";

export const getPostsController = async(req: Request, res: Response) => {
    const posts = await getAllPosts();

    return res.json(posts);
}

export const addPostController = async(req: Request, res: Response) => {
    const schema = z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.number(),
        tagIds: z.array(z.number()).optional()
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success)
        return res.status(400).json({message: 'Invalid data', errors: schemaValidator.error})

    const {title, content, categoryId, tagIds} = schemaValidator.data;

    if(tagIds && tagIds.length>0) {
        const tags = await getTagsById(tagIds);
        if(tags.length!==tagIds.length) {
            return res.status(400).json({message: "Invalid tag id(s)"});
        }
    }
    
    let slug = generateSlug(title);

    const isSlug = await getPostBySlug(slug);

    if(isSlug) {
        slug = generateSlug(title, true);
    }

    const category = await getCategoryById(categoryId);
    if(!category)
        return res.status(400).json({message: "Invalid cat"});

    const post = await addPost(title, content, categoryId, 1, slug);

    if(tagIds && tagIds.length>0){
       await addPostTags(post.id, tagIds);
    }

    return res.json(post);
}

export const updatePostController = async (req: Request, res: Response) => {
    const userId = 1;

    const schema = z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        categoryId: z.number()
    });

    const schemaValidator = schema.safeParse(req.body);

    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error);

    const {id, title, content, categoryId} = schemaValidator.data;

    const post = await getPostById(id);
    if(!post)
        return res.status(400).json({message: "Invalid post id"});

    if(post.userId!==userId)
        return res.status(403).json({message: "You are not authorized to update this post"});

    const category = await getCategoryById(categoryId); 
    if(!category)
        return res.status(400).json({message: "Invalid category id"});

    let slug;
    if(title!==post.title) {
        slug = generateSlug(title);

        const ifSlugExist = await getPostBySlug(slug);

        if(ifSlugExist)
            slug = generateSlug(title, true);
    }

    const updatedPost = await updatePost(id, title, content, categoryId, slug)

    return res.json(updatedPost);
}

export const deletePostController = async(req: Request, res: Response) => {

    const userId = 1;
    
    const schema = z.object({
        id: z.number(),
    });

    const schemaValidator = schema.safeParse(req.body);

    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error);
 
    const {id} = schemaValidator.data;

    const post = await getPostById(id);
    if(!post) {
        return res.status(400).json({message: "Invalid post id"});
    }

    if(post.userId!==userId)
        return res.status(403).json({message: "You are not authorized to update this post"});

     await deletePost(id);

     return res.json(post);
}
