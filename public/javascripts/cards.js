const sendDataDeleteCard=async(object)=>{
    let formdata=new FormData();
    formdata.append('id',object.id);
    formdata.append('action','delete');
    formdata.append('form','form-card');
    let send=await fetch('/crud',{
        method:"POST",
        body:formdata
    });
    return await send.json();
}

const editCard=()=>{
    let btn=document.querySelectorAll("span.operation>a:first-child");
    let form=document.querySelector("form#form-card");
    let ul=document.querySelector("ul#all-links");
    btn.forEach(element=>{
        element.onclick=(e)=>{
            let data=JSON.parse(e.target.parentElement.getAttribute('data'));
            form.setAttribute('act','update');
            form.setAttribute('image',data.image);
            form.setAttribute('key',data._id);
            form.title.value=data.title;
            form.description.value=data.description;
            form.privacity.checked=data.privacity;
            data.links.forEach(link=>{
                let li=document.createElement('li');
                let p=document.createElement('p');
                let a=document.createElement('a');
                let i=document.createElement('i');
                i.classList.add('fa');
                i.classList.add('fa-trash');
                i.setAttribute('arial-hiden',"true");
                a.href="#";
                a.appendChild(i);
                p.textContent=link;
                li.appendChild(p);
                li.appendChild(a);
                ul.appendChild(li);
            });

            deleteLinks();
            
        };
    });
}

const deleteCard=()=>{
    let btn=document.querySelectorAll("#operation-cards>a:last-child");
    btn.forEach(element=>{
        element.onclick=(e)=>{
            e.preventDefault();
            if(confirm("desea eliminar")){
                sendDataDeleteCard({id:e.target.parentElement.getAttribute('data')}).then(res=>{
                    if(res.state){
                        showMessage({message:res.message,type:"ok"});
                    }else{
                        showMessage({message:res.message,type:"err"});
                    }
                }).catch(err=>{
                    showMessage({message:err,type:"err"});
                })
            };
        }
    });
}

const insUpdtLikes=async(object)=>{
    let formdata=new FormData();
    formdata.append('action',object.action);
    formdata.append('form',object.form);
    formdata.append('card',object.card);
    formdata.append('user',sessionStorage.getItem('id'));
    formdata.append('value',object.value);
    formdata.append('_id',sessionStorage.getItem('id'));
    formdata.append('idLike',object.idLike),
    formdata.append('personalized',object.personalized)
    let send=await fetch('/crud',{
        method:"POST",
        body:formdata
    });
    return await send.json();
}

const getDataDisLikes=async(object)=>{
    let params=new URLSearchParams();
    params.append('data','dis-likes');
    params.append('card',object.card);
    params.append('user',sessionStorage.getItem('id'));
    let send=await fetch('/getdata',{
        method:"POST",
        body:params
    });

    return await send.json();
}

const setValuesDisLikes=()=>{
    let idCards=document.querySelectorAll('div.wrapper-cards');
    idCards.forEach(element=>{
        getDataDisLikes({card:element.getAttribute('key')}).then(res=>{
            if(res.state){
                let posti=document.querySelector("#title-position");
                if(posti.getAttribute('data')=="mycards"){
                    element.children[5].children[1].children[1].children[0].textContent=res.dislikes;
                    element.children[5].children[1].children[0].children[0].textContent=res.likes;
                }else{
                    element.children[4].children[1].children[1].children[0].textContent=res.dislikes;
                    element.children[4].children[1].children[0].children[0].textContent=res.likes;
                }
                if (res.data!=undefined){
                    element.children[4].children[1].setAttribute('key',res.data._id);
                    if(res.data!=null){
                        if(res.data.value==1){
                            element.children[4].children[1].children[0].children[1].checked=true;
                        }else if(res.data.value==0){
                            element.children[4].children[1].children[1].children[1].checked=true;
                        }else{
                            console.log("take");
                        }
                    }
                }else{
                    element.children[4].children[1].setAttribute('key',res.data);
                }
            }else{
                console.log(res.message);
            }
        }).catch(err=>{
            console.log(err);
        });
    });
}

const valuesLike=()=>{
    let value=document.querySelectorAll("span.dis-likes>span>input[type='radio']");
    if (sessionStorage.getItem('user')!=null){
        value.forEach(element=>{
            element.onchange=(e)=>{
                let action = e.target.parentElement.parentElement.getAttribute('key');
                let cardId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('key');
                if(action=='null'){
                    selectActionLikeOrDislike({
                        card:cardId,
                        value:e.target.value,
                        action:"insert",
                        idLike:e.target.parentElement.parentElement.getAttribute('key'),
                        form:"form-likes"
                    }).then(res=>{
                        if (res.state){
                            e.target.parentElement.parentElement.setAttribute('key',res.data._id);
                            console.log(`diste tu ${e.target.value}`);
                            getDataDisLikes({
                                card:e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('key')
                            }).then(rs=>{
                                if(rs.state){
                                    let dl=e.target.parentElement.parentElement.children;
                                    dl[0].children[0].textContent=rs.likes;
                                    dl[1].children[0].textContent=rs.dislikes;
                                }else{
                                    console.log(rs.message);
                                }
                            }).catch(er=>{
                                console.log(er,"error al obtener datos");
                            });
                        }else{
                            console.log(res.message);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }else{
                    selectActionLikeOrDislike({
                        card:cardId,
                        value:e.target.value,
                        action:"personalized",
                        idLike:e.target.parentElement.parentElement.getAttribute('key'),
                        personalized:"update-likes-value",
                        form:""
                    }).then(res=>{
                        if (res.state){
                            console.log(`diste tu ${e.target.value}`);
                            getDataDisLikes({
                                card:e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('key')
                            }).then(rs=>{
                                if (rs.state) {
                                    let dl=e.target.parentElement.parentElement.children;
                                    dl[0].children[0].textContent=rs.likes;
                                    dl[1].children[0].textContent=rs.dislikes;
                                }else{
                                    console.log(rs.message);
                                }
                            }).catch(er=>{
                                console.log(er,"error al obtener datos");
                            });
                        }else{
                            console.log(res.message);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            }
        });
    }else{
        value.forEach(element=>{
            element.nextElementSibling.setAttribute('for','');
        })
    }
}

const selectActionLikeOrDislike=async(object)=>{
    let requeriment={
        action:"",
        form:object.form,
        card:object.card,
        value:object.value,
        idLike:object.idLike,
        personalized:object.personalized
    }
    switch(object.action){
        case "insert":
            let insert = await insUpdtLikes({
                ...requeriment,
                ...{action:"insert"}
            });
            return insert;
        case "personalized":
            let update= await insUpdtLikes({
                ...requeriment,
                ...{action:"personalized"}
            });
            return update;
        default:
            return "no hay exite";
    }
}
