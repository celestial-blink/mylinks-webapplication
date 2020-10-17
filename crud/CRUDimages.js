let Images=require('../models/images');

const insertImage=async(object)=>{
    let insert=new Images({
        image:object.image,
        user:object._id
    });
    return await insert.save();
};

const deleteImage=async(object)=>{
    let deleted=await Images.deleteOne({
        _id:object.id
    });
    return deleted;
}

const getImageForUser=async(object)=>{
    let images=await Images.find({user:object.id});
    return images;
}

module.exports = {insertImage,deleteImage,getImageForUser};