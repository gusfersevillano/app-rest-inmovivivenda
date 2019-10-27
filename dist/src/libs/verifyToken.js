"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidation = (req, res, next) => {
    try {
        //console.log(payload);
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json('Access Denied');
        const payload = jsonwebtoken_1.default.verify(token, process.env['TOKEN_SECRET'] || 'tokentess');
        //console.log(payload);
        //res.json(payload._id);
        //req.userId = payload._id;
        //res.header(payload._id);
        console.log({ "id": payload._id });
        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token');
    }
};
//# sourceMappingURL=verifyToken.js.map