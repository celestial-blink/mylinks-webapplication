const getDataForContainer=async(object)=>{
    let params=new URLSearchParams();
    params.append('title',object.title);
    params.append('id',sessionStorage.getItem('id'))
    let data=await fetch('/inicio',{method:'post',body:params});
    let html=await data.text();
    return html;
}
const setContainer=(object)=>{
    let position=document.querySelector("#title-position");
    let container=document.querySelector("#content-load");
    container.innerHTML=object.content;
    loadScripts(position.getAttribute('data'));
}
const setNavigator=()=>{
    if(sessionStorage.getItem('user')!=null){
        let profile=document.querySelector("#your-profile>p");
        let textLog=document.querySelector("#log-inout>p");
        profile.textContent=sessionStorage.getItem('user');
        textLog.textContent="logout";
        textLog.parentElement.setAttribute('data-text','logout');
    }
}

const getNavigator=()=>{
    let navigator=document.querySelectorAll("#items-nav>nav>a");
    let login=document.querySelector("#your-profile");
    let logINOUT=document.querySelector("#log-inout");
    logINOUT.onclick=(e)=>{
        if(e.target.parentElement.getAttribute('data-text')!="login"){
            e.preventDefault();
            sessionStorage.clear();
            window.location.href=window.location.href.split("#")[0];
        }
    }

    let titlePosition=document.querySelector("#title-position");
    navigator.forEach(element=>{
        element.onclick=(e)=>{
            if(sessionStorage.getItem("user")==null){
                if(e.target.getAttribute('id')=="mycards"){
                    window.location.href="/login";
                }
            }
            openLoader();
            window.location.href=window.location.href.split("#")[0]+"#";
            e.preventDefault();
            titlePosition.textContent=e.target.getAttribute('data-text').toUpperCase();
            titlePosition.setAttribute('data',e.target.getAttribute('href'));
            getDataForContainer({title:e.target.getAttribute('href')}).then(res=>{
                setContainer({content:res});
                // loadScripts(e.target.getAttribute('href'));
                closeLoader();
            }).catch(err=>{
                content=err;
                closeLoader();
            })
        }
    });
    login.onclick=(e)=>{
        e.preventDefault();
        if (sessionStorage.getItem('user')==null){
            window.location.href="/login";
        }else{
            openLoader();
            window.location.href=window.location.href.split("#")[0]+"#";
            titlePosition.textContent=e.target.parentElement.getAttribute('href').toUpperCase();
            titlePosition.setAttribute('data',e.target.getAttribute('href'));
            getDataForContainer({title:e.target.parentElement.getAttribute("href")}).then(res=>{
                setContainer({content:res});
                closeLoader();
                // loadScripts(e.target.parentElement.getAttribute("href"));
            }).catch(err=>{
                closeLoader();
                content=err;
            });
        }
    };
}
const initializeIndex=()=>{
    getNavigator();
}
const createElementFcard=()=>{
    let content=document.querySelector("#modal>.content");
    content.innerHTML="";
    getDataForContainer({title:"componentFormCards"}).then(res=>{
        content.innerHTML=res;
        initializeCards();
        changeActionForm();

    }).catch(err=>{
        showMessage({message:err,type:"err"});
    });
}
const getComponent=()=>{
    let btnAgregar=document.querySelector("a#btn-agregar");
    if (sessionStorage.getItem('user')!=null){
        createElementFcard();
    }else{
        btnAgregar.style.display="none";
    }
    btnAgregar.onclick=()=>{
        let element=document.querySelector("#modal>.content>img");
        if (element!=null) {
            createElementFcard();
            clearFormCard();
            getImages();
        }
    }
};


const loadScripts=(scpt)=>{
    switch(scpt){
        case "last":
            break;
        case "all":
            initializePagination();
            break;
        case "mycards":
            editCard();
            deleteCard();
            initializePagination();
            break;
        case "contact":
            break;
        case "profile":
            initializeProfile();
            break;
        default:
            console.log("no se encontró indice");
            break;
    }
}

getComponent();
setNavigator();
initializeIndex();