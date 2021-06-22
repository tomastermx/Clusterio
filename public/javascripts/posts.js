





     $(document).ready(function(){

        
          $.getJSON('/all/posts/json',(data)=>{ 

                $.each(data,(i,value)=>{

                 


                   var titulo = '<h3 class="textcenter">'     + value.titulo  + '</h3>'
                   
                   var contenido = '<h4>'  + value.contenido + '</h4>'
                   var usuario =   value.user[0].username   

                    var date = new Date(value.creado);

                    var dateformat = date.toDateString();
 


                   var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'

             
                   var blocktitle = '<div class=" ui segment" >' + titulo +  '</div>'

                   var blockcontent = '<div class=" ui segment" >' + contenido +  '</div>'

                   var blockuser  = '<div class=" ui three column stackable grid" ><div class=" eight wide column">' + usuario +  'de' + " " +  trabajo +  '</div> <div class="four wide column"> ' +  dateformat  + ' </div> <div class=" four wide column"> <h5>Tema</h5>' + value.categoria + '</div></div>'

                   var commentlike = '<div class="ui two column stackable grid"> <div class ="column"> <h5 class="textcenter"> Rating: '+ value.raiting + ' </h5> </div>  <div class = " column">  <h5 class="textcenter"> Comentarios: ' +  value.comentarios.length  +'  </h5>  </div>  </div>'

                   var  mainblock =  ' <div class="ui segment elements "> <div class="  ui segments  ">   ' + blocktitle +  blockcontent +  ' </div>' + blockuser  + commentlike +   ' </div> '

               

                 $("#results").append(mainblock);  
    

                        

                    })


              })

 
           $('#tema').change(()=>{

             var category = $('#tema').val();

              console.log(category);
              
              $(".elements").remove();

            $.post('/all/posts/json',{category:category }).done((data)=>{
                 
                  
                $(".elements").remove();                
                  $.each(data,(i, value)=>{

                   var titulo = '<h3 class="textcenter">'     + value.titulo  + '</h3>'
                   var contenido = '<h4>'  + value.contenido + '</h4>'
                   var usuario =   value.user[0].username   


                    var date = new Date(value.creado);

                    var dateformat = date.toDateString();



                   var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'                   
             
                   var blocktitle = '<div class=" ui segment" >' + titulo +  '</div>'
                   var blockcontent = '<div class=" ui segment" >' + contenido +  '</div>'

                   var blockuser  = '<div class=" ui three column stackable grid" ><div class=" eight wide column">' + usuario +  'de' + " " +  trabajo +  '</div> <div class="four wide column"> ' +  dateformat  + ' </div> <div class=" four wide column"> <h5>Tema</h5>' + value.categoria + '</div></div>'

                   
                   var commentlike = '<div class="ui two column stackable grid"> <div class ="column"> <h5 class="textcenter"> Rating: '+ value.raiting + ' </h5> </div>  <div class = " column">  <h5 class="textcenter"> Comentarios: ' +  value.comentarios.length  +'  </h5>  </div>  </div>'

                   var  mainblock =  ' <div class="ui segment elements "> <div class="  ui segments  ">   ' + blocktitle +  blockcontent +  ' </div>' + blockuser  + commentlike +   ' </div> '

                  console.log(value.creado);

                 $("#results").append(mainblock);  
                   
                     

                                    })  


                     })


            })




      });