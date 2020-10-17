const btnCompartir=()=>{
    let btnShare=document.querySelector("#btn-share")
    let mShare=document.querySelector("#mshare")
    let links=document.querySelectorAll("#mshare>a")
    let state=true
    if(btnShare!=null && mShare!=null){
        btnShare.onclick=()=>{
            if (state){
                state=false
                mShare.style.cssText="--i:5"
            }else{
                state=true
                mShare.style.cssText="--i:1"
            }
        }
    }
    // links.forEach((e)=>{
    //     e.href="https://www.facebook.com/sharer/sharer.php?u=["+window.location.href.split("#")[0]+"]";
    // })
    links[0].href="https://www.facebook.com/sharer/sharer.php?u="+window.location.href.split("#")[0];
    links[1].href="https://twitter.com/intent/tweet?text=celestialblink&url="+window.location.href.split("#")[0]+"&hashtags=[hashtag]";
    links[2].href="https://www.linkedin.com/sharing/share-offsite/?url="+window.location.href.split("#")[0];
    links[3].href=window.location.href.split("#")[0]
    links[3].onclick=(e)=>{
        e.preventDefault();
        let input=document.createElement("input");
        input.setAttribute('type','text');
        mShare.appendChild(input);
        input.value=links[3].href;
        input.select();
        input.setSelectionRange(0,input.value.length);
        if (document.execCommand('copy')) {
               links[3].setAttribute('data-me',"copiado");
               mShare.removeChild(input);
               setTimeout(()=>{
                links[3].setAttribute('data-me',"copiar")
               },2000)
        }
    }
}
btnCompartir()
