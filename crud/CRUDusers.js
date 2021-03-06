let User=require('../models/users');
let Cars=require('../models/cards');
let Images=require('../models/images');
let Likes=require('../models/likes');

const insertUser=async(object)=>{
    let insert=new User({
        user:object.user,
        password:object.password,
        fullname:object.fullname
    });
    return await insert.save();
};

const updateUser=async(object)=>{
    let update=await User.updateOne(
        {_id:object._id},
        {
            $set:{
                user:object.user,
                password:object.password,
                fullname:object.fullname
            }
        }
    );
    return update;
}

const deleteUser=async(object)=>{
    let deleteCards=await Cars.deleteMany({
        user:object.id
    });
    let deleteImages=await Images.deleteMany({
        user:object.id
    });
    let deleteLikes=await Likes.deleteMany({
        user:object.id
    });
    let deleteUser=await User.deleteOne({
        _id:object.id
    });
    return {likes:deleteLikes,cards:deleteCards,users:deleteUser,images:deleteImages};
};

const getUserLogin=async(object)=>{
    let search=await User.findOne({
        $and:[
            {user:object.user},
            {password:object.password}
        ]
    });
    return search;
}

const getDataUser=async(object)=>{
    let data=await User.findOne({
        _id:object.id
    });
    return data;
}

module.exports = {deleteUser,updateUser,insertUser, getUserLogin,getDataUser};