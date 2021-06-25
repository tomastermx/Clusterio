

$(document).ready(function(){


var productArray =[];


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
                
          
             $('#profileuser').load('/users/profile/settings   #userdata ');


               $('#example').progress({ percent: 100  });


                setTimeout( ()=>{ $("#example").load('/users/profile/settings    #example' ) }, 600);  
                setTimeout( ()=>{ $("#userdata").load('/users/profile/settings    #userdata' ) }, 200); 
               
     
              });

          
        





       

    })
        



      




         

              



      
        
         
   


	
