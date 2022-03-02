$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let textLength = $(this).val().length
    let maxLength = 140
    let newCount = $(this).siblings("div").children(".counter").text(maxLength - textLength)
    
    if (textLength < maxLength) {
      newCount.addClass('grey-color')
    } else if (textLength > maxLength) {
      newCount.removeClass('grey-color')
      newCount.addClass('red-color')
    }   
  });
});




