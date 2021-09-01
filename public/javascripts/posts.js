





     $(document).ready(function(){

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


                    
 
                    var imagen = '<img  src="' +  value.user[0].google.picture  +'"   class="imageuser"   ><img>' 

                   var trabajo = '<a href="/company/profile/' +  value.company[0]._id  + '">' + value.company[0].nombre  + '</a>'

             

                   

                   var blockuser  = '<div class="two wide column "> '+ imagen + ' </div> <div class=  " fourteen wide column"> <p>' +  value.user[0].username  + " " +  trabajo  + '<br>' + dateformat +  " " + " " + "categoria:" + " " + '<strong>'  +  value.categoria  + '</strong>' + '</p></div>'
                   
        
                   
                   var blockcontent ='<div class="two wide column"></div> <div class="fourteen wide column "><div class="ui container"><p> '+ value.contenido + '</p></div> </div>'
                  
                   var commentlike =  '<div class="eight wide column "><a href="/post/' + value._id +  '" class="button ui fluid secondary inverted button  "> ' + " 💬 " + value.comentarios.length + '</a>  </div> <div class="eight wide column "><button  class="ui secondary fluid inverted button  raiting"   id="' +value._id + '" > '+ '👏' + value.raiting  +  '</button> </div>'

                   var  mainblock =  '<div class="ui segment elements"> <div class="ui grid  ">' + blockuser + blockcontent + commentlike + ' </div></div>'

                   

                 $("#results").append(mainblock);  
                   
                  
                    


                    })


                $(".raiting").click(function(e){  
        
                     id = e.target.id
                    

                   $.post('/post/vote', {id:id})

                   
                      $(this).children().load( '/posts ' + '#' + id +  ' ' );
                  
                 
                   location.reload(false);


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