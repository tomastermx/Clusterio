//var productArray =[];

$(document).ready(function(){
  var productArray =[];

console.log(productArray);
var i = 0;


/// ////////////////////////////////////Industry----Company////////////////////////////////

            $('#industry').change(()=>{
           
            $('#subindustry').empty();
          


          var  data1 =  $("#industry").val();                

        
         var  tipo = data1;
          
////////////////////////////Subindustry----Company///////////////////////////////////////
/// Aca se consume un Json   guardado mediante protocolo HTTP
        $.getJSON('/javascripts/industry.json',(data)=>{
             
              $.each(data[tipo].sub,(key,value)=>{
               $('#subindustry').append($('<option></option>').attr('value',value.value).text(value.data));
                console.log(value.data);

                               })

                 });
               $.getJSON('/javascripts/industry.json',(data)=>{
               $.each(data[tipo].badges,(key,value)=>{
                  $('#badge').append($('<option></option>').attr('value',value.value).text(value.data));
                    console.log(value.data);
                   })
                  
            })    
        
          


            
      });







    
////////////////////////////////Add products for Company/////////////////////
       



$("#add").click((e)=>{



 e.preventDefault();
 
 
 var product = $("#proditem").val();
 var description = $("#descripcion").val();

  


if(product!=="" && description!==""){

item = {producto:product, descripcion:description}
 

 productArray.push(item);



//console.log(productArray);


 var row = '<div class="ui segment id="'+i+'" "><div class="ui three column grid"><div class="column"><p class="product">'+ productArray[i].producto + '</p></div><div class="column"><p>' + productArray[i].descripcion + '</p></div><div class="column"> <button  class="ui button red" id="remove" >Eliminar</button></div></div></div>'


 
  $("#list").append(row);

 
i++;

 console.log(productArray);

   } else {alert("espacio vacio")}



});
  
//////////////////////////////////////////////Remove products from the array /////////////////


///// Con esto me tarde como 3 semenas  en resolverlo
///// Busque la manera  de poder seleccionar un elemento con append

$("#list").on("click","button" ,function(e){

/// Para que no haga post//////
e.preventDefault();                
      
$(this).parent().parent().parent().fadeOut(1000).remove(1000);
      
  var text = $(this).parent().parent().find("p.product").text();
  
  var element = text.toString();


 for( j = 0 ; j < productArray.length ; j++){
  
    if(productArray[j].producto===element){
          
          productArray.splice(j,1);
       
 
    }

 }


 console.log(productArray);

 });



//////          /// Post new Company //////////////////////////////////////////////     
      /// Agregar nueva empresa 
      
           $("#companyname").submit((event)=>{
                 
              event.preventDefault();

            var  cname = $('#nameofcompany').val();
            var description = $('#description').val();
            var street = $('#route').val();
            var city = $('#locality').val();
            var streetnumber = $('#street_number').val();
            var state = $('#administrative_area_level_1').val();
            var country = $('#country').val();
            var industry = $('#industry').val();
            var subindustry = $('#subindustry').val();
            var phone = $('#phone').val();
            var website = $('#website').val();
            var badges  = $('#badge').val(); 
            var moreinfo = $('#masinfo').val();

            var latitud = $("#latitud").val();
            var longitud = $("#longitud").val();
        
           ///// Redirige al usuario a la página
            window.location.assign('/users/profile');   
          
           //event.preventDefault();
             $.post('/company/new',{companyname:cname,street:street,description:description,streetnumber:streetnumber,city:city,state:state,country:country,industry:industry,
              subindustry:subindustry, phone:phone ,products : productArray,badges:badges, website:website,moreinfo:moreinfo,latitud:latitud,longitud:longitud});

            
           });
             


 







});
