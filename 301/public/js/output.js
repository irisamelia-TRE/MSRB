if(!localStorage.getItem("agree")) {
  window.location.replace("index.html");
}
$( document ).ready(function() {
localStorage = window.localStorage;

$("input").each( function( ) {
  var inputName = $(this).attr("name");
  var local = localStorage.getItem(inputName);
  $(this).val(local);
})


});
