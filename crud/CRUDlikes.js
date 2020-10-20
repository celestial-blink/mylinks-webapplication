const Likes=require('../models/likes');

const insertLikes=async(object)=>{
    let sav=new Likes({
        card:object.card,
        user:object.user,
        value:object.value
    });

    return await sav.save();
};

const updateLikes=async(object)=>{
    let update=await Likes.updateOne(
        {_id:object.idLike},
        {
            $set:{
                value:object.value
            }
        }
    );
    return await update;
};

const getLikesForUser=async(object)=>{
    let getForUser=await Likes.findOne(
        {$and:[
            {card:object.card},
            {user:object.user}
        ]}
    );
    return getForUser;
}

const getCountLikes=async(object)=>{
    switch(object.title){
        case "like":
            let like=await Likes.find(
                {
                    $and:[
                        {value:1},
                        {card:object.card}
                    ]
                }
            );
            return like;
        case "dislike":
            let dislike=await Likes.find(
                {
                    $and:[
                        {value:0},
                        {card:object.card}
                    ]
                }
            );
            return dislike;
        default:
            return "no se encontró dato para contar";

    }
};

const deleteLikes=async(object)=>{
    let del=await Likes.deleteOne({_id:object_id});
    return del;
}

module.exports={insertLikes,updateLikes,getLikesForUser,getCountLikes}