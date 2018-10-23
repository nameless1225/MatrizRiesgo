
  $( function() {
    var dialog, dialog2, form, form2,

      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,            
      categoria = $( "#categoria" ),
      desde = $( "#desde" ),
      hasta = $( "#hasta" ),
      desc1 = $( "#desc1" ),
      desc2 = $( "#desc2" ),

      cat = $( "#cat" ),
      des = $( "#des" ),
      has = $( "#has" ),
      d1 = $( "#d1" ),
      d2 = $( "#d2" ),
      allFields = $( [] ).add( categoria ).add( desde ).add( hasta ).add(desc1).add(desc2).add(cat).add(des).add(has).add(d1).add(d2),
      tips = $( ".validateTips" );
      updateTips("No puede dejar Campos Vacios.");
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n) {
      if ( o.val().length < 1 ) {
        o.addClass( "ui-state-error" );
        updateTips( "El campo " + n + " no puede estar Vacio!!" );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addSeveridad() {
      var valid = true;
      var obj=new Object();
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( categoria, "Categoria");
      valid = valid && checkLength( desde, "Desde");
      valid = valid && checkLength( hasta, "Hasta");
      valid = valid && checkLength( desc1, "Descripcion 1");
      valid = valid && checkLength( desc2, "Descripcion 2");

      valid = valid && checkRegexp(desde,/^\d*(\.\d{1})?\d{0,1}$/,"El campo Desde solo puede contener numeros enteros o con dos decimales.");
      valid = valid && checkRegexp(hasta,/^\d*(\.\d{1})?\d{0,1}$/,"El campo Hasta solo puede contener numeros enteros o con dos decimales.");      
 
      if ( valid ) {
        obj.id=lstSeveridades.length+1;
        obj.categoria = categoria.val();
      obj.desde = parseFloat(desde.val());
      obj.hasta = parseFloat(hasta.val());
      obj.media=(obj.desde+obj.hasta)/2;
      obj.desc1 = desc1.val();
      obj.desc2 = desc2.val();
          lstSeveridades.push(obj);
          if (lstProbabilidades.length>0 && lstSeveridades.length>0) {
            CrearMatriz(lstProbabilidades.length,lstSeveridades.length);
          }
        dialog.dialog( "close" );
      }
      return valid;
    }

    function addProbabilidad() {
      var valid = true;
      var obj=new Object();
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( cat, "Categoria");
      valid = valid && checkLength( des, "Desde");
      valid = valid && checkLength( has, "Hasta");
      valid = valid && checkLength( d1, "Descripcion 1");
      valid = valid && checkLength( d2, "Descripcion 2");

      valid = valid && checkRegexp(des,/^\d*(\.\d{1})?\d{0,1}$/,"El campo Desde solo puede contener numeros enteros o con dos decimales.");
      valid = valid && checkRegexp(has,/^\d*(\.\d{1})?\d{0,1}$/,"El campo Hasta solo puede contener numeros enteros o con dos decimales.");
 
      if ( valid ) {
        obj.id=lstProbabilidades.length+1;
        obj.categoria = cat.val();
      obj.desde = parseFloat(des.val());
      obj.hasta = parseFloat(has.val());
      obj.media=(obj.desde+obj.hasta)/2;
      obj.desc1 = d1.val();
      obj.desc2 = d2.val();
          lstProbabilidades.push(obj);
          if (lstProbabilidades.length>0 && lstSeveridades.length>0) {
            CrearMatriz(lstProbabilidades.length,lstSeveridades.length);
          }
        dialog2.dialog( "close" );        
      }
      
      return valid;
    }
 //Dialog Format y Llamado a la funcion add
    dialog = $( "#SeveridadModal" ).dialog({
      autoOpen: false,
      width: 550,
      modal: true,
      buttons: {
        "Agregar Severidad": addSeveridad,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
        mostrar(lstSeveridades,'tbSeveridades');
        updateTips("No puede dejar Campos Vacios.");        
      }
    });    
    form = dialog.find( "#form1" ).on( "submit", function( event ) {
      event.preventDefault();
      addSeveridad();            
    });
    //

    //Dialog2 (Probabilidad), form2 y llamado al metodo add
    dialog2 = $( "#ProbabilidadModal" ).dialog({ 
      autoOpen: false,
      width: 550,
      modal: true,
      buttons: {
        "Agregar Probabilidad": addProbabilidad,
        Cancel: function() {
          dialog2.dialog( "close" );
        }
      },
      close: function() {
        form2[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
        mostrar(lstProbabilidades,'tbProbabilidades');
        updateTips("No puede dejar Campos Vacios.");
      }
    });

    form2 = dialog2.find( "#form2" ).on( "submit", function( event ) {
      event.preventDefault();
      addProbabilidad();      
    });
    //
 //Funcionalidad de los botones abrir modal
    $( "#btnSeveridad" ).button().on( "click", function() {
      dialog.dialog( "open" );
      
    });

    $( "#btnProbabilidad" ).button().on( "click", function() {
      dialog2.dialog( "open" );
      
    });
    //
  } );
  function mostrar(lst,tableid)
  {
          var tableBody=document.getElementById(tableid);
          tableBody.innerHTML="";

          for(i=0;i<lst.length;i++)
          {
            var aux=0;
            var fila=tableBody.insertRow(i);
            for(var campo in lst[i])
            {
              var celda=fila.insertCell(aux);
              celda.innerHTML=lst[i][campo];
              aux++;
            }
          }
  }
  function quitar(lst, tableid)
  {
    lst.pop();
    mostrar(lst,tableid);
    if (lstProbabilidades.length==0 || lstSeveridades.length==0) {
      document.getElementById("MatrizContenedor").innerHTML="";
      document.getElementById("Izquierda").innerHTML="";
      document.getElementById("Abajo").innerHTML="";
    }
    else{
      CrearMatriz(lstProbabilidades.length,lstSeveridades.length);
    }
  }
  
  $(function() {
    $( "#ProbabilidadModal" ).dialog({
    open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });
    $( "#SeveridadModal" ).dialog({
      open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
      });
    });