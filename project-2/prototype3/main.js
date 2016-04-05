$(".first").click(function(){

	$(this).hide();
	$(".second").show();

});

$(".second").click(function(){

	$(this).hide();
	$(".third").show();

});

$(".third").click(function(){

	$(this).hide();
	$(".first").show();

});