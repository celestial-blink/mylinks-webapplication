const sendData=async(form)=>{
    let formdata=new FormData(form);
    formdata.append("action",form.getAttribute('act'));
    let urlparams=new URLSearchParams(formdata);
    let send=await fetch('/login',{
        method:"POST",
        body:urlparams
    });
    return await send.json();
}
const showPassword=()=>{
    let show=document.querySelectorAll("form.form>span.password>a");
    show.forEach(element=>{
        element.onclick=(e)=>{
            e.preventDefault();
            let typevalue=e.target.parentElement.previousElementSibling.getAttribute('type');
            e.target.parentElement.previousElementSibling.setAttribute('type',(typevalue=="password")?"text":"password");
        }
    })
}
const initializeLogin=()=>{
    showPassword();
    let forms=document.querySelectorAll("form.form");
    forms.forEach(element=>{
        element.onsubmit=(e)=>{
            e.preventDefault();
            openLoader();
            sendData(e.target).then(res=>{
                if(res.state){
                    showMessage({message:res.message,type:"ok"});
                    if(e.target.getAttribute('act')=="login"){
                        sessionStorage.setItem('id',res.data.id);
                        sessionStorage.setItem('user',res.data.user);
                        sessionStorage.setItem('fullname',res.data.fullname);
                        window.location.href="/inicio";
                    }else{
                        setTimeout(()=>{
                            window.location.href=window.location.href.split("#")[0]+"#";
                        },1500);
                    }
                }else{
                    showMessage({message:res.message,type:"err"});
                }
            }).catch(err=>{
                showMessage({message:err,type:"err"});
                console.log(err);
                closeLoader();
            })
        }
    })
}

initializeLogin();