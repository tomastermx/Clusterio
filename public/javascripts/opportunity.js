

   $(document).ready(function(){



 
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


