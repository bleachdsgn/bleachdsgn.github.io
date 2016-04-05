document.body.style.cursor = 'none';

$(document).bind('mousemove', function(e){
    $('.a').css({
       left:  e.pageX - 250,
       top:   e.pageY - 250
    });
});


$('html').click(function(){

  $( "span" ).toggleClass( "lights" )
  console.log('click');

});

$(document).ready(function(){
    $(".fade").hide(0).delay(500).fadeIn(3000)
});









