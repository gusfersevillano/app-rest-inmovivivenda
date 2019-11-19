import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function getPhotosV(req: Request, res: Response): Promise<Response> {
    const  v1  = req.body.vendedor;
    const {vendedor} = req.params;
    console.log('vendedor :',vendedor);
    const photo = await Photo.find({vendedor: vendedor});
    return res.json(photo);
}


export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { transaccion, precio, sector, metros, caracteristicas, vendedor } = req.body;
   // console.log(req.body);
    const newPhoto = { transaccion, precio, sector, metros, caracteristicas, vendedor, imagePath: req.file.path };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'El proyecto fue savado existosamente',
        
    });
};

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

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}



export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {  transaccion, precio, sector, metros, caracteristicas } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
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
}