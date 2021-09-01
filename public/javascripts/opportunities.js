



$(document).ready(function(){

   ////  Busqueda de Oportunidades  en el foro /////////////////////////////////////////////////////////////

      $.getJSON('/avisos/all/json',(data)=>{
      
           $.each(data,(i,value)=>{
              
               meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiempre","Octubre"]
                   
           
                var date = new Date(value.creado);

                var dateformat =  date.getUTCDay() + " " + "de" + " "  + meses[date.getMonth()] + " " + "de" + " " + date.getUTCFullYear() + " " + " " + " " +date.getHours() + ":" + date.getMinutes() 


                 var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'
 

                 var blockauthor  = '<div class="two wide column ">  </div> <div class=  " fourteen wide column"> <h5> Pubicado por: ' + " " +  trabajo  +  " " + dateformat +    '<br>' + "categoria:" + " " + '<strong> '  +  value.categoria  + '</strong> </h5></div>'
                 var blocktitulo  = '<div class="two wide column ">  </div> <div class=  " fourteen wide column"><p> Se ' + " " + value.modalidad + ":" +'</p></div>'            
                 var blockcontent =  '<div class="two wide column ">  </div> <div class= "fourteen wide column"><p>' + value.descripcion +  '</p></div>' 
                 var  mainblock =  '<div class="ui segment elements"> <div class="ui grid  ">' +  blockauthor +  blocktitulo  +  blockcontent +' </div></div>'

            

              $("#principal").append(mainblock); 	



           })

      })

             
   //////////////  Post  para filtrar  la industria del Anuncio///////////////////////////////////


      $("#category").change(()=>{


        var categoria = $("#tema").val();

        console.log(categoria);
 
           $.post('/avisos/all/json', {categoria:categoria}).done((data)=>{

               $(".elements").remove(); 
                  
                      
                        $.each(data,(i, value)=>{
                      
                     meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiempre","Octubre"]
                   
           
                var date = new Date(value.creado);

                var dateformat =  date.getUTCDay() + " " + "de" + " "  + meses[date.getMonth()] + " " + "de" + " " + date.getUTCFullYear() + " " + " " + " " +date.getHours() + ":" + date.getMinutes() 


                 var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'
 

                 var blockauthor  = '<div class="two wide column ">  </div> <div class=  " fourteen wide column"> <h5> Pubicado por: ' + " " +  trabajo  +  " " + dateformat +    '<br>' + "categoria:" + " " + '<strong> '  +  value.categoria  + '</strong> </h5></div>'
                 var blocktitulo  = '<div class="two wide column ">  </div> <div class=  " fourteen wide column"><p> Se ' + " " + value.modalidad + ":" +'</p></div>'            
                 var blockcontent =  '<div class="two wide column ">  </div> <div class= "fourteen wide column"><p>' + value.descripcion +  '</p></div>' 
                 var  mainblock =  '<div class="ui segment elements"> <div class="ui grid  ">' +  blockauthor +  blocktitulo  +  blockcontent +' </div></div>'  


                     
                      
                        $("#principal").append(mainblock);   

                                     

                      })



             })

         

               

     })
             

   //////////////////////////////////// Post para filtrar modalidad ////////////////////////////////////7


       $("#mode").change(()=>{


        var modalidad = $("#tipo").val();

        console.log(modalidad);

           
         $.post('/avisos/all/json', {modalidad:modalidad}).done((data)=>{
                 

                $(".elements").remove(); 
                  

                        $.each(data,(i, value)=>{


                meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiempre","Octubre"]
                   
           
                var date = new Date(value.creado);

                var dateformat =  date.getUTCDay() + " " + "de" + " "  + meses[date.getMonth()] + " " + "de" + " " + date.getUTCFullYear() + " " + " " + " " +date.getHours() + ":" + date.getMinutes() 


                 var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'
 

                 var blockauthor  = '<div class="two wide column ">  </div> <div class=  " fourteen wide column"> <h5> Pubicado por: ' + " " +  trabajo  +  " " + dateformat +    '<br>' + "categoria:" + " " + '<strong> '  +  value.categoria  + '</strong> </h5></div>'
                 var blocktitulo  = '<div class="two wide column ">  </div> <div class=  " fourteen wide column"><p> Se ' + " " + value.modalidad + ":" +'</p></div>'            
                 var blockcontent =  '<div class="two wide column ">  </div> <div class= "fourteen wide column"><p>' + value.descripcion +  '</p></div>' 
                 var  mainblock =  '<div class="ui segment elements"> <div class="ui grid  ">' +  blockauthor +  blocktitulo  +  blockcontent +' </div></div>'  


                      
                           $("#principal").append(mainblock);        

                    

                                     

                      })


            })


     })
        












})