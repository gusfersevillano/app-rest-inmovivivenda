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
    
    const {vendedor} = req.params;
    const  transaccion = req.body.transaccion;
    const  sector = req.body.sector;
    const  precio = req.body.precio;
    var pi =0;
    var pf = 9999999;
   
            if (Number(precio) == 1 ){
                 var pi = 0;
                 var pf = 100;

            }else if (precio == 2){
                 var pi = 100;
                 var pf = 300;
            }else if (precio == 3){
                 var pi = 300;
                 var pf = 500;
             }else if (precio == 4){
                 var pi = 500;
                 var pf = 1000;

            }else if (precio == 5){
                 var pi = 1000;
                 var pf = 5000;
            }else if (precio == 6){
                 var pi = 5000;
                 var pf = 50000;
             }else if (precio == 7){
                 var pi = 75000;
                 var pf = 100000;
            }else if (precio == 8){
                 var pi = 100000;
                 var pf = 150000;
            }else if (precio == 9){
                 var pi = 150000;
                 var pf = 300000; 
            }else if (precio == 10){
                 var pi = 300000;
                 var pf = 30000000;                      
                                   
             } else {

                var pi = 0;
                var  pf = 100000000;
              
                     }
           // console.log(vendedor);
           // console.log(transaccion);
           // console.log(precio);
           // console.log(sector);
           // console.log('pi :',pi);
           // console.log('pf :',pf);
            
            //const photo = await Photo.find({vendedor: vendedor});
            //return res.json(photo);

            if(!transaccion && !precio && !sector) {    
                const photo = await Photo.find({vendedor: vendedor});
                return res.json(photo);
            }
            else if (!sector && !precio ){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion});
                return res.json(photo);    
            }
            else if (!transaccion && !precio ){
                const photo = await Photo.find({vendedor: vendedor, sector: sector});
                return res.json(photo);    
            }
            else if (!transaccion && !sector ){
                const photo = await Photo.find({vendedor: vendedor, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);    
            }

            else if (!transaccion ){
                const photo = await Photo.find({vendedor: vendedor, sector: sector, precio: {$gte:pi, $lte:pf} });
                return res.json(photo);  
            }
            else if (!sector){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, precio: {$gte:pi, $lte:pf} });
                return res.json(photo);  
            }
            else if (!precio){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion,  sector: sector});
                return res.json(photo);  

            } else {
                const photo = await Photo.find({vendedor: vendedor, sector: sector, precio: {$gte:pi, $lte:pf}, transaccion: transaccion});
                return res.json(photo);
            }

             


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