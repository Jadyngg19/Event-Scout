$(document).ready(function () {
    //search button feature
    $("#search-button").on("click", function () {
      //get value in input search-value.
      var searchTerm = $("#search-value").val();
      //empty input field.
      $("#search-value").val("");
      eventFunction(searchTerm);
      eventForecast(searchTerm);
    });
  
    //search button enter key feature. 
    $("#search-button").keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode === 13) {
        eventFunction(searchTerm);
        eventForecast(searchTerm);
      }
    });
  
    //pull previous searches from local storage
    var history = JSON.parse(localStorage.getItem("history")) || [];
  
    //sets history array search to correct length
    if (history.length > 0) {
      eventFunction(history[history.length - 1]);
    }
    //makes a row for each element in history array(searchTerms)
    for (var i = 0; i < history.length; i++) {
      createRow(history[i]);
    }
  
    //puts the searched cities underneath the previous searched city 
    function createRow(text) {
      var listItem = $("<li>").addClass("list-group-item").text(text);
      $(".history").append(listItem);
    }
  
    //listener for list item on click function
    $(".history").on("click", "li", function () {
      eventFunction($(this).text());
      eventForecast($(this).text());
    });
});