const openModal=()=>{
    let moda=document.querySelector("#modal");
    window.location.href=window.location.href+"#modal";   
};
const changeActionForm=()=>{
    let btnclose=document.querySelector("#modal>a");
    btnclose.onclick=(e)=>{
        let form=document.querySelector("#form-card");
        let iconCheck=document.querySelector("#form-card>.image-privacity>span>i");
        if (form!=null){
            form.setAttribute('act','insert');
            form.reset();
            iconCheck.style.display="none";
        }
    }
}