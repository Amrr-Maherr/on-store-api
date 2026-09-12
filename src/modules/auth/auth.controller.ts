import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './auth.model.js';
export const register = async (req: Request, res: Response) => {
    const { username, email, phoneNumber, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        username,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
    });
    await newUser.save();
    const token = jwt.sign(
        {
            userId: newUser._id,
            role: newUser.role,
        },
        process.env.TOKEN_SECRET!,
        {
            algorithm: 'HS256',
            expiresIn: '1m',
        }
    );
    res.status(201).json({
        status: "success",
        data: {
            newUser,
            token,
        }
    });
};
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            status: "error",
            message: "Invalid password",
        });
    }
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.TOKEN_SECRET!,
        {
            algorithm: 'HS256',
            expiresIn: '1m',
        }
    );
    res.status(200).json({
        status: "success",
        data: {
            user,
            token,
        }
    });
};
export const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Token missing",
        });
    }
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};