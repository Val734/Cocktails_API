function loadJSON4()
{
    var xmlhttp=new XMLHttpRequest(); 
    xmlhttp.onreadystatechange=random;
    xmlhttp.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/random.php"); 
    xmlhttp.send();

    info=document.getElementById("info_coctel4");
}

function random()
{
    if((this.readyState==4)&&(this.status==200))
    { 
        var m=JSON.parse(this.responseText); 

            info.innerHTML+="<br>"+"Cocktail Name:"+m.drinks[0].strDrink+"<br>";
            info.innerHTML+="<br>"+"<img id='imagen'src="+m.drinks[0].strDrinkThumb+">"+"<br>";
            tal cual esta escrito
    }
}