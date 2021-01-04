

$(document).ready(function(){


  var script_tag = document.getElementById('searcher')
  var query = script_tag.getAttribute("data-search");
  

  $.post('/search',{query:query}).done((data)=>{

    $.each(data,(i, value)=>{

    	var name = '<h3>' + "🏭" + " " + value.nombre + '</h3>'

    	var descripcion  = '<h4>Descripción</h4>' + '<p>' + value.description + '</p>'

    	var  country  = '<p>' + value.ciudad + "," + " "+ value.pais +" " +"🌎" +'</p>'

    	var phone   = '<h4>' + "☎️" + " " + 'Teléfono</h4> ' + '<p>' + value.telefono +  '</p>'

      var productos = '<h4>Principales productos:</h4>'

      var updates  = '<div class="four wide column"> Actualizaciones :0 </div>'         
      var posts  = '<div class="four wide column"> Posts :0 </div>'   


    	var button  = '<a href="/company/profile/'+value._id + ' " class="ui orange button">  Más información </a>'


        $("#results").append(' <div class="ui message"><div class ="ui doubling stackable grid"><div class="eight wide column">' + name + country +  descripcion +' </div> <div class="eight wide column">' + phone +  productos + button  + '</div> </div><div class="container"> <div class="ui doubling stackable grid">' + updates + posts + ' </div> </div></div>')

    	console.log(i + value.nombre)
         
     

      })

  },"json"); 








	
})