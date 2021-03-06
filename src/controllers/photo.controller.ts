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
    const tipo = req.body.tipo;
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
            //console.log(vendedor);
            //console.log(transaccion);
            //console.log(precio);
            //console.log(sector);
            //console.log('pi :',pi);
            //console.log('pf :',pf);
            
            //const photo = await Photo.find({vendedor: vendedor});
            //return res.json(photo);

            if(!transaccion && !precio && !sector && !tipo) {    
                const photo = await Photo.find({vendedor: vendedor});
                return res.json(photo);
            }

            else if (!sector && !precio && !tipo){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion});
                return res.json(photo);    
            }
            else if (!transaccion && !sector && !precio){
                const photo = await Photo.find({vendedor: vendedor, tipo: tipo});
                return res.json(photo);    
            }
            else if (!transaccion && !precio && !tipo ){
                const photo = await Photo.find({vendedor: vendedor, sector: sector});
                return res.json(photo);    
            }
            else if (!transaccion && !sector && !tipo){
                const photo = await Photo.find({vendedor: vendedor, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);    
            }




            else if (!sector && !precio ){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, tipo: tipo});
                return res.json(photo);    
            }
           else if (!tipo && !precio ){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, sector: sector});
                return res.json(photo);    
            }
            else if (!tipo && !sector ){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, precio: {$gte:pi, $lte:pf}, tipo: tipo});
                return res.json(photo);    
            }


            else if (!transaccion && !precio ){
                const photo = await Photo.find({vendedor: vendedor, sector: sector, tipo: tipo});
                return res.json(photo);    
            }
            else if (!transaccion && !tipo ){
                const photo = await Photo.find({vendedor: vendedor, sector: sector, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);    
            }


            else if (!transaccion && !sector ){
                const photo = await Photo.find({vendedor: vendedor, precio: {$gte:pi, $lte:pf}, tipo: tipo});
                return res.json(photo);    
            }

            else if (!transaccion && !tipo ){
                const photo = await Photo.find({vendedor: vendedor, precio: {$gte:pi, $lte:pf}, sector: sector});
                return res.json(photo);    
            }


            else if (!transaccion ){
                const photo = await Photo.find({vendedor: vendedor, sector: sector, precio: {$gte:pi, $lte:pf}, tipo: tipo });
                return res.json(photo);  
            }

            else if (!tipo ){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, sector: sector, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);  
            }

            else if (!sector){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, precio: {$gte:pi, $lte:pf}, tipo: tipo });
                return res.json(photo);  
            }
            else if (!precio){
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion,  sector: sector, tipo: tipo});
                return res.json(photo);
            }  



             else {
                const photo = await Photo.find({vendedor: vendedor, transaccion: transaccion, tipo :tipo, sector: sector, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);
            }
           

             


        }

