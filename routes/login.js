let {Router}=require('express');
let {getUserLogin, insertUser}=require('../crud/CRUDusers');

let router=Router();

router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',(req,res)=>{
    console.log(req.body,"esto me llegó");
    selectAction(req.body).then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.send(ress)
    }).catch(errr=>{
        console.log(errr,"esto es el error");
        res.send(errr.message);
    })
});

const selectAction=async(object)=>{
    switch(object.action){
        case "login":
            let getUser=await getUserLogin(object);
            return (getUser==null)?{state:false, message:"error de usuario o contraseña"}:{state:true,message:"verificado",data:{id:getUser._id,user:getUser.user,fullname:getUser.fullname}};
        case "registration":
            if(object.password==object.repeat){
                let insert=await insertUser(object);
                return {state:true, message:"registrado en la aplicación"};
            }else{
                return {state:false, message:"las contraseñas no coinciden"};
            }
        default:
            return {state:false,message:"no se encontró accion"};
    }
}

module.exports = router;