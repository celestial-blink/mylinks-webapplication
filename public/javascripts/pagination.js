const sendDataPagination=async(object)=>{
    let urlparams=new URLSearchParams();
    urlparams.append('title',object.title);
    urlparams.append('page',object.page);
    urlparams.append('id',sessionStorage.getItem('id'));
    let send=await fetch("/inicio",{
        method:"POST",
        body:urlparams
    });
    return await send.text();
}

const initializePagination=()=>{
    let position=document.querySelector("#title-position");
    let btnpages=document.querySelectorAll("#content-pagination>a");
    btnpages.forEach(element=>{
        element.onclick=(e)=>{
            openLoader();
            e.preventDefault();
            sendDataPagination({
                title:position.getAttribute('data'),
                page:e.target.getAttribute("href")
            }).then(res=>{
                setContainer({content:res});
                closeLoader();
            }).catch(err=>{
                setContainer({content:err})
                closeLoader();
            });
        }
    });
};
