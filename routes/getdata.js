const {Router}=require('express');
const {getImageForUser}=require('../crud/CRUDimages');
const {getDataUser}=require('../crud/CRUDusers');
const {getCountLikes,getLikesForUser}=require('../crud/CRUDlikes');

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
        case "dis-likes":
            let likes=await getCountLikes({
                ...object,...{title:"like"}
            });
            let dislikes=await getCountLikes({
                ...object,...{title:"dislike"}
            });
            if (object.user!='null'){
                let likeUser=await getLikesForUser(object);
                return {state:true,likes:likes.length,dislikes:dislikes.length,data:likeUser};
            }else{
                return {state:true,likes:likes.length,dislikes:dislikes.length};
            }
        default:
            return {state:false,message:"no se encontró dato"}
    }
}

module.exports = router;