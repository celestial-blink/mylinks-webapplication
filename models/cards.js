const {Schema,model}=require('mongoose');

const cardsSchema = new Schema({
    title:{
            type:String,
            required:true
        },
    description:{
            type:String,
            default:""
        },
    links:{
            type:Array,
            default:[]
            },
    user:[{
            type:Schema.Types.ObjectId,
            require:true,
            ref:'User'
        }],
    date:{
            type:Date,
            default:Date.now()
        },
    like:{type:Number,
            default:0
        },
    dislike:{
            type:Number,
            default:0
        },
    image:{
            type:String,
            default:"/images/defaultImage.jpg"
        },
    privacity:{
        type:Boolean,
        default:false
    }
});

const modelCards=model("Card",cardsSchema);

module.exports = modelCards;