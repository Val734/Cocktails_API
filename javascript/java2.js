
function loadJSON2()
{

    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSONHTML2;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"); 
    xmlhttp.send();
     
//
    select_ingredientes=document.getElementById("select_ingredientes");
    select_ingredientes.addEventListener('change', info);

    bebidasAl();
}
//
function processJSONHTML2()
{
    if((this.readyState==4)&&(this.status==200))
    { 
        var m=JSON.parse(this.responseText); 
//
        for (var k in m.drinks)
        {
            o=document.createElement('option');//creamos el option
            o.innerHTML=m.drinks[k].strIngredient1;//que de bebidas te pille absolutamente toda la lista.
            o.value=m.drinks[k].strIngredient1;//aquí estamos haciendo que al select se le añada el option.
            select_ingredientes.appendChild(o);
        }
        
    }
}

function info()
{
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSON_ingredientes;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="+ select_ingredientes.value); 
    xmlhttp.send();
    reset2();
}

function processJSON_ingredientes()
{
    if((this.readyState==4)&&(this.status==200))
    { 
        var m=JSON.parse(this.responseText); 
        
            info_coctel=document.getElementById("info_coctel");
            info_coctel.innerHTML="<br>"+"Name ingredient:"+m.ingredients[0].strIngredient +"<br>"+"<br>"+ "Type:"+m.ingredients[0].strType+"<br>"+"<br>"+"Alcohol"+m.ingredients[0].strAlcohol+"<br>"+"<br>"+"Degrees of alcohol:"+m.ingredients[0].strABV+"<br>"+"<br>"+"Description:"+m.ingredients[0].strDescription;
    }
}

function bebidasAl()
{
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSONbebidasAl;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"); 
    xmlhttp.send();

    select_bebidasAl=document.getElementById("select_bebidasAl");
    infoAl=document.getElementById("infoAl");
    select_bebidasAl.addEventListener('change', informacion);
    reset2();
}

function processJSONbebidasAl()
{
    if((this.readyState==4)&&(this.status==200))
{
     m=JSON.parse(this.responseText); 
    for(V in m.drinks)
    {
        oP=document.createElement('option');
        oP.innerHTML=m.drinks[V].strDrink;
        oP.value=m.drinks[V].strDrink;
        select_bebidasAl.appendChild(oP);
    }
}
}

function informacion()
{
    reset2();
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSONbebidas;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ select_bebidasAl.value); 
    xmlhttp.send();
    reset2();
}


function processJSONbebidas()
{
    if((this.readyState==4)&&(this.status==200))
    { 
        var m=JSON.parse(this.responseText); 
            infoAl=document.getElementById("infoAl");
            infoAl.innerHTML="<br>"+"Cocktail glass name:"+m.drinks[0].strDrink+"<br>"+"Instructions:"+m.drinks[0].strInstructions;
            
            infoAl.innerHTML+="<br>"+"<br>"+"<img id='imagen' src="+m.drinks[0].strDrinkThumb+">"+"<br>";
    }
}

function reset2()
{
    infoAl.innerHTML=" ";
    info_coctel.innerHTML= " ";
}
