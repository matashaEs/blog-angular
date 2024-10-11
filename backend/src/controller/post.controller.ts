import {Request, Response } from "express";
import { addPost, deletePost, getAllPosts, getPostById, getPostBySlug, updatePost } from "../services/post.service";
import { z } from "zod";
import { generateSlug } from "../shared/general.util";
import { getCategories } from "./category.controller";
import { getCategoryById } from "../services/category.service";
import { Post } from "../models/Post";
import { getTagsById } from "../services/tag.service";
import { addPostTags, deletePostTagRelations, getPostTags } from "../services/post-tag.service";
import { User } from "../models/User";

export const getPostsController = async(req: Request, res: Response) => {
    const schema = z.object({
        categoryId: z.string().optional(),
        tagId: z.string().optional()
    });

    const schemaValidator = schema.safeParse(req.query);
    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error)

    const {categoryId, tagId} = schemaValidator.data;

    const posts = await getAllPosts({
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        tagId: tagId ? parseInt(tagId) : undefined
    });

    return res.json(posts);
}

export const addPostController = async(req: Request, res: Response) => {
    const user = (req as any).user as User;
    const userId = user.get('id');
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

    await validateTags(res, tagIds);
    
    let slug = generateSlug(title);

    const isSlug = await getPostBySlug(slug);

    if(isSlug) {
        slug = generateSlug(title, true);
    }

    const category = await getCategoryById(categoryId);
    if(!category)
        return res.status(400).json({message: "Invalid cat"});

    const post = await addPost(title, content, categoryId, userId, slug);

    if(tagIds && tagIds.length>0){
       await addPostTags(post.id, tagIds);
    }

    return res.json(post);
}

export const updatePostController = async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    const userId = user.get('id');

    const schema = z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        categoryId: z.number().optional(),
        tagIds: z.array(z.number()).optional()
    });

    const schemaValidator = schema.safeParse(req.body);

    if(!schemaValidator.success)
        return res.status(400).json(schemaValidator.error);

    let {id, title, content, categoryId, tagIds} = schemaValidator.data;

    await validateTags(res, tagIds);

    const post = await getPostById(id);
    if(!post)
        return res.status(400).json({message: "Invalid post id"});

    if(post.userId!==userId)
        return res.status(403).json({message: "You are not authorized to update this post"});

    if(categoryId) {
        const category = await getCategoryById(categoryId); 
        if(!category)
            return res.status(400).json({message: "Invalid category id"});
    }
   
    let slug;
    if(title && title!==post.title) {
        slug = generateSlug(title);

        const ifSlugExist = await getPostBySlug(slug);

        if(ifSlugExist)
            slug = generateSlug(title, true);
    }

    const updatedPost = await updatePost(id, title, content, categoryId, slug)

    const postTagRelations = await getPostTags(id);

    if(tagIds) {
        const tagIdsToDelete = postTagRelations.filter((postTagRelations) => {
            return !tagIds?.includes(postTagRelations.tagId!);
        });

        tagIdsToDelete.forEach(async (postTagRelations) => {
            await postTagRelations.destroy();
        })
    }

    if(tagIds && tagIds.length>0){
        tagIds = tagIds?.filter((tagId)=> {
            const postTag = postTagRelations.find((postTagRelation)=>{
                return postTagRelation.tagId === tagId;
            });
            return !postTag;
        })

        if(tagIds.length > 0)
            await addPostTags(post.id, tagIds);
    }

    return res.json(updatedPost);
}

export const deletePostController = async(req: Request, res: Response) => {

    const user = (req as any).user as User;
    const userId = user.get('id');
    
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

    await deletePostTagRelations({ postId: id });

     await deletePost(id);

     return res.json(post);
}

export const getPostBySlugController = async(req: Request, res: Response) => {
    const {slug} = req.params;

    if(!slug)
        return res.status(400).json({message: "Invalid slug"});

    const post = await getPostBySlug(slug);

    if(!post)
        return res.status(404).json({message: "Post not found"});

    return res.json(post);
}

async function validateTags(res: Response, tagIds?: number[]) {
    if(tagIds && tagIds.length>0) {
        const tags = await getTagsById(tagIds);
        if(tags.length!==tagIds.length) {
            return res.status(400).json({message: "Invalid tag id(s)"});
        }
    }
}
