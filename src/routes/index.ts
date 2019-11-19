import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, getPhotosV, createPhoto, deletePhoto, getPhoto, updatePhoto} from '../controllers/photo.controller'
import { signup, signin, profile, datoUsuario} from '../controllers/auth';
import { TokenValidation} from '../libs/verifyToken';


// routes
router.route('/photos')
    .get( getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photosV:vendedor')
    .get( getPhotosV)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get( getPhoto)
    .delete( deletePhoto)
    .put(updatePhoto);

router.route('/datos/:idv')
    .get(datoUsuario);


 
 router.route('/signin')
 	.post(signin);

 router.route('/signup')
 	.post(signup);

 router.route('/profile')
 	.get( TokenValidation, profile);



export default router;