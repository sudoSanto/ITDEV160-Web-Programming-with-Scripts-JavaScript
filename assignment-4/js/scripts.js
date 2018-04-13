

(function(){

  var today = new Date();
  var hourNow = today.getHours();
  var greeting;
  var price = 3129.99;
  var studentDiscount = .10;
  var studentPrice = parseFloat(price - (price * studentDiscount)).toFixed(2) ;

  if (hourNow > 18) {
    greeting = 'Good evening!';
  } else if (hourNow > 12) {
    greeting = 'Good afternoon!';
  } else if (hourNow > 0) {
    greeting = 'Good morning!';
  } else {
    greeting = 'Welcome!';
  }


  var elGreeting = document.getElementById('welcome');
  elGreeting.textContent = greeting;

  var elPrice = document.getElementById('price');
  elPrice.textContent = price;

  var elStudentPrice = document.getElementById('studentPrice')
  elStudentPrice.textContent = studentPrice;

}());
