let {Router}=require('express');

let router=Router();
router.get('/',(req,res)=>{
    res.render("pruebas",{});
});

module.exports=router;