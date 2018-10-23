LeerJson();
mostrar(lstMatrixData,"bodyTable",lstSeveridades.length,lstProbabilidades.length);
crearTabla(lstProbabilidades,'divProbabilidad','Tabla Probabilidades');
crearTabla(lstSeveridades,'divSeveridad','Tabla Severidades');

                  function mostrar(lst,tableid,contSev,contProb)
                    {                        
                        var tableBody=document.getElementById(tableid);
                        tableBody.innerHTML="";
                        var degradado=120.0;
                        var auxDegradado=degradado;                        
                        var intervalo=120/((contProb-1)+(contSev-1));
                        var contIntervalos=1;
                        for(i=0;i<lst.length;i++)
                            {
                                var aux=0;
                                var fila=tableBody.insertRow(i);                                 
                                for(var campo in lst[i])
                                    {                                 
                                                                                                      
                                        var celda=fila.insertCell(aux);
                                        celda.innerHTML=lst[i][campo];
                                        if(aux==5)
                                        {
                                            celda.innerHTML=lst[i][campo].Rating;
                                            celda.style.backgroundColor = lst[i][campo].Color;
                                            aux++;
                                            var celda=fila.insertCell(aux);
                                            celda.innerHTML=lst[i][campo].Texto;                                            
                                        }
                                        if(aux==13)
                                        {                                            
                                            var pintar=new HSLColour(auxDegradado,100,50);
                                            pintar.setNodeBackgroundColour(celda);
                                            auxDegradado=auxDegradado-intervalo;
                                        }
                                        aux++;
                                    }
                                    if(i==(contProb*contIntervalos)-1)
                                    {
                                        degradado=degradado-intervalo;
                                        auxDegradado=degradado;
                                        contIntervalos++;
                                    }                                
                            }
                            
                    }

                  function crearTabla(lst, idDiv, titulo)
              {                  
                  var contenedor=document.getElementById(idDiv);
                  contenedor.innerHTML="";
                  var tabla=document.createElement("table");
                  //Dar un titulo
                  var aux=document.createElement("h5");
                  var auxText=document.createTextNode(titulo);
                  aux.appendChild(auxText);
                  contenedor.appendChild(aux);
                  //
                  //Creacion de las cabeceras
                  tblHead=document.createElement("thead");
                  var fila=document.createElement("tr");
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("MTID");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Indice");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Categoria");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Desde");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Hasta");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Medio");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Descripción Cualitativa 1");
                  celda.appendChild(texto);
                  fila.appendChild(celda);
                  var celda=document.createElement("td")
                  var texto=document.createTextNode("Descripción Cualitativa 2");
                  celda.appendChild(texto);                  
                  fila.appendChild(celda);
                  
                  tblHead.appendChild(fila);                  
                  tabla.appendChild(tblHead);
                  //
                  //Creacion del body del table
                  var tblbody=document.createElement("tbody");

                  for (let i = 0; i < lst.length; i++) {
                      var fila=document.createElement("tr");
                      var celda=document.createElement("td");
                          var texto=document.createTextNode("MT001");
                          celda.appendChild(texto);
                          fila.appendChild(celda);
                      for (var campo in lst[i]) {
                          var celda=document.createElement("td");
                          var texto=document.createTextNode(lst[i][campo]);
                          celda.appendChild(texto);
                          fila.appendChild(celda);
                      }
                      tblbody.appendChild(fila);                      
                  }
                  tabla.appendChild(tblbody);
                  tabla.className="highlight";
                  contenedor.appendChild(tabla);
              }