var lstProbabilidades=[];
var lstSeveridades=[];
var lstMatrixData;


//
var i, j;
var Matriz;

var m,n;
var CantidadColores=3;
var VectorColor=new Array(CantidadColores);

var objColores;
//

var obj;

function LeerJson()
{
    var text =localStorage.getItem("Test");
    obj=JSON.parse(text);    
    m=obj.M;
    n=obj.N;
    Matriz=obj.Matriz;
    lstProbabilidades=obj.listaProbabilidad;
    lstSeveridades=obj.listaSeveridad;
    lstRating=obj.TextColores;
    CantidadColores=obj.TextColores.length;    
    lstMatrixData=obj.MatrixData;
}
