import { User } from "../models/User"

export const getUserByEmail = async (email: string) => {
    return User.findOne({
        where: {
            email
        }
    })
}

export const addUser = async(email: string, password: string, name: string) => {
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;

    return user.save();
}