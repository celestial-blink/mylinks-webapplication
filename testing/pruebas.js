const {getConection}=require('../conection/mongoConnection');
const {getTopCards}=require('../crud/CRUDcards');

getConection().then(res=>{
    console.log("conectado");
    getTopCards().then(res=>{
        console.log(JSON.stringify(res));
    }).catch(err=>{
        console.log(err.message);
    })
}).catch(err=>{
    console.log(err.message);
})