const {Schema,model}=require('mongoose');

let likesSchema=new Schema({
    card:[{
        type:Schema.Types.ObjectId,
        ref:"Card",
        required:true
    }],
    user:[{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    value:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

let modelLikes=model('Like',likesSchema);

module.exports = modelLikes;