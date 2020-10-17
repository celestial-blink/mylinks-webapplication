const {Schema,model}=require('mongoose');

const imageSchema=new Schema({
    image:{
            type:String,
            required:true
        },
    date:{
            type:Date,
            default:Date.now()
        },
    user:[{
            type:Schema.Types.ObjectId,
            ref:"User",
            require:true
        }]
});

const modelImages=model("Image",imageSchema);

module.exports = modelImages;