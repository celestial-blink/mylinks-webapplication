const {connect}=require('mongoose');

// let url="mongodb://127.0.0.1:27017/sharelinks";
let urlAtlas="mongodb+srv://"+process.env.USERDB+":"+process.env.PASSDB+"@cluster0.gt8zx.mongodb.net/<dbname>?retryWrites=true&w=majority";

const getConection=async()=>{
    let connection=await connect(urlAtlas,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    });
    return connection;
}

module.exports = {getConection};