export async function getPhotosVC(req: Request, res: Response): Promise<Response> {
    // Se busca en todos los gestores inmoviviliarios
    //console.log(req.body);
    const  transaccion1 = req.body.transaccion1;
    const  transaccion2 = req.body.transaccion2;
    const  transaccion3 = req.body.transaccion3;
    const tipo = req.body.tipo;
    const sector = req.body.sector;
    var pi = req.body.pi;
    var pf = req.body.pf;

    var precio = "all";


    var trin= "$in";
    var tiin= "$in";
    var sein= "$in";
    
           if(!transaccion1 && !transaccion2 && !transaccion3) {    
               var trin= "$nin";
            }

            if(!tipo) {    
               var tiin= "$nin";
            }

            if(!sector) {    
               var sein= "$nin";
            }
    
          
            if(!pi) {    
               pi= 1;
            }

            if(!pf) {    
               pf= 99999999;
            }

    var p1={transaccion:{[trin]: [transaccion1, transaccion2, transaccion3],  }, tipo :{[tiin]: [tipo]}, sector: {[sein]: [sector]}, precio: {$gte:pi, $lte:pf}};

           //console.log(transaccion);
           //console.log(tipo);
           //console.log(sector);
           //console.log(precio);
           //console.log(req.body.precio);
           //console.log(trin);
          // console.log(p1);
            
          // console.log('pi :',pi);
          // console.log('pf :',pf);
            
            //const photo = await Photo.find({});
            //return res.json(photo);


          if(!transaccion1 && !transaccion2 && !transaccion3 && !pi && !pf && !sector && !tipo) {    
                const photo = await Photo.find({});
                return res.json(photo);
            }
          else if (!sector && !precio && !tipo){
                const photo = await Photo.find({transaccion: transaccion1});
                return res.json(photo);    
            }
          else {
                const photo = await Photo.find(p1);
                return res.json(photo);
            }


/*
             if(!transaccion && ! precio && !sector && !tipo) {    
                const photo = await Photo.find({});
                return res.json(photo);
            }

            else if (!sector && !precio && !tipo){
                const photo = await Photo.find({transaccion: transaccion});
                return res.json(photo);    
            }
            else if (!transaccion && !sector && !precio){
                const photo = await Photo.find({tipo: tipo});
                return res.json(photo);    
            }
            else if (!transaccion && !precio && !tipo ){
                const photo = await Photo.find({sector: sector});
                return res.json(photo);    
            }
            else if (!transaccion && !sector && !tipo){
                const photo = await Photo.find({precio: {$gte:pi, $lte:pf}});
                return res.json(photo);    
            }




            else if (!sector && !precio ){
                const photo = await Photo.find({transaccion: transaccion, tipo: tipo});
                return res.json(photo);    
            }
           else if (!tipo && !precio ){
                const photo = await Photo.find({transaccion: transaccion, sector: sector});
                return res.json(photo);    
            }
            else if (!tipo && !sector ){
                const photo = await Photo.find({transaccion: transaccion, precio: {$gte:pi, $lte:pf}, tipo: tipo});
                return res.json(photo);    
            }


            else if (!transaccion && !precio ){
                const photo = await Photo.find({sector: sector, tipo: tipo});
                return res.json(photo);    
            }
            else if (!transaccion && !tipo ){
                const photo = await Photo.find({sector: sector, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);    
            }


            else if (!transaccion && !sector ){
                const photo = await Photo.find({precio: {$gte:pi, $lte:pf}, tipo: tipo});
                return res.json(photo);    
            }

            else if (!transaccion && !tipo ){
                const photo = await Photo.find({precio: {$gte:pi, $lte:pf}, sector: sector});
                return res.json(photo);    
            }


            else if (!transaccion ){
                const photo = await Photo.find({sector: sector, precio: {$gte:pi, $lte:pf}, tipo: tipo });
                return res.json(photo);  
            }

            else if (!tipo ){
                const photo = await Photo.find({transaccion: transaccion, sector: sector, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);  
            }

            else if (!sector){
                const photo = await Photo.find({transaccion: transaccion, precio: {$gte:pi, $lte:pf}, tipo: tipo });
                return res.json(photo);  
            }
            else if (!precio){
                const photo = await Photo.find({transaccion: transaccion,  sector: sector, tipo: tipo});
                return res.json(photo);
            }  



             else {
                const photo = await Photo.find({transaccion: transaccion, tipo :tipo, sector: sector, precio: {$gte:pi, $lte:pf}});
                return res.json(photo);
            }
*/

        }

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { transaccion, tipo, precio, sector, metros, caracteristicas, vendedor } = req.body;
   // console.log(req.body);
    const newPhoto = { transaccion, tipo, precio, sector, metros, caracteristicas, vendedor, imagePath: req.file.path };
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
    //console.log (id);
    const {transaccion, tipo, precio, sector, metros, caracteristicas, vendedor } = req.body;
    //console.log(req.body);
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            transaccion,
            tipo, 
            precio, 
            sector, 
            metros, 
            caracteristicas,
            vendedor
    });
    return res.json({
        message: 'Información actualizada',
        updatedPhoto
    });
}