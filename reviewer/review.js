'use strict';

Parse.initialize("Dlxupphs37O4NRlGoyDuawGFuI5QEJttqKXkKKem","qKjAadA3AzaLeelOifqxwOL0vDthUB0RVHhym6Ci");

var Review = Parse.Object.extend("Review");

//variables for the input 
var reviewTitle;
var reviewContent;
var reviewRating;

//images for highlighted and non-highlighted stars
$('#starRating').raty({
    starOn: "raty-2.7.0/lib/images/star-on.png",
    starOff: "raty-2.7.0/lib/images/star-off.png"
});

//creates a new review from user's entries on site
$('#nathanReview').on('submit', function(event){
    var review1 = new Review();
    reviewTitle = $('#title').val();
    reviewContent = $('#content').val();
    reviewRating = $('#starRating').raty('score');
    
    console.log(reviewTitle);
    console.log(reviewContent);
    
    review1.set('title', reviewTitle);
    review1.set('content', reviewContent);
    review1.set('rating', reviewRating);
    
    review1.save();
    
    event.preventDefault();    //current standard
    event.returnValue = false; //some older browsers
    return false;              //most older browsers
});

//gathers info and displays past reviews on page
var fetchInfo = new function(){
    var query = new Parse.Query(Review);
    query.find().then(function(results) {
        results.forEach(function(info) {
            var ratingDiv = "<div class='stars'></div>";
            var rating = $(ratingDiv).raty({ 
                starOn: "raty-2.7.0/lib/images/star-on.png",
                starOff: "raty-2.7.0/lib/images/star-off.png",
                readOnly: true,
                score: function() {
                    console.log(info.get('rating'));
                    return info.get('rating');
                }});
            var title = info.get('title').replace(/</g, "&lt;").replace(/</g, "&gt;");
            var content = info.get('content').replace(/</g, "&lt;").replace(/</g, "&gt;");
            var pastTitle = title + "<br>";
            var pastContent = content + "<br>";
            var votes = info.get("votes");
            if (votes === undefined) {
                    votes = 0;
                }
            
            
            $('#pastReviews').append(rating);
            $('#pastReviews').append("<div id='title'>" + pastTitle + "</div>");
            $('#pastReviews').append(pastContent);
            $('#pastReviews').append("<button id='delete' type='submit' class='btn btn-default deleteButton' data-id=" + info.id + "> Delete</button>");
            $('#pastReviews').append("<button id='upvote' type='submit' class='btn btn-default up' data-id=" + info.id + "> &#11014; </button>");
            $('#pastReviews').append("<button id='downvote' type='submit' class='btn btn-default down' data-id=" + info.id + "> &#11015; </button>");
            $('#pastReviews').append(" score: " + votes + "<br>" + "<br>");
        })
        
        
        //returns an average rating for all reviews
        var sum = 0;
        for (var i = 0; i < results.length; ++i) {
            sum += results[i].get("rating");
        }
        var avg = (sum / results.length);
        avg = avg.toFixed(1);
        $('#average').append(" Average rating: " + avg + "/5");
         
    }).then(function() {
        //delete review function
        $(".deleteButton").on("click", function(e){
            e.preventDefault();
            var id = $(e.target).attr("data-id");
            query.get(id, {
                success: function(myObj) {
                // The object was retrieved successfully.
                myObj.destroy({});
                },
                error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                      }
                }); 
        });

        //upvote function
        $(".up").on("click", function(e){
            e.preventDefault();
            var id = $(e.target).attr("data-id");
            query.get(id, {
                success: function(myObj) {
                // The object was retrieved successfully.
                var prevVote = myObj.get("votes");
                myObj.set("votes", prevVote + 1);
                myObj.save();
                }
            }); 
        });
        
        //downvote function
        $(".down").on("click", function(e){
            e.preventDefault();
            var id = $(e.target).attr("data-id");
            query.get(id, {
                success: function(myObj) {
                // The object was retrieved successfully.
                var prevVote = myObj.get("votes");
                myObj.set("votes", prevVote - 1);
                myObj.save();
                    }
            }); 
        });
    });
};






