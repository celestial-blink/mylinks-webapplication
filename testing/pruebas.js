const {getConection}=require('../conection/mongoConnection');
const {getLikesForUser}=require('../crud/CRUDlikes');

getConection().then(res=>{
    console.log("conectado");
    getLikesForUser({
        card:"5f8ba15b3f4a2c15c8293245",
        user:"5f8b6ceff1b5410ee08b1355"
    }).then(ress=>{
        console.log(JSON.stringify(ress),"respuesta co");
    }).catch(errr=>{
        console.log(JSON.stringify(errr),"algo de error");
    })
}).catch(err=>{
    console.log(err.message);
})