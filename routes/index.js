var express = require('express');
var router = express.Router();

const {getTopCards,getCards,getCardsForUser,getAllCardsForUser,getCardsPublicPrivate}=require('../crud/CRUDcards');
const {getImageForUser}=require('../crud/CRUDimages');
const { getDataUser } = require('../crud/CRUDusers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Celestial blink' });
});

router.post('/',(req,res)=>{
  console.log(req.body,"me llego esto");
  selectContent(req.body).then(ress=>{
    if (ress.state) {
      console.log(ress,"esto voy a renderizar");
      res.render('partial',{layout:false,part:ress}); 
    }else{
      res.send(ress.message);
    }
  }).catch(errr=>{
    console.log(errr,"error aqui");
    res.send(errr.message);
  })
});

const selectContent=async(object)=>{
  switch (object.title){
    case "last":
      let last=await getTopCards();
      return {state:true, last:"yes",data:last};
    case "all":
      let all=await getCards(object);
      return {state:true, all:"yes", data:all.data,pages:all.pages,total:all.total};
    case "mycards":
      let forUser=await getCardsForUser(object);
      return {state:true,edit:"mycards", mycards:"yes",data:forUser.data,pages:forUser.pages,total:forUser.total};
    case "contact":
      return {state:true, contact:"yes"};
    case "profile":
      return {state:true, profile:"yes"};

    case "componentFormCards":
      return {state:true,partial:"component", componentFormCards:"yes"};
    case "editprofile":
      return {state:true,partial:"component", editprofile:"yes"};
    case "mygalery":
      let image=await getImageForUser(object);
      return {state:true,partial:"component", mygalery:"yes",data:image};
    case "privacity":
      let privacity=await getAllCardsForUser(object)
      return {state:true,partial:"component", privacity:"yes",data:privacity,total:privacity.total};
    case "myprofile":
      let countCards=await getAllCardsForUser(object);
      let dateUser=await getDataUser(object);
      let countImages=await getImageForUser(object);
      let prv=await getCardsPublicPrivate(object);
      return {state:true,partial:"component", myprofile:"yes", user:dateUser, cards:countCards.length, images:countImages.length,privates:prv.private.length,publics:prv.public.length};

    default :
      return {state:false,message:"no se encontro dato"};
  }
}

module.exports = router;