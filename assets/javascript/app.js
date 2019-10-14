var topics = ['Will Farrel', 'Zach Galifianakis', 'Borat','Robin Williams', 'Jim Carrey','Chevy Chase', 'Richard Pryor', 'Gene Wilder'];
var gifLimit = 10
$(document).ready(function () {
    gif.findTopics(topics);
});

// collect input from search and push to array to render new button
$(document).on('click', '#submit', function(event){
    event.preventDefault();
    if($('#gif-search').val().length !== 0){
    var newSearch = $('#gif-search').val().trim();
    topics.push(newSearch);
    console.log(topics);
    gif.findTopics(topics);
}})

// render gifs to the page on click of topic
$(document).on('click', '.topic-button', function () {
    $('#gif-container').empty();
    var searchTop = $(this).data('type');
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=$${searchTop}&api_key=mhxOTagN8EaT769YTM0I3Oj5CYZryVgw&limit=${gifLimit}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data
        console.log(response.data)
        for (var i = 0;i<results.length;i++){
            gif.showGifs(results[i])
        }
    })
})

// animate the gif on click
$(document).on('click', '.gif-image', function(){
    var state = $(this).attr('data-state');
    if(state === 'still'){
        $(this).attr('src', $(this).data('animated'))
        $(this).attr('data-state', 'animated')
    }
    else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})


var gif = {
    findTopics: function (topics) {
        $('#button-container').empty();
        for (var i = 0; i < topics.length; i++) {
            gif.createButton(topics[i])
        }
    },
    createButton: function (myTopic) {
        var newButton = $('<button>');
        newButton.addClass('topic-button');
        newButton.attr('data-type', myTopic);
        newButton.text(myTopic);
        $('#button-container').append(newButton);
    },
    // removeButton: function () {

    // },
    showGifs: function (myGifs) {
        var gifDiv = $('<div class="gif-wrapper">')
        var still = myGifs.images.fixed_height_still.url;
        var animated = myGifs.images.fixed_height.url;
        var rating = myGifs.rating;
        var pRating = $(`<p class="gif-rating">Rated: ${rating}</p>`);
        var gifImg = $('<img>')
        gifImg.addClass('gif-image')
        gifImg.attr('src', still)
        gifImg.attr('data-still', still);
        gifImg.attr('data-animated', animated)
        gifImg.attr('data-state','still');
        gifDiv.append(gifImg).append(pRating);
        $('#gif-container').append(gifDiv);
    },


}