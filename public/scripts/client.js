/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Generates a tweet component
$(document).ready(function() {

  //prevents malicious html being submitted
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Cycles through tweets and then prepends to list
  const renderTweets = function(tweets) {
    $('.tweet-container').empty()
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet)
      $('.tweet-container').prepend(newTweet);  
    }   
  }

  //Creates a tweet
  const createTweetElement = (tweetObj) => {
    return (`
      <article class="tweet">
        <header class="tweet-header">
          <p><i class="fa-solid fa-face-grin-hearts"></i>   ${escape(tweetObj.user.name)}</p>
          <p>${escape(tweetObj.user.handle)}</p>
        </header>
        <p class="tweet-paragraph">${escape(tweetObj.content.text)}</p>
        <footer class="tweet-footer">
          <p class="time">${timeago.format(escape(tweetObj.created_at))}</p>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article> `
    )
  }
  
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    let serializedData = $('form').serialize();
    
    //Validation check on tweet length
    if (serializedData.length <= 5) {
      $(".tweet-alert").html("Please enter a tweet!").slideDown("slow")
      return
    };
    if (serializedData.length > 145) {
      $(".tweet-alert").html("Your tweet is too long!").slideDown("slow")
      return
    }
    //Post request to put tweets into DB
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData
    })
    .then(function(data) {
      loadTweets()
      $(".tweet-alert").hide()
      $('#tweet-text').val("").focus();
      //resets counter back to 140 after tweet submission
      $('#tweet-text').siblings("div").children(".counter").text(140)
    })
    .catch(function(error) {
      console.log("error happened", error)
    })
  })

  //Function to put tweets on the page
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET', 
    })
    .then(function(tweets) {
      renderTweets(tweets);
    })
    .catch(function(error){
      console.log('error', error)
    })
  }
})


  


