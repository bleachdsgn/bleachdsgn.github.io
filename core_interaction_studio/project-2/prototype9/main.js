document.body.style.cursor = 'none';

$(document).bind('mousemove', function(e){
    $('.a').css({
       left:  e.pageX - 250,
       top:   e.pageY - 250
    });
});

document.body.style.cursor = 'none';

$('html').click(function(){

  $( "body" ).toggleClass( "lights" );
  $( "body" ).toggleClass( "shadow" );

});










