const {Router}=require('express');
const {getImageForUser}=require('../crud/CRUDimages');
const {getDataUser}=require('../crud/CRUDusers');

let router=Router();

router.post('/',(req,res)=>{
    console.log(req.body,"esto me llego");
    selectData(req.body).then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.send(ress);
    }).catch(errr=>{
        res.send({state:false,message:errr.message});
    })
});

const selectData=async(object)=>{
    switch(object.data){
        case "images":
            let images=await getImageForUser(object);
            return {state:true,data:images};
        case "user":
            let user=await getDataUser(object);
            return {state:true,data:{user:user.user,fullname:user.fullname}};
        default:
            return {state:false,message:"no se encontró dato"}
    }
}

module.exports = router;