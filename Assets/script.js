//As a user, I want to be able to filter the pricing and search distances to my liking.- Shahnaz

var events = [10,12,18,35,40];
  var under25 = events.filter(function(event) {
    return event > 25;
  });
  
  console.log(under25);
  //