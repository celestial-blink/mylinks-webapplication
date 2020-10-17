const showMessage=(object)=>{
    let setmessage=document.querySelector("#message-content");
    setmessage.textContent=object.message;
    setmessage.parentElement.parentElement.style.left="0%";
    setmessage.parentElement.classList.remove('error','good');
    setmessage.parentElement.classList.add((object.type=="err")?"error":"good");  
    closeMessage();
}
const closeMessage=()=>{
    let setmessage=document.querySelector("#message-content");
    setTimeout(() => {
        setmessage.parentElement.parentElement.style.left="-300%"
    }, 5000);
}