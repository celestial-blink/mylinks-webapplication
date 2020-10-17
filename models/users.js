let {Schema,model}=require('mongoose');

const userSchema=new Schema({
    user:{
            type:String,
            required:true,
            unique:true
         },
    password:{
            type:String,
            required:true
        },
    fullname:{
            type:String,
            default:"fullname"
        },
    state:{
            type:Boolean,
            default:true
        },
    date:{
            type:Date,
            default:Date.now()
        }
});

const modelUser=model('User',userSchema);

module.exports = modelUser;