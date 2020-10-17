const openLoader=()=>{
    let loader=document.querySelector("#loader");
    loader.style.cssText="display:flex;opacity:1;";
}
const closeLoader=()=>{
    let loader=document.querySelector("#loader");
    loader.style.cssText="opacity:0";
    setTimeout(()=>{
        loader.style.cssText="display:none";
    },2000);
}