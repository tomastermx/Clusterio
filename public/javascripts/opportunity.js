

   $(document).ready(function(){

        
   var script_tag = document.getElementById('owner');
   var user = script_tag.getAttribute("data-user"); 
  
    $.getJSON('/avisos/user/profile/' + user ,(data)=>{

           $.each(data,(i,value)=>{
           

           var content = '<h2>'+  value.descripcion + '</h2>'
            
            var mainblock = ' <div class="ui segment"> ' +  content + '  </div> '    
             


            $("#principal").append(mainblock);



                });
      

       });





 
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


