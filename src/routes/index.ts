import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto} from '../controllers/photo.controller'
import { signup, signin, profile} from '../controllers/auth';
import { TokenValidation} from '../libs/verifyToken';


// routes
router.route('/photos')
    .get( getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get( getPhoto)
    .delete( deletePhoto)
    .put(updatePhoto);

 
 router.route('/signin')
 	.post(signin);

 router.route('/signup')
 	.post(signup);

 router.route('/profile')
 	.get( TokenValidation, profile);



export default router;