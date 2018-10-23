//var i, j;
//var Matriz;

//var m,n;
//var CantidadColores=3;
//var VectorColor=new Array(CantidadColores);
TablaColor();
//var objColores;
// crea la matriz
if(localStorage.getItem("Test")!=null)
{
    cargarDesdeJson();
}
function CrearMatriz(probabilidad,severidades)
{
    m=probabilidad;
    n=severidades;
    //m= document.getElementById("M").value;
    //n= document.getElementById("N").value;
    CrearProbabilidad();
    CrearSeveridad();
    var aux = document.getElementById("MatrizContenedor").innerHTML="";
    var body = document.getElementById("MatrizContenedor");
    var tabla = document.createElement("table");
    
    var tblBody = document.createElement("tbody");
    
    Matriz = []; 
    for ( i = 0; i < m; i++) 
    {
        var hilera = document.createElement("tr");
        Matriz[i] = [];
        for ( j = 0; j <n; j++) 
        {
            Matriz[i][j]=1;
            var celda = document.createElement("td");
            celda.contentEditable="true";
            celda.textContent=Matriz[i][j];
            celda.onkeypress=function(){return valida(event);}
            celda.onkeyup=function(){ColorMatriz();}            
            celda.className="MatrizRiesgo";
            celda.id="Codigo"+i+"a"+j;
            hilera.appendChild(celda);                    
        }
        tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    ColorMatriz();
    
}
function CrearProbabilidad()
{ 
    var contenedor=document.getElementById("Izquierda").innerHTML="";
    var contenedor=document.getElementById("Izquierda");
    var tabla = document.createElement("table");
    tabla.className="TabMatrizIzq";
    var tblBody = document.createElement("tbody");
    for ( i = m-1; i >= 0; i--) 
    {
        var hilera = document.createElement("tr");
        var celda = document.createElement("td");
        celda.textContent=lstProbabilidades[i].categoria;
        //celda.appendChild(input);
        celda.className ="MatrizRiesgo";
        hilera.appendChild(celda);  


       
        var celda = document.createElement("td");
        celda.textContent=lstProbabilidades[i].id;
        celda.className ="MatrizRiesgo";
        hilera.appendChild(celda);  


        tabla.appendChild(hilera);
        
    }
    contenedor.appendChild(tabla);
    
}

function CrearSeveridad()
{
    var contenedor=document.getElementById("Abajo").innerHTML="";
    var contenedor=document.getElementById("Abajo");
    var tabla = document.createElement("table");
    tabla.className="TabMatrizAbajo";
    var tblBody = document.createElement("tbody");


    var hilera = document.createElement("tr");
    var hilera2 = document.createElement("tr");
    for ( i = 0; i < n; i++) 
    {     
        var celda = document.createElement("td");
        celda.textContent=lstSeveridades[i].id;
        celda.className ="MatrizRiesgo2";
        hilera.appendChild(celda); 
        
        

        var celda = document.createElement("td");
        celda.textContent=lstSeveridades[i].categoria;
        celda.className ="MatrizRiesgo2";
        hilera2.appendChild(celda);


        tabla.appendChild(hilera);
        tabla.appendChild(hilera2);
    }
    contenedor.appendChild(tabla);
    
}

// Crea la tabla de colores.
function TablaColor()
{ 
    var aux = document.getElementById("TabladeColor").innerHTML="";
    var num=CantidadColores;
    var colorInicial=120;
    var aux=colorInicial/(num-1);    
    VectorColor=new Array(num);
    var tabla = document.getElementById("TabladeColor");


///////
    var hilera = document.createElement("tr");
//
    hilera.className="TableTr";

    var celda = document.createElement("th");
//
    celda.className="TableTh";

    var input=document.createElement("p");
    input.textContent="Rating";
    celda.appendChild(input);
    hilera.appendChild(celda);  

    var celda = document.createElement("th");
    celda.className="TableTh";
    var input=document.createElement("p");
    input.textContent="Texto";
    celda.appendChild(input);
    hilera.appendChild(celda);  

    var celda = document.createElement("th");
    celda.className="TableTh";
    var input=document.createElement("p");
    input.textContent="Color";
    celda.appendChild(input);
    hilera.appendChild(celda);         
    tabla.appendChild(hilera);
//////////

    
    for ( i = 1; i <= num; i++) 
    {
        var hilera = document.createElement("tr");
        hilera.className="TableTr";
        var celda = document.createElement("td");
        celda.className="TableTd";
        //var input=document.createElement("p");
        celda.textContent=i;
        celda.id="Rating"+i;
        //celda.appendChild(input);
        hilera.appendChild(celda);  

        var celda = document.createElement("td");
        celda.className="TableTd";

        var input=document.createElement("input");
        input.id="ColorTexto"+i;
        input.type="text";
        input.required="true";
        input.style="margin:0px; border:0px;padding:0px";
        celda.appendChild(input);
        hilera.appendChild(celda);  

        var celda = document.createElement("td");
        celda.className="TableTd";

        celda.style="background-color: hsl("+(colorInicial)+", 100%, 50%)";
        celda.id="CeldaColor"+i;
        VectorColor[i-1]="hsl("+(colorInicial)+", 100%, 50%)";
        hilera.appendChild(celda);  
        tabla.appendChild(hilera);
        colorInicial-=aux;
        
    }
}
// Da Colores a la matriz deacuerdo al valor
function ColorMatriz()
{
    for ( i = 0; i < m; i++) {
        for ( j = 0; j < n; j++) 
        {
            var cod = document.getElementById("Codigo"+i+"a"+j);
            var valor=cod.textContent;
            Matriz[i][j]=valor;
            if (valor <=1 ) 
            {
                cod.style= "background-color:"+VectorColor[0];
            }
            else if ((VectorColor.length-1)<valor) 
            {
                cod.style= "background-color:"+VectorColor[VectorColor.length-1];   
            } else
            {
                cod.style= "background-color:"+ VectorColor[valor-1];
            }
        }        
    }   
}       
function AddColor()
{
    CantidadColores+=1;
    TablaColor();
}
function RestColor()
{
    if (CantidadColores>3) 
    {
        CantidadColores-=1;
        TablaColor();
    }
}
var lista=new Array(CantidadColores);
function CrearJson()
{    
    for (let i = 1; i <= CantidadColores; i++) 
    {
        var aux={
            "Rating":document.getElementById("Rating"+i).textContent,
            "Texto":document.getElementById("ColorTexto"+i).value,
            "Color":VectorColor[i-1]    
        } 
        lista[i-1]=aux;        
    }
    if (lstProbabilidades.length<1) {
        alert("Las Probabilidades no pueden estar Vacias!!!");   
    }
    else if (lstSeveridades.length<1) {
        alert("Las Severidades no pueden estar Vacias!!!");  
    }
    else if (revisarTexto()==false) {
        alert("Los textos de la lista de Rating no pueden estar Vacios!!!"); 
    }
    else if (Matriz==null) {
        alert("Genere la Matriz de Riesgo!!");
    }
    else{        
        llenarLista(lstProbabilidades,lstSeveridades,Matriz);        
        localStorage.clear();    
        var Obj={"Matriz":Matriz, "TextColores":lista,"M":m,"N":n ,
        "listaProbabilidad":lstProbabilidades,"listaSeveridad":lstSeveridades, "MatrixData":lstMatrixData};
        json=JSON.stringify(Obj);
        localStorage.setItem("Test", json);
        location.assign("MatrizDesglosada.html");        
    }
}
function revisarTexto()
{
    for (let i = 0; i < lista.length; i++) {        
        if (lista[i].Texto=="") {
            return false;
        }
        else{
            return true;
        }
    }
}

function cargarDesdeJson()
{
    LeerJson();
    
    mostrar(lstProbabilidades,'tbProbabilidades');
    mostrar(lstSeveridades,'tbSeveridades');
    TablaColor();
    for (let i = 1; i <= CantidadColores; i++) 
    {
        var aux= document.getElementById("ColorTexto"+i);
        aux.value=obj.TextColores[i-1].Texto;        
    }
    CargarMatriz();
    CrearProbabilidad();
    CrearSeveridad();
}
function CargarMatriz()
{
    //m= document.getElementById("M").value;
    //n= document.getElementById("N").value;
   var aux = document.getElementById("MatrizContenedor").innerHTML="";
   var body = document.getElementById("MatrizContenedor");
   var tabla = document.createElement("table");
   tabla.className="TabMatrizCol";
   var tblBody = document.createElement("tbody");
   
  // Matriz = new Array(m + 1); 
   for ( i = 0; i < m; i++) 
   {
       var hilera = document.createElement("tr");
       //Matriz[i] = new Array(n + 1);
       for ( j = 0; j <n; j++) 
       {
           //Matriz[i][j]=1;
           var celda = document.createElement("td");
           celda.contentEditable="true";
           celda.textContent=Matriz[i][j];
           celda.onkeypress=function(){return valida(event);}
           celda.onkeyup=function(){ColorMatriz();}            
           celda.className="MatrizRiesgo";
           celda.id="Codigo"+i+"a"+j;
           hilera.appendChild(celda);                    
       }
       tblBody.appendChild(hilera);
   }
   tabla.appendChild(tblBody);
   body.appendChild(tabla);
   ColorMatriz();
}

// validador de solo numeros en la matriz
function valida(e)
{
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8){
        return true;
    }
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}
//Llenar lista Matrix Data
function llenarLista(listaProbabilidades,listaSeveridades,matriz)
                  {
                    lstMatrixData=[];                    
                      var Jaux=0;
                      for(i=0;i<listaSeveridades.length;i++)
                      {             
                        var Iaux=listaProbabilidades.length-1;
                          for(j=0;j<listaProbabilidades.length;j++)
                          {                                
                              var obj=new Object();
                              obj.id="MT001";
                              obj.catSeveridad=listaSeveridades[i].categoria;
                              obj.catProbabilidad=listaProbabilidades[j].categoria;
                              obj.idSeveridad=listaSeveridades[i].id;
                              obj.idProbabilidad=listaProbabilidades[j].id;
                              obj.rating=devolverObj(lista,matriz[Iaux][Jaux]);
                              obj.probDesde=listaProbabilidades[j].desde+"%";
                              obj.probHasta=listaProbabilidades[j].hasta+"%";
                              obj.probMedia=listaProbabilidades[j].media+"%";
                              obj.sevDesde=listaSeveridades[i].desde;
                              obj.sevHasta=listaSeveridades[i].hasta;
                              obj.sevMedia=listaSeveridades[i].media;
                              obj.producto=listaProbabilidades[j].media/100*listaSeveridades[i].media;
                              lstMatrixData.push(obj); 
                              Iaux--;                           
                          }  
                          Jaux++;                                               
                      }                                            
                  }
                  function devolverObj(lst,id)
                  {                      
                      for (let k = 0; k < lst.length; k++) {                        
                        if(parseInt(lst[k].Rating)==id)
                        {                            
                            return lst[k];                              
                        }                        
                      }                      
                      return lst[lst.length-1];
                  }