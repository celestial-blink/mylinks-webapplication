const sendDataUser=async(form)=>{
    let formdata=new FormData(form);
    formdata.append('action',"update");
    formdata.append('_id',sessionStorage.getItem('id'));
    formdata.append('form',form.getAttribute('id'));
    let data=await fetch('/crud',{method:'post',body:formdata});

    return await data.json();
}
const showPasswordUser=()=>{
    let btnsShows=document.querySelectorAll(".form>.password>a");
    btnsShows.forEach(element=>{
        element.onclick=(e)=>{
            e.preventDefault();
            let data=e.target.parentElement.previousElementSibling.getAttribute('type');
            e.target.parentElement.previousElementSibling.setAttribute('type',(data=="password")?"text":"password");
        }
    });
}
const initializeFormUser=()=>{
    let form=document.querySelector("#form-user");
    form.onsubmit=(e)=>{
        e.preventDefault();
        sendDataUser(form).then(res=>{
            if (res.state) {
                showMessage({message:res.message,type:"ok"});
                sessionStorage.setItem('user',form.user.value);
                sessionStorage.setItem('fullmame',form.fullname.value);
            }else{
                showMessage({message:res.message,type:"err"});
            }
        }).catch(err=>{
            showMessage({message:err.message,type:"err"});
        })
    }
    showPasswordUser();
}
