

 $(document).ready(function(){

  console.log("primeras pruebas");
 
  var pathArray = window.location.pathname.split('/');

   var id = pathArray[2];

   console.log(id);

  /*******************************************************************************************************************************************************
   *   CARGAR COMENTARIOS
   * 
   ***************************************************************************************************************************************************************/ 
     $.getJSON('/post/data/json/' + id , (data)=>{

            console.log(data.comentarios[0].contenido);


           $.each(data.comentarios,(i,value)=>{
                   
               console.log(value);

               var imagen = '<img  class="imageuser" src="' +  value.autorcomentario.google.picture  +'"  ><img>' 

               var blockuser ='<div class="two wide column">' + imagen + ' </div><div class="fourteen wide column"></div>'
          
               var mainblock ='<div class="ui segment"><div class="ui grid">'+ blockuser +'</div></div>'

               $("#comments").append(mainblock); 
           })

     });


 

  /*******************************************************************************************************************************************************
   *      CREAR NUEVO COMENTARIO 
   * 
   * ****************************************************************************************************************************************************/


  $("#publishpost").submit((event)=>{

       event.preventDefault();
       
       var comment = $("#posting").val();

    
        $.post('/add/comment/post/' + id ,{comment:comment}).done((data)=>{
           



        })
    


   })

  







 })