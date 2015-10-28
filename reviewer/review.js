'use strict';

Parse.initialize("Dlxupphs37O4NRlGoyDuawGFuI5QEJttqKXkKKem","qKjAadA3AzaLeelOifqxwOL0vDthUB0RVHhym6Ci");

var Review = Parse.Object.extend("Review");
//var review1 = new Review();

var reviewTitle;
var reviewContent;
var reviewRating;



//$('#starRating').raty({
//    starOn: "raty-2.7.0/lib/images/star-on.png",
//    starOff: "raty-2.7.0/lib/images/star-off.png"
//});

$('#nathanReview').on('submit', function(event){
    var review1 = new Review();
    reviewTitle = $('#title').val();
    reviewContent = $('#content').val();
    reviewRating = $('#rating').raty('score');
    
    console.log(reviewTitle);
    console.log(reviewContent);
    
    review1.set('title', reviewTitle);
    review1.set('content', reviewContent);
    review1.set('rating', $('#starRating').raty('score'));
    
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
            var past = /*rating  "<br>" ++*/ title + "<br>" + content + "<br>";
            $('#pastReviews').append("<div id='pastReviews"+info.id+"'>" + past + "</div>"+ "<br>"+ "<br>");
            $('#pastReviews').append(rating);
            $("#pastReviews"+info.id).html(past);
        });
     });
};


