import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};


export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    console.log(req.body);
    const newPhoto = { title, description, imagePath: req.file.path };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        
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
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}