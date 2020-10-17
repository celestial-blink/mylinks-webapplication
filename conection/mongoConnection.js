const {connect}=require('mongoose');

let url="mongodb://127.0.0.1:27017/sharelinks";

const getConection=async()=>{
    let connection=await connect(url,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    });
    return connection;
}

module.exports = {getConection};