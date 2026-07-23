function joinmsg(){
alert("Redirecting to Login Page");
}

function joinmsg1(){
alert("Redirecting to Courses Page");
}

$(document).ready(function(){



$('.container1').mouseover(function(){
	$('#h2').css({color:"blue","font-size":"40px"});
	$('.card').css({background:"orange", color:"white",});
	$('.card p').css({"font-size":"25px", color:"black"});
});

$('.container1').mouseout(function(){
	$('#h2').css({color:"black","font-size":"32px"});
	$('.card').css({background:"whitesmoke",color:"black"})
	$('.card p').css({"font-size":"15px"});

})
$(".course-card").fadeIn(800);

$(".course-card").hover(
function(){
$(this).css("margin-top","-15px");
$(this).css("border","3px solid black");

},
function(){
$(this).css("margin-top","0px");
$(this).css("border","none");

}
);




});


function showmsg()
{
document.getElementById("thankmsg").innerHTML="✅ Thank you! Your enquiry has been submitted successfully.";

return false;

}

