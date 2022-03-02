/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Generates a tweet component
$(document).ready(function() {
  console.log("hey there!")

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const createTweetElement = (tweetObj) => {
    return (`
    <article class="tweet">
    <header class="tweet-header">
      <p><i class="fa-solid fa-face-grin-hearts"></i>   ${tweetObj.user.name}</p><p>${tweetObj.user.handle}</p>
    </header>
       
        <p class="tweet-paragraph">${tweetObj.content.text}</p>
      
    <footer class="tweet-footer">
      <p>${tweetObj.created_at}</p>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article> `)
  }
  
  const $tweet = createTweetElement(tweetData);

  console.log($tweet);
  $('.tweet-container').append($tweet);
})





