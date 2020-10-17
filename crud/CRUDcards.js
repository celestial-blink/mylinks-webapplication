let Cards=require('../models/cards');

const insertCards=async(object)=>{
    let insert=new Cards({
        title:object.title,
        description:object.description,
        links:object.links,
        image:object.imagename,
        privacity:object.privacity,
        user:object._id
    });
    return await insert.save();
}

const updateCards=async(object)=>{
    let update=await Cards.updateOne(
        {_id:object.id},
        {
            $set:{
                title:object.title,
                description:object.description,
                links:object.links,
                image:object.imagename,
                privacity:object.privacity
            }
        }
    );
    return update;
}

const deleteCards=async(object)=>{
    let deleted=await Cards.deleteOne({
        _id:object.id
    });
    return deleted;
}

const getCards=async(object)=>{
    let total=(object.search==undefined)?await Cards.find({privacity:true}).count():
    await Cards.find({
        $and:[
            {privacity:true},
            {
                $or:[
                    {title:new RegExp(`^${object.search}`)},
                    {title:new RegExp(`${object.search}$`)}
                ]
            }
        ]
    }).count();
    let cards=12;
    let pages=Math.ceil(total/cards);
    let pagesArray=[];
    for(let index=1;index<=pages;index++){
        pagesArray.push(index);
    }
    let page=(object.page==undefined)?1:object.page;
    let start=(page-1)*cards;
    let all=(object.search==undefined)?await Cards.find({privacity:true}).populate('user').skip(start).limit(cards):
        await Cards.find({$and:[
            {privacity:true},
            {$or:[
                {title:new RegExp(`^${data.search}`)},
                {title:new RegExp(`${data.search}$`)}
            ]}
        ]}).populate('user').skip(start).limit(cards);

    return {pages:pagesArray,total:all.length,data:all};
};

const getTopCards=async()=>{
    let top=await Cards.find({privacity:true}).sort({date:-1}).limit(12).populate('user');
    return top;
}

const updateLikes=async(object)=>{
    let update=(object.like!=undefined)?await Cards.updateOne(
        {_id:object._id},
        {
            $inc:{
                like:1
            }
        }
    ):await Cards.updateOne(
        {_id:object._id},
        {
            $inc:{
                dislike:1
            }
        }
    );
    return update;
};

const getCardsForUser=async(object)=>{
    let total=await Cards.find({
        user:object.id
    }).count();
    let cards=12;
    let pages=Math.ceil(total/cards);
    let pagesArray=[];
    for(let index=1;index<=pages;index++){
        pagesArray.push(index);
    }
    let page=(object.page==undefined)?1:object.page;
    let start=(page-1)*cards;
    let get=await Cards.find({
        user:object.id
    }).skip(start).limit(cards).populate('user');

    return {pages:pagesArray, data:get, total:get.length};
}

const getAllCardsForUser=async(object)=>{
    let all=await Cards.find({
        user:object.id
    });
    return all;
}

const updatePrivacity=async(object)=>{
    let update=await Cards.updateOne(
        {_id:object.id},
        {$set:{
            privacity:object.privacity
        }}
    );
    return update;
}

module.exports = {getCards,getCardsForUser,insertCards,updateCards,updateLikes,deleteCards,getTopCards,updatePrivacity,getAllCardsForUser}