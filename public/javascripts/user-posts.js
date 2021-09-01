

$(document).ready(function(){


  var script_tag = document.getElementById('owner');
  var user = script_tag.getAttribute("data-user");	
   
   meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiempre","Octubre"]

    $.getJSON('/user/posts/json/' + user ,(data)=>{

              $.each(data,(i,value)=>{
      
                   var date = new Date(value.creado);               
 
                   var titulo = '<h3 class="textcenter">'     + value.titulo  + '</h3>'
                   
                   var contenido = '<p>'  + value.contenido + '</p>'


                    var headblock = '<div class="fourteen wide column"><p> Publicado en:' + " " + value.categoria + " pubicado: " + meses[date.getMonth()] + " " + date.getUTCDay() +   ' </p></div><div class="two wide column"> <button class="ui red button delete"  id="' + value._id + ' "> X </button> </div>'
               
                

                    var blockcontent =  '<div class="sixteen wide column">' + contenido + '</div>' 

                    var commentlike = '<div class="eight wide column"><a href=" /" class="button ui inverted green button"> Comentarios: ' + value.comentarios.length + ' </a> </div><div class="eight wide column"> ' + '👏'  + value.raiting + ' </div>'

                   
                   var  mainblock =  ' <div class="ui segment elements "> <div class=" ui stackable  grid ">   ' + headblock  + blockcontent +  commentlike +  '</div> </div> '

                   $("#principal").append(mainblock);
             })

          /*****************************************************************************************************************************************************************************************************+
           * 
           *              DELETE POST
           * 
           * **************************************************************************************************************************************************************************************************/
          
          $(".delete").click(function(e){

          
          var   id = e.target.id;
  
                         $.ajax({       url: '/post/delete/'+id,
                                        type: 'DELETE',
                                        success: function(result){

                                          console.log("documento borrado");
                                         // Do something with the result
                                          }
                                       });

        

                })




         })


      
    /************************************************
     * Crear nuevos posts
    * *********************************************/          

                
       $("#postform").submit((event)=>{

     event.preventDefault();
 
     var titulo = $('#title').val();
 
     var contenido = $('#contenido').val();

      var  tema =  $('#categoria').val();

       $('.mini.modal').modal('show');
      
      $.post('/posts/new',{titulo:titulo,contenido:contenido,tema:tema});
           
        setTimeout( ()=>{  $("#principal" ).load('/users/profile/posts #principal  ')  }, 1500);  

       setTimeout( ()=>{ location.reload(); },  1500); 


            })








   }) 






