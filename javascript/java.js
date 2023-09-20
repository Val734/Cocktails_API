/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadJSON1()
{
    option1=document.createElement('option');
    option1.value=0;//esto es para relacionar la opción que escoges con el enlace de la api al que va a acceder
    option1.innerHTML= "Cocteles";
    escoger_coso.appendChild(option1);//le da un Atreus a su vida

    option2=document.createElement('option');
    option2.value=1;//esto es para relacionar la opción que escoges con el enlace de la api al que va a acceder
    option2.innerHTML= "Ingredientes";
    escoger_coso.appendChild(option2);//le da un Atreus a su vida

    document.getElementById("escoger_coso").addEventListener('change', cambio_select);//change porque cambia lo del select
    lista1();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cambio_select()
{
    reset(); 
    reset2();
    console.log(escoger_coso.value);
    
    valor=escoger_coso.value; 

    document.getElementById("coctelito").addEventListener('click', cambiar_opcion);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cambiar_opcion()
{
    if(valor==0)
    {
        buscar_coctel();
    }
    else if(valor==1)
   {
        buscar_ingrediente();
   } 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buscar_coctel()
{
    coctelete=document.getElementById("coctelete");//coctelete es el imput
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSON1; 
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+coctelete.value); 
    xmlhttp.send();
    console.log("si");
//+= es para que sume a lo que tienes y te lo iguale, es decir que te ponga una lista de cosos, te vaya sumando
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function processJSON1()
{
    if((this.readyState==4)&&(this.status==200))
    {
        var m=JSON.parse(this.responseText); 

        info_coctel=document.getElementById("info_coctel");
        info_coctel.innerHTML="<br>"+"<br>"+"Cocktail name:"+m.drinks[0].strDrink+"<br>"+"<br>"+"Type:"+m.drinks[0].strAlcoholic+"<br>"+"<br>"+"Ingredients:"+m.drinks[0].strIngredient1+", "+m.drinks[0].strIngredient2+", "+m.drinks[0].strIngredient3+", "+m.drinks[0].strIngredient4+"<br>"+"<br>";
        info_coctel.innerHTML+="<br>"+"<br>"+"<img id='imagen' src="+m.drinks[0].strDrinkThumb+">"+"<br>";
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buscar_ingrediente()
 {
    coctelete=document.getElementById("coctelete");
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSON2; 
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="+coctelete.value); 
    xmlhttp.send();
    console.log("no");
 }
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 function processJSON2()
{
    if((this.readyState==4)&&(this.status==200))
    {
        var m=JSON.parse(this.responseText); 
        info_coctel=document.getElementById("info_coctel");
        info_coctel.innerHTML="Ingredient Name:"+ m.ingredients[0].strIngredient+"<br>"+"<br>"+"Description:"+m.ingredients[0].strDescription+"<br>"+"<br>"+"<br>"+"Ingredient Type:"+m.ingredients[0].strType;

    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function reset()
{
    info_coctel.innerHTML=" ";
    info_bebida.innerHTML=" ";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function lista1()
{
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSONbebidas;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass"); 
    xmlhttp.send();

    bebida_alcoholica=document.getElementById("bebida_alcoholica");
    info_bebida=document.getElementById("info_bebida");

    bebida_alcoholica.addEventListener('change', informacion);
    
    reset2();
}

function processJSONbebidas()
{
    
    if((this.readyState==4)&&(this.status==200))
    {
         m=JSON.parse(this.responseText); 

        for(V in m.drinks)
        {
            oP=document.createElement('option');
            oP.innerHTML=m.drinks[V].strDrink;
            oP.value=m.drinks[V].strDrink;
            bebida_alcoholica.appendChild(oP);
        }
    }
}
 //para hacer un doble select de este cosito debería de hacer un OP.value de la id del ingrediente que esté en la opción del select, yyyy eñ 
// la a es la id de la opcion del select, de la opcion del select
//pilla el innher html de la opcion, seleccionada 


 function informacion()
{
    reset2();
    reset();
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=processJSONvasos;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ bebida_alcoholica.value); 
    xmlhttp.send();
    reset2();
    reset();
   
}

function processJSONvasos()
{
    if((this.readyState==4)&&(this.status==200))
    { 
        var m=JSON.parse(this.responseText); 

            info_bebida=document.getElementById("info_bebida");
            info_bebida.innerHTML="<br>"+"Cocktail glass name:"+m.drinks[0].strDrink+"<br>"+"Instructions:"+m.drinks[0].strInstructions;
            info_bebida.innerHTML+="<br>"+"<br>"+"<img id='imagen' src="+m.drinks[0].strDrinkThumb+">"+"<br>";

    }
}

function reset2()
{
    info_bebida.innerHTML=" ";
}