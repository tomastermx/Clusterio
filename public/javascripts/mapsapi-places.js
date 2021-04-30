



var placeSearch, autocomplete;





var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
  country: 'long_name',
  postal_code: 'short_name'
};



function initAutocomplete() {



  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {types: ['geocode']});

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component','geometry']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);

    


}

function fillInAddress() {
  // Get the place details from the autocomplete object.
 
      var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 11,
  });




    var place = autocomplete.getPlace();

 
           
      
    lat= place.geometry.location.lat();
    lng = place.geometry.location.lng();

  
    


   console.log(lat);   
   console.log(lng);   

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = true;
  }


  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;

    }
  }

  

     map.setCenter(place.geometry.location);
     map.setZoom(17);

           
    var marker =    new google.maps.Marker({
    position: {lat:place.geometry.location.lat() , lng:  place.geometry.location.lng() },
    map,
    title: "Hello World!",
   });

        
    document.getElementById("latitud").value = place.geometry.location.lat();
    document.getElementById("longitud").value = place.geometry.location.lng(); 
      
      ///////////////////////////////////////////Escucha el google map al darle click
      map.addListener("click", (e) => { 

        var point = JSON.parse(JSON.stringify(e.latLng))

         var latlng = new google.maps.LatLng( point.lat,point.lng );
         marker.setPosition(latlng);

         document.getElementById("latitud").value =  point.lat;
         document.getElementById("longitud").value = point.lng;
      

       });
   
   

}


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
