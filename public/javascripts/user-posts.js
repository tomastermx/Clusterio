

$(document).ready(function(){


  var script_tag = document.getElementById('owner');
  var user = script_tag.getAttribute("data-user");	
  

    $.getJSON('/user/posts/json/' + user ,(data)=>{

              $.each(data,(i,value)=>{
      
             

               var titulo = '<h3 class="textcenter">'     + value.titulo  + '</h3>'
                   
                   var contenido = '<h4>'  + value.contenido + '</h4>'



             
                   var blocktitle = '<div class=" ui segment" >' + titulo +  '</div>'
                   var blockcontent = '<div class=" ui segment" >' + contenido +  '</div>'

    

                   var commentlike = '<div class="ui two column stackable grid"> <div class ="column"> <h5 class="textcenter"> Rating </h5> </div>  <div class = " column">  <h5 class="textcenter"> Comentarios ' +  value.comentarios.length  +'  </h5>  </div>  </div>'

                   var  mainblock =  ' <div class="ui segment elements "> <div class="  ui segments  ">   ' + blocktitle +  blockcontent +  ' </div>' + commentlike +   ' </div> '

                   $("#principal").append(mainblock);
             })
         })


                

                
       $("#postform").submit((event)=>{

    /************************************************
     * Crear nuevos posts
    * *********************************************/
     event.preventDefault();
 
     var titulo = $('#title').val();
 
     var contenido = $('#contenido').val();

      var  tema =  $('#categoria').val();

       $('.mini.modal').modal('show');
      
      $.post('/posts/new',{titulo:titulo,contenido:contenido,tema:tema});
           
          

 


 });





         





   }) 






