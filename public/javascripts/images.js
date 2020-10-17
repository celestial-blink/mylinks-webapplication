const sendDataImages=async(object)=>{
    let formdata=new FormData();
    formdata.append('id',object.getAttribute('key'));
    formdata.append('imagename',object.getAttribute('src'));
    formdata.append('action','delete');
    formdata.append('form','form-image');

    let send=await fetch('/crud',{
        method:"POST",
        body:formdata
    });
    return await send.json();
}
const initializeImages=()=>{
    let btnDelete=document.querySelectorAll(".wrapper-images>a");
    let container=document.querySelector("#profile-content>div");
    btnDelete.forEach(element=>{
        element.onclick=(e)=>{
            e.preventDefault();
            sendDataImages(e.target.parentElement.previousElementSibling).then(res=>{
                if(res.state){
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
                    showMessage({type:"err",message:res.message});
                }
            }).catch(err=>{
                showMessage({type:"err",message:err});
            })
        }
    });
}