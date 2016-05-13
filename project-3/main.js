// We declare the username variable up here so that we can
// access it after we set it's value in the submit-button
// click handler
var username;

// When the user clicks the submit button, we want to save the 
// username they entered, hide the form, and show the color input
$('.submit-button').click(function (e) {
  username = $('.username-input').val();

  $('.username-form').addClass('is-hidden');
  $('.color-input').removeClass('is-hidden');
});

// Actually handle user input on our chat options
// This is where we're tying particular values to 
// colors in messages we send.
$('.blue').click(function () {
  sendMessage(0);
});

$('.red').click(function () {
  sendMessage(1);
});

$('.purple').click(function () {
  sendMessage(2);
});

$('.yellow').click(function () {
  sendMessage(3);
});

$('.cyan').click(function () {
  sendMessage(4);
});

$('.turquoise').click(function () {
  sendMessage(5);
});

$('.green').click(function () {
  sendMessage(6);
});

$('.navy').click(function () {
  sendMessage(7);
});

$('.fuchsia').click(function () {
  sendMessage(8);
});

// This is where the magic happens!!!
// We use the Chat object's `sendMessage` function
// to actually send the message
function sendMessage(value) {
  Chat.sendMessage({
    sender: username,
    type: 'color',
    value: value
  });
}

// This map of color values makes it easy
// for us to interpret the messages we receive
var colorValues = {
  0: 'images/westside.svg',
  1: 'images/bk.svg',
  2: 'images/hoover-crip.svg',
  3: 'images/piru.svg',
  4: 'images/victory.svg',
  5: 'images/eastside.svg',
  6: 'images/westside.svg',
  7: 'images/bk.svg',
  8: 'images/hoover-crip.svg',
  9: 'images/piru.svg',
  10: 'images/victory.svg',
  11: 'images/eastside.svg',
  12: 'images/westside.svg'
};

var animations = ['bigEntrance', 'expandUp', 'slideLeft', 'fadeIn'];

// And here's where we actually handle incoming messages
// For each message we get, we create a new element, label
// it with the message sender's name, and assign classes
// based on its sender and value
Chat.onMessage(function (data) {
  // Create the message element

  // old stuff
  // var message = $('<div></div>');
  // var img = $('<img src="">');
  // $(img).attr('src' , colorValues[data.value]);
  // $(message).append(img);
  // $('body').append(message);
  // $(message).addClass('message');

  // var message = $('<div></div>');
  var $img = $("#sign");
  $img.attr('src' , colorValues[data.value]);
  // $('#sign').addClass('bigEntrance');

  var randAnimation = animations[Math.floor(Math.random() * animations.length)];
  $img.attr("class", "");

  $img.addClass(randAnimation).delay(2000).queue(function(){
    $img.attr("class", "");
    $(this).dequeue();
  });

  // $(message).append(img);
  // $('body').append(message);
  // $(message).addClass('message');

  // create animation

  // Here's where we assign the color class. We use the
  // message's value to pull a color from our map of 
  // colors above
  $(message).addClass(colorValues[data.value]);

  // If the message is from the current user, give it a
  // special class
  // if (data.sender == username) {
  //   $(message).addClass('from-current-user');
  // }

  // Create the label element and set its html
  // var messageLabel = $('<div></div>');
  // $(messageLabel).html(data.sender);

  // Append label to the message
  $(message).append(messageLabel);

  // Append message to the container on the page
  $('.message-container').append(message);
});

// This is where we handle changes in active user count.
// We're going to lighten the background based on the number
// of users on the page
Chat.onUserCountChange(function (currentCount) {
  // We'll say that maximum lightness happens at 20 users,
  // so we'll treat all counts greater than 20 the same as 20
  if (currentCount > 20) {
    currentCount = 20;
  }

  // How close we are to twenty users determines the lightness.
  // It's a percentage so we multiply by 100.
  var lightness = Math.round((currentCount / 20) * 100);

  // Actually set the background color. HSL is often the easiest
  // color format to use when modifying color dynamically
  // $('body').css({
  //   backgroundColor: 'hsl(0,0%,' + lightness + '%)'
  // });
});