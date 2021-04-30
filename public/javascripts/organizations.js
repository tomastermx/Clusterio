




$(document).ready(function(){
  


   
 $('#orgregistrar').submit(event=>{

    event.preventDefault();

    var nombre = $("#orgname").val();

    var tipo = $("#tipo").val();

    var latitud = $("#latitud").val();

    var longitud = $("#longitud").val();

     
    $.post('/organization/new',{nombre:nombre, tipo:tipo, latitud:latitud,longitud:longitud});



 })


 });


