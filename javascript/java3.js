
function loadJSON3()
{
    sel_categoria_coctel=document.getElementById("select1");
    
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processcocteles; 
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"); 
    xmlhttp.send();
    
    document.getElementById("select1").addEventListener('change', cambio_select);

    sel_lista_coctel=document.getElementById("select2");
    sel_lista_coctel.addEventListener('change', select2);

    
}

function processcocteles()
{
    
    //este mamahuevo carga el primer select
    if((this.readyState==4)&&(this.status==200))
    {
        var m=JSON.parse(this.responseText); 

        for(V in m.drinks)
        {
            oP=document.createElement('option');
            oP.innerHTML=m.drinks[V].strCategory;
            oP.value=m.drinks[V].strCategory;
            sel_categoria_coctel.appendChild(oP);
        }
    }
}
function cambio_select()
{
     reset(); 
     reset2();
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=lista_coctel; 
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+sel_categoria_coctel.value); 
    xmlhttp.send();
}
function lista_coctel()
{
    if((this.readyState==4)&&(this.status==200))
    {
        var m=JSON.parse(this.responseText); 
        for(L in m.drinks)
        {
                oP2=document.createElement('option');//creamos el option
                oP2.innerHTML=m.drinks[L].strDrink;//que de bebidas te pille absolutamente toda la lista.   
                oP2.value=m.drinks[L].strDrink;
                sel_lista_coctel.appendChild(oP2);
        }
    }
}

function select2()
{
    console.log(sel_lista_coctel.value);
    
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=informacion;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+sel_lista_coctel.value); 
    xmlhttp.send();
    reset2();
}

function informacion()
{
    if((this.readyState==4)&&(this.status==200))
    { 
        var m=JSON.parse(this.responseText); 

            info_coctel3=document.getElementById("info_coctel3");
            info_coctel3.innerHTML+="<br>"+"Drink name:"+m.drinks[0].strDrink+"<br>"+"<br>"+"Instructions:"+m.drinks[0].strInstructions+"<br>"+"<br>"+"Drink Type:"+m.drinks[0].strAlcoholic;
            info_coctel3.innerHTML+="<br>"+"<br>"+"<img id='imagen' src="+m.drinks[0].strDrinkThumb+">"+"<br>";
    }
}

function reset()
{
    for(let i=sel_lista_coctel.length; i>=0; i--)
    {
        sel_lista_coctel.remove(i);
       
    }
}
function reset2()
{
    info_coctel3.innerHTML=" ";
}