'use strict';

Parse.initialize("Dlxupphs37O4NRlGoyDuawGFuI5QEJttqKXkKKem","qKjAadA3AzaLeelOifqxwOL0vDthUB0RVHhym6Ci");

var Review = Parse.Object.extend("Review");

var reviewTitle;
var reviewContent;
var reviewRating;





$('#starRating').raty({
    starOn: "raty-2.7.0/lib/images/star-on.png",
    starOff: "raty-2.7.0/lib/images/star-off.png"
});

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
            var past = title + "<br>" + content + "<br>";
            var votes = info.get("votes");
            
            
            $('#pastReviews').append(rating);
            $('#pastReviews').append("<div id='pastReviews"+info.id+"'>" + past + "</div>");
            $("#pastReviews"+info.id).text(past);
            $('#pastReviews').append("<button id='delete' type='submit' class='btn btn-default deleteButton' data-id=" + info.id + "> Delete</button>");
            $('#pastReviews').append("<button id='upvote' type='submit' class='btn btn-default up' data-id=" + info.id + "> Upvote</button>");
            $('#pastReviews').append("<button id='downvote' type='submit' class='btn btn-default down' data-id=" + info.id + "> Downvote</button>");
            $('#pastReviews').append(votes);
        });
     
       console.log("test");
        
    }).then(function() {
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

        $(".up").on("click", function(e){
            e.preventDefault();
            var id = $(e.target).attr("data-id");
            query.get(id, {
                success: function(myObj) {
                // The object was retrieved successfully.
                var prevVote = myObj.get("votes");
                if (prevVote === undefined) {
                    prevVote = 0;
                }
                myObj.set("votes", prevVote + 1);
                myObj.save();
                    
                },
                error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                      }
                }); 
        });
        
    });
};






