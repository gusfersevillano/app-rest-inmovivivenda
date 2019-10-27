import { Request, Response, NextFunction  } from 'express'
import jwt from 'jsonwebtoken'

export interface IPayload {
    _id: string;
    iat: number;
} 

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
   

    try {
        //console.log(payload);
        const token = req.header('auth-token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || 'tokentess') as IPayload;
        //console.log(payload);
       //res.json(payload._id);
       //req.userId = payload._id;
       //res.header(payload._id);
       console.log({"id":payload._id})
       
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}