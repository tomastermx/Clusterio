
$(document).ready(function(){


 $('.menu .item')
   .tab();

 

$('.ui.dropdown')
  .dropdown();


$('.ui.checkbox')
  .checkbox();



$('.ui.search')
  .search({
    apiSettings: {
      url: '//api.github.com/search/repositories?q={query}'
    },
    fields: {
      results : 'items',
      title   : 'name',
      url     : 'html_url'
    },
    minCharacters : 3
  });



     $('.ui.sidebar')
        .sidebar('attach events', '.toc.item')
      ;
 

}); 


  