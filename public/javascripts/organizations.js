




$(document).ready(function(){
  


   
 $('#orgregistrar').submit((event)=>{

 event.preventDefault();

    var nombre = $("#orgname").val();

    var tipo = $("#tipo").val();

    var descripcion =$("#description").val();

    var pais = $('#country').val();

    var streetnum = $("#streetnumber").val();

    var street = $('#route').val();

    var ciudad  = $('#locality').val();

    var estado = $('#administrative_area_level_1').val();

    var country = $('#country').val();

    var latitud = $("#latitud").val();

    var longitud = $("#longitud").val();

     
    $.post('/organization/new',{nombre:nombre,descripcion:descripcion,tipo:tipo,streetnum:streetnum,street:street,pais:pais,ciudad:ciudad ,estado:estado ,latitud:latitud,longitud:longitud});



      })


 });


