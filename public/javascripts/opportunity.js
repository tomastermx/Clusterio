

   $(document).ready(function(){

        
   var script_tag = document.getElementById('owner');
   var user = script_tag.getAttribute("data-user"); 
  
    $.getJSON('/avisos/user/profile/' + user ,(data)=>{

           $.each(data,(i,value)=>{
           
               meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiempre","Octubre"]
                   
           
                    var date = new Date(value.creado);

                    var dateformat =  date.getUTCDay() + " " + "de" + " "  + meses[date.getMonth()] + " " + "de" + " " + date.getUTCFullYear() + " " + " " + " " +date.getHours() + ":" + date.getMinutes() 

               
              var headblock = '<div class="fourteen wide column"><h5> Publicado en:' + " " + '<strong>' + value.categoria + '</strong><strong> ' + " "  +  dateformat  +   '</strong></h5></div><div class="two wide column"> <button class="ui red button delete" id=" ' +  value._id  + ' "> X </button> </div>'
             
              var  blockcontent ='<divclass="sixteen wide column"><p>' + value.descripcion + '</p> <div>'
              
              var mode ='<div class="sixteen wide column"><p> Modalidad: ' + " " +'<strong>' + value.modalidad +  '</strong></p> </div>'

              var  mainblock =  '<div class="ui segment elements"> <div class="ui grid  "> ' + headblock + mode + blockcontent +  ' </div></div>'  
             


            $("#principal").append(mainblock);



                });


     /************************************************************************************************************************************
     *                     Borrar elemento
     *    
     * ************************************************************************************************************************************/
              $(".delete").click(function(e){
               
                  var   id = e.target.id;
           
                                       $.ajax({url:'/avisos/delete/'+id,
                                        type: 'DELETE',
                                        success: function(result){

                                          console.log("documento borrado");
                                         // Do something with the result
                                          }
                                       });



              })

      

       });


   /****************************************************************************************************************************************************+
    *                              POSTEAR UNA NUEVA OPORTUNIDAD
    * 
    * ***************************************************************************************************************************************************/


 
      $('#opportunityform').submit((event)=>{
         event.preventDefault();
          
         var title = $("#title").val();

         var content = $("#contenido").val();

         var mode =  $("#modalidad").val();

         var  category = $("#categoria").val();
     
         $.post('/user/ad/new',{ titulo:title, contenido : content, modalidad:mode, categoria:category  });

          $('.mini.modal').modal('show');


         });


  







   }); 


