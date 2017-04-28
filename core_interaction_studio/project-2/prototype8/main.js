document.body.style.cursor = 'none';

$(document).bind('mousemove', function(e){
    $('.a').css({
       left:  e.pageX - 250,
       top:   e.pageY - 250
    });
});


$('html').click(function(){

  $( "body" ).toggleClass( "lights" )
  console.log('click');

});










