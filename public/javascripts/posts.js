





     $(document).ready(function(){


     var script_tag = document.getElementById('owner');
     var user = script_tag.getAttribute("data-user");  

     console.log(user);

          var id;

        //////////////////////////////////////////////Comentarios cargados al inicio de la página////////////////
         
        
          var pathArray = window.location.pathname.split('/');
          var onelevelLocation = pathArray[2];
          var twolevellocation = pathArray[3];
          
          let  params = new URLSearchParams(window.location.search)
          
          let  parameter = params.get('order'); 


         

          
    

          





          $.getJSON('/all/posts/json/' + onelevelLocation + "?order=" + parameter ,(data)=>{ 

               

              
                $.each(data,(i,value)=>{

                 
                   
               
                   
                    meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiempre","Octubre"]
                   
           
                    var date = new Date(value.creado);

                    var dateformat =  date.getUTCDay() + " " + "de" + " "  + meses[date.getMonth()] + " " + "de" + " " + date.getUTCFullYear() + " " + " " + " " +date.getHours() + ":" + date.getMinutes() 

                      

                     if(value.fans.includes(user)){

                      //// Se revisa  si anteriormente se le dió click al post

                      var commentlike =  '<div class="eight wide column "><a href="/post/' + value._id +  '" class="button ui fluid secondary inverted button  "> ' + " 💬 " + value.comentarios.length + '</a>  </div> <div class="eight wide column ">  <button  class="ui secondary fluid inverted button raiting"  id="' +value._id + '" >'+ '👏' + " " +'<p.count>'+ value.raiting + '</p>'  +  '</button> </div>'

                     }   else {

                    //////////////////////  Si no se le dió click se hace una acción determinada
                          
                            var commentlike =  '<div class="eight wide column "><a href="/post/' + value._id +  '" class="button ui fluid secondary inverted button  "> ' + " 💬 " + value.comentarios.length + '</a>  </div> <div class="eight wide column ">  <button  class="ui positive fluid inverted button raiting"   id="' +value._id + '" >'+ '👏' + " " +'<p.count>'+ value.raiting + '</p>'  +  '</button> </div>'
                     } 
                    
 
                   var imagen = '<img  src="' +  value.user[0].google.picture  +'"   class="imageuser"   ><img>' 

                   var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'

             

                   

                   var blockuser  = '<div class="two wide column "> '+ imagen + ' </div> <div class=  " fourteen wide column"> <p>' +  value.user[0].username  + " " +  trabajo  + '<br>' + dateformat +  " " + " " + "categoria:" + " " + '<strong>'  +  value.categoria  + '</strong>' + '</p></div>'
                   
        
                   
                   var blockcontent ='<div class="two wide column"></div> <div class="fourteen wide column "><div class="ui container"><p> '+ value.contenido + '</p></div> </div>'
                  
                 

                   var  mainblock =  '<div class="ui segment elements"> <div class="ui grid  ">' + blockuser + blockcontent + commentlike + ' </div></div>'

                   

                 $("#results").append(mainblock);  
                   
                  
                    


                    })


                $(".raiting").click(function(e){

                       
                 if ($(this).attr('class') ==="ui positive fluid inverted button raiting" &&  user!=="cosme fulanito" )

               {

               console.log(user);
                     
               var text =   $(this).text();

               var valor =  parseInt(text.split(" ")[1]);

                id = e.target.id
                $.post('/post/vote', {id:id})
                  
                    
                
                valor ++;

                var newval = valor.toString() 

                console.log(newval + '👏');        
              
                var clase =   $(this).attr('class');

                console.log(clase);

                $(this).text( '👏' + " " + newval );

                 


                $(this).removeClass(" ui positive fluid inverted button raiting");


                $(this).addClass(" ui secondary fluid inverted button raiting");



                  } 

                     else if ($(this).attr('class') ==="ui secondary fluid inverted button raiting" && user!=="cosme fulanito") 

                 { 

                 var text =   $(this).text();

                var valor =  parseInt(text.split(" ")[1]);

                id = e.target.id
                $.post('/post/vote', {id:id})
                  
                    
                
                valor --;

                var newval = valor.toString() 

                console.log(newval + '👏');        
              
                var clase =   $(this).attr('class');

                console.log(clase);

                $(this).text( '👏' + " " + newval );

                
                   
                   $(this).removeClass(" ui secondary fluid inverted button raiting");   

                   $(this).addClass(" ui positive fluid inverted button raiting");


            

                    
                    } 


                    else {

                        console.log("ninguna prueba pasada")
                    }


 
                     


                  }) 
  


              })


        
                    

            
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7       

            
 
           $('#tema').change((event)=>{


              

               var category = $('#tema').val();
               console.log(category);

           
              window.location.assign('/posts/' + category   );              
          

   
        
          });


                $("#rate").click(function(e){

                  e.preventDefault();

                  var pathArray = window.location.pathname.split('/');
                  var LevelLocation = pathArray[2];            

                 window.location.assign('/posts/' + LevelLocation + "?" + "order=rank" );                  
  

             });





                 

      });