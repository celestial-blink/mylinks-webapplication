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