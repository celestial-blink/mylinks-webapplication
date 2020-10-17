const sendDataPrivacity=async(object)=>{
    let formdata=new FormData();
    if (object.checked){
        formdata.append('privacity',object.checked);
    };
    formdata.append('action','personalized');
    formdata.append('personalized','update-privacity');
    formdata.append('id',object.getAttribute('id'));
    let send=await fetch('/crud',{
        method:"POST",
        body:formdata
    });
    return await send.json();
}

const initializePrivacity=()=>{
    let input=document.querySelectorAll(".wrapper-list-card>input[type='checkbox']");
    input.forEach(element=>{
        element.onchange=(e)=>{
            sendDataPrivacity(e.target).then(res=>{
                console.log(JSON.stringify(res));
            }).catch(err=>{
                console.log(JSON.stringify(err));
            })
        }
    })
}