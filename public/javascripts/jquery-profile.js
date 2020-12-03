

$(document).ready(function(){


var productArray =[];

console.log(productArray);
var i = 0;





           
///////////////////////////////Get user Data////////////////////////////////
//// Esta parte es de otra pagina --- analizar si se cambiará a otro archivo jquery            
      


           $.get('/users/profile/json/',(data,status)=>{
                  
                $('#profileuser').text(data.username) 
                $('#profileusermail').text(data.email)
                $('#rol').text(data.rol)

                 console.log(data);
 
                 });



         



/////////////////// //// Modify username/////////////////////////////////////////////
     
               $("#usern-change").submit((event)=>{

               event.preventDefault();

               var  namevalue =  $('#newusername').val();    

            
    
             $.post('/users/profile/settings',{usernamevalue:namevalue}) 
                
          
             $('#profileuser').load('/users/profile/settings   p #profileuser ');
     
              location.reload(false);
              });

            


            

  

  
       

    })
        



      




         

              



      
        
         
   


	
