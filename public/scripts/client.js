/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Generates a tweet component
$(document).ready(function() {

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
          <p><i class="fa-solid fa-face-grin-hearts"></i>   ${tweetObj.user.name}</p>
          <p>${tweetObj.user.handle}</p>
        </header>
        <p class="tweet-paragraph">${tweetObj.content.text}</p>
        <footer class="tweet-footer">
          <p>${timeago.format(tweetObj.created_at)}</p>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article> `
    )
  }
  
  //Post request to put tweets into DB
  $('form').on('submit', function(event) {
    event.preventDefault();
    let serializedData = $('form').serialize();
    
    if (serializedData.length <= 5) {
      alert("Please enter a tweet")
      return
    };
    if (serializedData.length > 145) {
      alert("Your tweet is too long")
      return
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData
    })
    .then(function(data) {
      loadTweets()
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


  


