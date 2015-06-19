
var showScore = function(){
	var q_count = getURLParameter("q");
	var c_ans = getURLParameter("ca");
	var w_ans = getURLParameter("wa");
	var score = c_ans;

	document.getElementById("questions").innerHTML = q_count;
	document.getElementById("correct").innerHTML = c_ans;
	document.getElementById("wrong").innerHTML = w_ans;
	document.getElementById("score").innerHTML = score;
}