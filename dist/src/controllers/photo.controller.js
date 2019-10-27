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
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const Photo_1 = __importDefault(require("../models/Photo"));
function getPhotos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photos = yield Photo_1.default.find();
        return res.json(photos);
    });
}
exports.getPhotos = getPhotos;
;
function createPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description } = req.body;
        console.log(req.body);
        const newPhoto = { title, description, imagePath: req.file.path };
        const photo = new Photo_1.default(newPhoto);
        yield photo.save();
        return res.json({
            message: 'Photo Saved Successfully',
        });
    });
}
exports.createPhoto = createPhoto;
;
/*
export async function createUsuario(req: Request, res: Response): Promise<Response> {
   
    const { username, email, password } = req.body    ;
     console.log(req.body);
     //console.log(username);
     //console.log(email);
     //console.log(password);
    const newUsario= { username, email, password};
    const user = new User(newUsario);
    await user.save();
    console.log(user);
    return res.json({
        message: 'User Saved Successssssfully',
        
    });
};*/
function getPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const photo = yield Photo_1.default.findById(id);
        return res.json(photo);
    });
}
exports.getPhoto = getPhoto;
function deletePhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const photo = yield Photo_1.default.findByIdAndRemove(id);
        if (photo) {
            yield fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
        }
        return res.json({ message: 'Photo Deleted' });
    });
}
exports.deletePhoto = deletePhoto;
;
function updatePhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedPhoto = yield Photo_1.default.findByIdAndUpdate(id, {
            title,
            description
        });
        return res.json({
            message: 'Successfully updated',
            updatedPhoto
        });
    });
}
exports.updatePhoto = updatePhoto;
//# sourceMappingURL=photo.controller.js.map