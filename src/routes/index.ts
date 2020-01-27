import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, getPhotosV, getPhotosVC, createPhoto, deletePhoto, getPhoto, updatePhoto} from '../controllers/photo.controller'
import { signup, signin, profile, datoUsuario} from '../controllers/auth';
import { TokenValidation} from '../libs/verifyToken';


// routes
router.route('/photos')
    .get( getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photosV:vendedor')
    .post( getPhotosV)//get ojo estoy probando ojala no la cague 
    .post(upload.single('image'), createPhoto);

router.route('/photosC')
    .post( getPhotosVC)//get ojo estoy probando ojala no la cague 

//router.route('/photosC')
//    .post( getPhotosV)//get ojo estoy probando ojala no la cague 
//    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get( getPhoto)
    .delete( deletePhoto)
    .put(updatePhoto);

router.route('/datos:idv')
    .post(datoUsuario);

 
 router.route('/signin')
 	.post(signin);

 router.route('/signup')
 	.post(signup);

 router.route('/profile')
 	.get( TokenValidation, profile);



export default router;