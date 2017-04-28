$(document).mousemove(function(e){

	$('body').css('font-family', 'AkzidenzGroteskPro-XBd');
	$('body').css('color', 'black');
	$('a').css('color', 'black');



	if (e.pageX % 2 == 0 ) {

		$('body').css('background-color', 'red');

	} else {

		$('body').css('background-color', 'yellow');

	}

});


$(document).ready(function(){


});


idleTimer = null;
idleState = false;
idleWait = 400;

(function ($) {

    $(document).ready(function () {
    
        $('*').bind('mousemove keydown scroll', function () {
        
            clearTimeout(idleTimer);
                    
            if (idleState == true) { 
                          
            }
            
            idleState = false;
            
            idleTimer = setTimeout(function () { 
                
                // Idle Event
				$('body').css('font-family', 'BigCaslon-Rom');
				$('body').css('color', 'white');
				$('body').css('background-color', 'black');
				$('a').css('color', 'white');

                idleState = true; }, idleWait);
        });
        
        $("body").trigger("mousemove");
    
    });
}) (jQuery)