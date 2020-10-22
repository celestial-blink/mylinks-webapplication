const {Router}=require('express');
const {insertCards,updateCards,deleteCards,updatePrivacity}=require('../crud/CRUDcards');
const {insertImage,deleteImage}=require('../crud/CRUDimages');
const {insertUser,deleteUser,updateUser}=require('../crud/CRUDusers');
const {insertLikes,updateLikes}=require('../crud/CRUDlikes');

const multer=require('multer');

const path=require('path')
const fs=require('fs');

let storage=multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+"."+file.mimetype.split("/")[1]);
    }
});

let upload=multer({storage:storage});

let router=Router();

router.post("/",upload.any("image"),(req,res)=>{
    console.log(req.body,"esto me llegó");
    
    let obj={
        ...req.body,
        ...{links:(req.body.links==undefined)?[]:req.body.links.split(",")},
        ...{_id:(req.body._id=="null")?null:req.body._id},
        ...{image:(req.files.length==0)?"defaultImage.jpg":req.files[0].filename},
        ...{privacity:(req.body.privacity==undefined)?false:true}
    };
    console.log(obj,"me llego esto");
    selectAction(obj).then(ress=>{
        console.log(ress, "esto voy a enviar");
        res.send(ress);
        if (ress.img!=undefined){
            fs.unlinkSync( path.join(__dirname,`../uploads/${obj.imagename}`));
            console.log(obj.imagename+" -> eliminado");
        }
    }).catch(errr=>{
        console.log(errr,"aqui error");
        res.send({state:false,message:errr.message});
    })
});

const selectAction=async(object)=>{
    switch(object.action){
        case "insert":
            if(object._id!=null){
                let insert=await insertDocument(object);
                return insert;
            }else{
                return {state:false,message:"inicie session"};
            }
        case "update":
            let update=await updateDocument(object);
            return update;

        case "delete":
            let deleted=await deleteDocument(object);
            return deleted;
        
        case "personalized":
            let actPerso=await actionDocumentPersonalized(object);
            return actPerso;

        default:
            return {state:false,message:"no se encontró acción"}
    }
}

const insertDocument=async(object)=>{
    switch(object.form){
        case "form-card":
            let card=await insertCards(object);
            return {state:true,message:"guardado con éxito"};
        
            case "form-user":
            let user=await insertUser(object);
            return {state:true,message:"guardado con éxito"};
        
        case "form-image":
            let image=await insertImage(object);
            return {state:true,message:"guardado con éxito"};

        case "form-likes":
            let likes=await insertLikes(object);
            return {state:true, message:"guardado con éxito",data:likes};

        default:
            return {state:false,message:"no se encontró formulario"};
    }
};

const updateDocument=async(object)=>{
    switch(object.form){
        case "form-card":
            let card=await updateCards(object);
            return {state:true,message:"modificado con éxito"};

        case "form-user":
            if (object.password==object.repeat) {
                let user=await updateUser(object);
                return {state:true,message:"modificado con éxito"};        
            }else{
                return {state:false,message:"las constraseñas no coinciden"}
            }
        default:
            return {state:false, message:"no se encontró formulario"}
    }
}

const deleteDocument=async(object)=>{
    switch(object.form){
        case "form-card":
            let card=await deleteCards(object);
            return {state:true,message:"eliminado"};
        case "form-user":
            let user=await deleteUser(object);
            return {state:true,message:"eliminado", data:user};
        case "form-image":
            let image=await deleteImage(object);
            return {state:true,message:"eliminado",img:true};
        default:
            return {state:false,message:"no se encontró formulario"}
    }
}

const actionDocumentPersonalized=async(object)=>{
    switch(object.personalized){
        case "update-privacity":
            let updtPrivacity=await updatePrivacity(object);
            return {state:true,message:"actualizados"};
        case "update-likes-value":
            let updtLkesVal=await updateLikes(object);
            return {state:true, message:"likes actualizados"};
            
        default:
            return {state:false,message:"no se encontró acción personalizada"}
    }
}

module.exports = router;