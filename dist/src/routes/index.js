"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const multer_1 = __importDefault(require("../libs/multer"));
const photo_controller_1 = require("../controllers/photo.controller");
const auth_1 = require("../controllers/auth");
const verifyToken_1 = require("../libs/verifyToken");
// routes
router.route('/photos')
    .get(photo_controller_1.getPhotos)
    .post(multer_1.default.single('image'), photo_controller_1.createPhoto);
router.route('/photos/:id')
    .get(photo_controller_1.getPhoto)
    .delete(photo_controller_1.deletePhoto)
    .put(photo_controller_1.updatePhoto);
router.route('/signin')
    .post(auth_1.signin);
router.route('/signup')
    .post(auth_1.signup);
router.route('/profile')
    .get(verifyToken_1.TokenValidation, auth_1.profile);
exports.default = router;
//# sourceMappingURL=index.js.map