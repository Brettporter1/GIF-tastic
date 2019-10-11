var topics = ['Will Farrel', 'Zach Galifianakis', 'Borat','Robin Williams', 'Jim Carrey'];
var gifLimit = 10
$(document).ready(function () {
    gif.findTopics(topics);
});

$(document).on('click', '#submit', function(event){
    event.preventDefault();
    var newSearch = $('#gif-search').val().trim();
    topics.push(newSearch);
    console.log(topics);
    gif.findTopics(topics);
    $('#gif-search').val().empty()
})

$(document).on('click', '.topic-button', function () {
    $('#gif-container').empty();
    var searchTop = $(this).attr('data-type');
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=$${searchTop}&api_key=mhxOTagN8EaT769YTM0I3Oj5CYZryVgw&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data
        for (var i = 0;i<results.length;i++){
            gif.showGifs(results[i])
        }
    })
})
$

$(document).on('click')

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
    removeButton: function () {

    },
    showGifs: function (myGifs) {
        newGif = $('<img>')
        newGif.attr('src',myGifs.images.fixed_height_still.url)
        newGif.addClass('gif-image');
        $('#gif-container').append(newGif);
    },


}