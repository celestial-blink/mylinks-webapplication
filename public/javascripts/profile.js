const sendDataProfile=async(object)=>{
    let urlparams=new URLSearchParams();
    urlparams.append("title", object.title);
    urlparams.append('id',sessionStorage.getItem('id'));
    let send=await fetch('/inicio',{
        method:"POST",
        body:urlparams
    });
    return await send.text();
};
const sendDataCrudProfile=async(object)=>{
    switch(object.type){
        case "update-user":
            let update=new FormData(object.form);
            update.append('action',"update");
            update.append("form",object.form.getAttribute('id'));
            let sendUpdateUser=await fetch('/crud',{
                method:"POST",
                body:update
            });

            return await sendUpdateUser.json();
        case "insert-image":
            let insertImage=new FormData(object.form);
            insertImage.append('action',object.form.getAttribute('act'));
            insertImage.append('form',object.form.getAttribute('id'));
            insertImage.append('_id',sessionStorage.getItem('id'));
            let sendInsertImage=await fetch('/crud',{
                method:"post",
                body:insertImage
            });

            return await sendInsertImage.json();
        
        case "delete-image":
            let deleteImage=new FormData();
            deleteImage.append('_id',object.imageid);
            let sendDeleteImage=await fetch("/crud",{
                method:"POST",
                body:deleteImage
            });
            return await sendDeleteImage.json();
        
        default:
            return {state:false,message:"no se encontro accion de profile"};            
    }
}
const setDataFormUserProfile=()=>{
    if (sessionStorage.getItem('id')!=null) {
        let form=document.querySelector("form#form-user");
        form.user.value=sessionStorage.getItem('user');
        form.fullname.value=sessionStorage.getItem('fullname');        
    }
}
const sendDataToImage=()=>{
    let image=document.querySelector("#new-imagen");
    let container=document.querySelector("#profile-content>div");

    image.onchange=(e)=>{
        if (image.files.length>0) {
            sendDataCrudProfile({type:"insert-image",form:image.parentElement}).then(res=>{
                if (res.state){
                    showMessage({type:"ok",message:res.message});
                    sendDataProfile({title:container.parentElement.getAttribute('data')}).then(ress=>{
                        container.innerHTML=ress.trim();
                        sendDataToImage();
                        showImageModal();
                        initializeImages();
                    }).catch(errr=>{
                        container.innerHTML=errr;
                    });

                }else{
                    showMessage({type:"err",message:res.message})
                }
            }).catch(err=>{
                showMessage({type:"err",message:err});
            });
        };
    }
}

const showImageModal=()=>{
    let img=document.querySelectorAll('div.wrapper-images>img');
    let container=document.querySelector('#modal>.content');
    img.forEach(element=>{
        element.onclick=(e)=>{
            container.innerHTML="";
            let im=new Image();
            im.src=e.target.getAttribute('src');
            container.appendChild(im);
            window.location.href=window.location.href.split("#")[0]+"#modal"
        }
    });
}

const initializeProfile=()=>{
    let btns=document.querySelectorAll("#btn-profile>a");
    let container=document.querySelector("#profile-content>div");
    let showComponents=document.querySelectorAll("#profile-content>span>*");
    showComponents[1].style.display="none";
    showComponents[2].style.display="none";
    btns.forEach(element=>{
        element.onclick=(e)=>{
            e.preventDefault();
            container.parentElement.setAttribute('data',e.target.getAttribute('href'));
            if(e.target.getAttribute('href')=="editprofile"){
                showComponents[1].style.display="none";
                showComponents[2].style.display="none";
            }else if(e.target.getAttribute('href')=="mygalery"){
                showComponents[2].style.display="inline-block";
                showComponents[1].style.display="none";
            }else if(e.target.getAttribute('href')=="privacity"){
                showComponents[1].style.display="inline-block";
                showComponents[2].style.display="none";
            }
            sendDataProfile({title:e.target.getAttribute('href')}).then(res=>{
                container.innerHTML=res.trim();
                if (e.target.getAttribute('href')=="editprofile"){
                    initializeFormUser();
                    setDataFormUserProfile();
                };
                if (e.target.getAttribute('href')=="mygalery"){
                    sendDataToImage();
                    showImageModal();
                    initializeImages();
                };
                if(e.target.getAttribute('href')=="privacity"){
                    initializePrivacity();
                }
            }).catch(err=>{
                container.innerHTML=err;
            })
        }
    });
}
