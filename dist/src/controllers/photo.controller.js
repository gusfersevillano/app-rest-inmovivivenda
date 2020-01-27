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
function getPhotosV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { vendedor } = req.params;
        const transaccion = req.body.transaccion;
        const sector = req.body.sector;
        const precio = req.body.precio;
        var pi = 0;
        var pf = 9999999;
        if (Number(precio) == 1) {
            var pi = 0;
            var pf = 100;
        }
        else if (precio == 2) {
            var pi = 100;
            var pf = 300;
        }
        else if (precio == 3) {
            var pi = 300;
            var pf = 500;
        }
        else if (precio == 4) {
            var pi = 500;
            var pf = 1000;
        }
        else if (precio == 5) {
            var pi = 1000;
            var pf = 5000;
        }
        else if (precio == 6) {
            var pi = 5000;
            var pf = 50000;
        }
        else if (precio == 7) {
            var pi = 75000;
            var pf = 100000;
        }
        else if (precio == 8) {
            var pi = 100000;
            var pf = 150000;
        }
        else if (precio == 9) {
            var pi = 150000;
            var pf = 300000;
        }
        else if (precio == 10) {
            var pi = 300000;
            var pf = 30000000;
        }
        else {
            var pi = 0;
            var pf = 100000000;
        }
        // console.log(vendedor);
        // console.log(transaccion);
        // console.log(precio);
        // console.log(sector);
        // console.log('pi :',pi);
        // console.log('pf :',pf);
        //const photo = await Photo.find({vendedor: vendedor});
        //return res.json(photo);
        if (!transaccion && !precio && !sector) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor });
            return res.json(photo);
        }
        else if (!sector && !precio) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, transaccion: transaccion });
            return res.json(photo);
        }
        else if (!transaccion && !precio) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, sector: sector });
            return res.json(photo);
        }
        else if (!transaccion && !sector) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, precio: { $gte: pi, $lte: pf } });
            return res.json(photo);
        }
        else if (!transaccion) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, sector: sector, precio: { $gte: pi, $lte: pf } });
            return res.json(photo);
        }
        else if (!sector) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, transaccion: transaccion, precio: { $gte: pi, $lte: pf } });
            return res.json(photo);
        }
        else if (!precio) {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, transaccion: transaccion, sector: sector });
            return res.json(photo);
        }
        else {
            const photo = yield Photo_1.default.find({ vendedor: vendedor, sector: sector, precio: { $gte: pi, $lte: pf }, transaccion: transaccion });
            return res.json(photo);
        }
    });
}
exports.getPhotosV = getPhotosV;
function createPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { transaccion, precio, sector, metros, caracteristicas, vendedor } = req.body;
        // console.log(req.body);
        const newPhoto = { transaccion, precio, sector, metros, caracteristicas, vendedor, imagePath: req.file.path };
        const photo = new Photo_1.default(newPhoto);
        yield photo.save();
        return res.json({
            message: 'El proyecto fue savado existosamente',
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
        const { transaccion, precio, sector, metros, caracteristicas } = req.body;
        const updatedPhoto = yield Photo_1.default.findByIdAndUpdate(id, {
            transaccion,
            precio,
            sector,
            metros,
            caracteristicas
        });
        return res.json({
            message: 'Información actualizada',
            updatedPhoto
        });
    });
}
exports.updatePhoto = updatePhoto;
//# sourceMappingURL=photo.controller.js.map