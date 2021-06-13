





     $(document).ready(function(){

        
          $.getJSON('/all/posts/json',(data)=>{ 

                $.each(data,(i,value)=>{

                	var titulo = '<h3>'     + value.titulo  + '</h3>'
                	var contenido = '<h4>'  + value.contenido + '</h4>'
                	var  usuario = '<h4>' +  value.user[0].username  + '</h4>'
                  
                   var trabajo = '<h4>' +  value.company[0].nombre + '</h4>'


                  console.log(value.user.username);
              
                  $("#results").append('<div class=" elements  ui segment  elements ">'  + titulo  +  contenido + usuario + 'de'+  trabajo  + ' </div>');

                    })


              })

 
           $('#tema').change(()=>{

             var category = $('#tema').val();

              console.log(category);
              
              $(".elements").remove();

            $.post('/all/posts/json',{category:category }).done((data)=>{
                 
                  
                $(".elements").remove();                
                  $.each(data,(i, value)=>{

                   var titulo = '<h3>'     + value.titulo  + '</h3>'
                   var contenido = '<h4>'  + value.contenido + '</h4>'
                   var usuario = '<h4>' +  value.user[0].username   + '</h4>'

                   var trabajo = '<h4><a href="/">' +  value.company[0].nombre + '</a></h4>'


                    console.log(value.user.username);
              
                 $("#results").append('<div class=" elements  ui segment  elements ">'  + titulo  +  contenido + usuario + 'de'+  trabajo  + ' </div>');  

                     

                                    })  


                     })


            })




      });