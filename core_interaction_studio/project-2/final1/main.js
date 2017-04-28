$("span").hover(function() {

	$(this).css("color" , "red");

});

var myCounter = 0;

$(function() {
	
    $("span").mouseover(function()
    {
        myCounter++;
        if (myCounter > 325) {

			$("span").css("color" , "red");

		}
    });

});

    document.body.style.cursor = 'none';






