

//////////////////////// mesages///////////////////

$(document).ready(function(){



$("#messageform").submit(event=>{

      event.preventDefault();

      var = message = $("#message").val();

       $.post('/messages/send/to/:id',{message:message});


})



})