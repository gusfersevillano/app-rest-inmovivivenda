import { Request, Response } from 'express'

import User, { IUser } from '../models/User'
//import { signupValidation, signinValidation } from '../libs/joi'
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    // Validation
    //const { error } = signupValidation(req.body);
    //const { username, email, password } = req.body    ;
    //if (error) return res.status(400).json(error.message);

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json('Email already exists');

    // Saving a new User
    try {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = await newUser.encrypPassword(newUser.password);
        const savedUser = await newUser.save();
        const token: string = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'tokentess', {
           expiresIn: 60 * 60 * 24
        });

         //res.json({ auth: true, token });

        //res.header('auth-token', token).json(token);
        res.header('auth-token', token).json(savedUser);

    } catch (e) {
        res.status(400).json(e);
    }
};

export const signin = async (req: Request, res: Response) => {
    //const { error } = signinValidation(req.body);
    //if (error) return res.status(400).json(error.message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('email o contraseña invalidos');
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('contraseña invalida');

    // Create a Token
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentess', {
           expiresIn: 60 * 60 * 24
       });

    res.header('auth-token', token).json(user);
};



export const profile = async (req: Request, res: Response) => {
        //console.log(req.header('auth-token'));
        res.send('profec');
        const _id = '5dad12f42d47cc12c4d09263';
    //const _ids= req.body.emal;
    //console.log(req.body.email);
   
   const user = await User.findById(_id, { password: 0 });
    if (!user) {
        return res.status(404).json('Usario no encontrado');
    }
    console.log(user);
    
};