
var nextIndex = getURLParameter("index");
var q_count = getURLParameter("q");
var c_ans = getURLParameter("ca");
var w_ans = getURLParameter("wa");
var l_ques = getURLParameter("lq");
var totalQuestions = getURLParameter("totalQuestions");


if(q_count > totalQuestions){
		//alert("Finished.");
		window.location.replace("score.html"+"?q="+q_count+"&ca="+c_ans+"&wa="+w_ans+"&lq="+l_ques);
}




var startQuiz = function(){
	var ref = new Firebase("https://bc9quizapp.firebaseio.com/quizQuestions/");

	var count = 0;
	ref.on('value', function(snapshot) {
	    snapshot.forEach(function(data) {
	      count++;
	    });
	    //console.log("count: "+ count);
	    document.getElementById("totalQuestions").value = count;
	    //console.log("totalQuestions: "+ document.getElementById("totalQuestions").value);
	    document.getElementById("link1").href="?index="+nextIndex+"&totalQuestions="+count;
	});



	if(nextIndex === "" || nextIndex === null){
		nextIndex = q_count = c_ans = w_ans = 0;
	}
	nextIndex++;
	document.getElementById("link1").href="?index="+nextIndex;

	ref.limitToFirst(nextIndex).on("child_added", function(snapshot){
		  	var ss = snapshot.val();
		  	document.getElementById("question").innerHTML = ss.question;
		  	document.getElementById("option1").innerHTML = ss.option1;
		  	document.getElementById("option2").innerHTML = ss.option2;
		  	document.getElementById("option3").innerHTML = ss.option3;
		  	document.getElementById("correctOption").value = ss.answer;
		}, 
		function (errorObject){
	  		alert("The read failed: " + errorObject.code);
	});
}

var storeAnswer = function(){
	q_count++;
	l_ques = document.getElementById("question").innerHTML;
	
	var answerChosen = theForm.userAnswer.value;
	var correctOption = theForm.correctOption.value;
	if(answerChosen === correctOption){
		c_ans++;
	}
	else if(answerChosen === ""){
		//alert("No answer selected.");
	}
	else{
		w_ans++;
	}
	document.getElementById("link1").href += "&q="+q_count+"&ca="+c_ans+"&wa="+w_ans+"&lq="+l_ques;
}