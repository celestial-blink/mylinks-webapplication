const createLinks=()=>{
    let btn=document.querySelector("#form-card>span>input[type='button']"); 
    
    btn.onclick=()=>{
        let tip=document.querySelector("#type-link");
        let link=document.querySelector("#link");
        let ul=document.querySelector("#all-links");
        if (ul.childElementCount<2 && link.value!=""){
            let li=document.createElement('li');
            let p=document.createElement('p');
            let a=document.createElement('a');
            let i=document.createElement('i');
            i.classList.add("fa");
            i.classList.add("fa-trash");
            i.setAttribute('arial-hiden',"true")
            a.href="#";
            a.appendChild(i);
            p.textContent=tip.value+">"+link.value;
            li.appendChild(p);
            li.appendChild(a);
            ul.appendChild(li);
        }
        link.value="";
        link.focus();
        deleteLinks();
    }

}
const getLinks=()=>{
    let links=document.querySelectorAll("#all-links>li>p");
    let data=[];
    links.forEach(element=>{
        data.push(element.textContent);
    });
    return data;
}

const deleteLinks=()=>{
    let btn=document.querySelectorAll("#all-links>li>a");
    btn.forEach(element=>{
        element.onclick=(e)=>{
            e.preventDefault();
            console.log();
            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
        }
    });
}
const sendDataCards=async(form)=>{
    let formdata=new FormData(form);
    formdata.append("action",form.getAttribute('act'));
    formdata.append("form",form.getAttribute('id'));
    formdata.append("id",form.getAttribute('key'));
    formdata.append("_id",sessionStorage.getItem('id'));
    if(form.getAttribute('image')!=null){
        formdata.append("imagename", form.getAttribute('image'));
    }
    formdata.append("links",getLinks());
    let send=await fetch('/crud',{
        method:"post",
        body:formdata
    });
    return await send.json();
}
const clearFormCard=()=>{
    let form=document.querySelector("#form-card");
    if (form!=null){
        form.reset();
    }
}

const getDataImages=async()=>{
    let urlparams=new URLSearchParams();
    urlparams.append('data','images');
    urlparams.append('id',sessionStorage.getItem('id'));
    let data=await fetch('/getdata',{
        method:"post",
        body:urlparams
    });
    return await data.json();
}

const createElemetsImages=(object)=>{
    let container=document.querySelector("div#image>div");
    let div=document.createElement('div');
    div.classList.add("wrapper-images");
    let img=new Image();
    img.src=object.image;
    img.setAttribute('key',object.id);
    img.onload=()=>{
        div.appendChild(img);
        container.appendChild(div);
        selectYourImage();
    }
}

const getImages=()=>{
    getDataImages().then(res=>{
        if (res.state){
            for(let key in res.data){
                createElemetsImages({image:res.data[key].image,id:res.data[key]._id});
            }
        }else{
            console.log(res.message);
        }
    }).catch(err=>{
        console.log(err);
    })
}
const selectYourImage=()=>{
    let image=document.querySelectorAll(".wrapper-images>img");
    let form=document.querySelector("#form-card");
    let div=document.querySelector("div#image");
    let check=document.querySelector(".image-privacity>span>i");
    image.forEach(element=>{
        element.onclick=(e)=>{
            form.setAttribute('image',e.target.getAttribute('src'));
            check.style.display="inline-block";
            div.style.left="-200%";
        }
    });
};

const modalImagen=()=>{
    let btnImage=document.querySelector("span.image-privacity>span>a");
    let contentImages=document.querySelector("#image");
    let btnClose=document.querySelector("#image>a");
    btnClose.onclick=(e)=>{
        e.preventDefault();
        contentImages.style.left="-200%";
    }
    btnImage.onclick=(e)=>{
        e.preventDefault();
        contentImages.style.left="0%";
    }
}
const initializeCards=()=>{
    let form=document.querySelector("#form-card");
    let links=document.querySelector("#all-links");
    let iconCheck=document.querySelector("#form-card>.image-privacity>span>i");
    let position=document.querySelector("#title-position");
    form.onsubmit=(e)=>{
        e.preventDefault();
        sendDataCards(form).then(res=>{
            if (res.state){
                showMessage({message:res.message,type:"ok"});
                setTimeout(() => {
                    links.innerHTML="";
                    form.reset();
                    iconCheck.style.display="none";
                    getDataForContainer('data',position.getAttribute('data')).then(ress=>{
                        setContainer({content:ress});
                        loadScripts(e.target.getAttribute('id'));
                        closeLoader();
                    }).catch(errr=>{
                        closeLoader();
                    });
                }, 2000);
            }else{
                showMessage({message:res.message,type:"err"});
            }
        }).catch(err=>{
            showMessage({message:err, type:"err"});
        })
    }
    createLinks();
    deleteLinks();
    modalImagen();
    getImages();
};