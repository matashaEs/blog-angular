import { Request, Response } from "express";
import { z } from "zod";
import { addUser, getUserByEmail } from "../services/user.service";
import { encryptPassword, generateToken, verifyToken } from "../shared/auth.util";
import { addToken, deleteTokens, getToken } from "../services/token.service";

export const registerController = async(req: Request, res: Response) => {
    const schema = z.object({
        name: z.string().min(3).max(100),
        email: z.string().email(),
        password: z.string().min(6).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        {
            message: 'Password must contain at least one uppercase letter, one lowercase letter and one number.'
        }), 
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success){
        return res.status(400).json(schemaValidator.error); 
    } 
    let {email, password, name} = schemaValidator.data;  

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return res.status(400).json({message: 'User already exists.'});
    }

    password = encryptPassword(password);

    let user = await addUser(email, password, name);
    user = user.toJSON();
    delete user.password;

    return res.status(201).json(user);
}

export const loginController = async(req: Request, res: Response) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(100)
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success){
        return res.status(400).json(schemaValidator.error); 
    } 
    const {email, password} = schemaValidator.data;  

    const user = await getUserByEmail(email);

    if(!user) 
        return res.status(400).json({message: 'User not found'});
    

    const dbPassword = verifyToken(user.password!);
    if(dbPassword !== password) {
        return res.status(400).json({message: 'Invalid password.'});
    }

    const accessToken = generateToken(user.get('id'));
    const refreshToken = generateToken(user.get('id'), '7d');

    await deleteTokens(user.get('id'));

    await addToken(refreshToken, 'refresh', user.get('id'));
    await addToken(accessToken, 'access', user.get('id'));

    const session = {
        accessToken,
        refreshToken,
        user: user.toJSON()
    }

    delete session.user.password;

    return res.status(200).json(session);
}

export const refreshTokenController = async(req: Request, res: Response)=> {
    const schema = z.object({
        refreshToken: z.string()
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success){
        return res.status(400).json(schemaValidator.error); 
    } 
    const {refreshToken} = schemaValidator.data;  

    const isTokenValid = verifyToken(refreshToken);
    if(!isTokenValid) {
        return res.status(400).json({message: 'Invalid token or expired.'});
    }

    const dbRefreshToken = await getToken(refreshToken);
    if(!dbRefreshToken || dbRefreshToken.get('type') !== 'refresh') 
        return res.status(400).json({message: 'Invalid token.'});
    const userId = dbRefreshToken.get('userId');
    
    const accessToken = generateToken(userId!);
    const newRefreshToken = generateToken(userId!, '7d');

    await deleteTokens(userId!);

    await addToken(
        newRefreshToken,
        'refresh',
        userId!
    );

    await addToken(
        accessToken,
        'access',
        userId!
    );

    return res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken
    });
}

export const logoutController = async(req: Request, res: Response) => {
    const schema = z.object({
        refreshToken: z.string()
    });

    const schemaValidator = schema.safeParse(req.body);
    if(!schemaValidator.success){
        return res.status(400).json(schemaValidator.error); 
    } 
    const {refreshToken} = schemaValidator.data;  

    const isTokenValid = verifyToken(refreshToken);
    if(!isTokenValid) {
        return res.status(400).json({message: 'Invalid token or expired.'});
    }

    const dbRefreshToken = await getToken(refreshToken);
    if(!dbRefreshToken || dbRefreshToken.get('type') !== 'refresh') 
        return res.status(400).json({message: 'Invalid token.'});

    const userId = dbRefreshToken.get('userId');

    await deleteTokens(userId!);

    return res.status(200).json({message: "Logged out."})
}
