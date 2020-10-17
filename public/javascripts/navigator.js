const setRedirect=()=>{
    let btn=document.querySelector("#log-inout");
};
const inicializeNavigator=()=>{
    let btnone=document.querySelector("#btn-omenu");
    let btntwo=document.querySelector("#btn-option-menu");
    btnone.onclick=(e)=>{
        let wn=window.location.href.split("#")[1];
        btnone.href=( wn==undefined || wn=="")?"#items-nav":"#";
        console.log(btone);
    }

    btntwo.onclick=(e)=>{
        let wn=window.location.href.split("#")[1];
        btntwo.href=(wn==undefined || wn=="")?"#option-profile":"#";
    }
}
inicializeNavigator();