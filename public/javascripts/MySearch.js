const Search=()=>{
    let search=document.querySelector(".l_wrapper>.l_formulario>input[type='search']");
    search.onsearch=()=>{
        if(search.value!=null || search.value!=""){
            window.location.href=window.location.origin+"/busqueda?search="+search.value;
        }
    }
}
Search();