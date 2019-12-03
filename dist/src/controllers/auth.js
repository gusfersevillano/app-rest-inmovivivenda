"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
//import { signupValidation, signinValidation } from '../libs/joi'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation
    //const { error } = signupValidation(req.body);
    //const { username, email, password } = req.body    ;
    //if (error) return res.status(400).json(error.message);
    // Email Validation
    const telefonoExists = yield User_1.default.findOne({ telefono: req.body.telefono });
    if (telefonoExists)
        return res.status(400).json('este teléfono no existe');
    // Saving a new User
    try {
        const newUser = new User_1.default({
            username: req.body.username,
            telefono: req.body.telefono,
            password: req.body.password
        });
        newUser.password = yield newUser.encrypPassword(newUser.password);
        const savedUser = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'tokentess', {
            expiresIn: 60 * 60 * 24
        });
        //res.json({ auth: true, token });
        //res.header('auth-token', token).json(token);
        res.header('auth-token', token).json(savedUser);
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const { error } = signinValidation(req.body);
    //if (error) return res.status(400).json(error.message);
    const user = yield User_1.default.findOne({ telefono: req.body.telefono });
    if (!user)
        return res.status(400).json('teléfono o contraseña invalidos');
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json('contraseña invalida');
    // Create a Token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokentess', {
        expiresIn: 60 * 60 * 24
    });
    // res.json(user);
    res.header('auth-token', token).json(user);
});
exports.datoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.idv);
    const user = yield User_1.default.findOne({ _id: req.body.idv });
    res.json(user);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.header('auth-token'));
    //res.send('profec');
    const _id = '5dad12f42d47cc12c4d09263';
    //const _ids= req.body.emal;
    //console.log(req.body.email);
    const user = yield User_1.default.findById(_id, { password: 0 });
    if (!user) {
        return res.status(404).json('Usario no encontrado');
    }
    console.log(user);
});
//# sourceMappingURL=auth.js.map