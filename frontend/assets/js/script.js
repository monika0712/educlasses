function joinmsg() {
    alert("Redirecting to Login Page");
}

function joinmsg1() {
    alert("Redirecting to Courses Page");
}

$(document).ready(function () {

    // Our Achievements Hover Effect
    $('.container1').mouseover(function () {
        $('.card').css({
            "background": "orange",
            "color": "white"
        });
    });

    $('.container1').mouseout(function () {
        $('.card').css({
            "background": "whitesmoke",
            "color": "black"
        });
    });

    // Course Cards Fade In
    $(".course-card").fadeIn(800);

    // Course Cards Hover Effect
    $(".course-card").hover(
        function () {
            $(this).css({
                "margin-top": "-15px",
                "border": "3px solid black"
            });
        },
        function () {
            $(this).css({
                "margin-top": "0px",
                "border": "none"
            });
        }
    );

});

function showmsg() {
    document.getElementById("thankmsg").innerHTML =
        "✅ Thank you! Your enquiry has been submitted successfully.";

    return false;
}