var QuestionsAndAnswers = function(quiz, question, option1, option2, option3, answer){
	var ref = new Firebase("https://bc9quizapp.firebaseio.com/quizQuestions");
	if(quiz === "" || quiz === null || question === "" || question === null || option1 === "" || option1 === null || option2 === "" || option2 === null || option3 === "" || option3 === null || answer === "" || answer === null){
			alert('Missing field. Please fill in all fields and try again.');
	}
	else{
		var qaObj = {'quiz':quiz, 'question':question, 'option1':option1, 'option2':option2, 'option3':option3, 'answer':answer};
		ref.push(qaObj, function(error){
	        if (error !== null) {
	            alert('Unable to push question and answers to Firebase!');
	        }
	        else{
	        	 alert('Question and answers added.');
	        }
	    });
	}
};

var resetFields = function(){
	theForm.question.value = "";
	theForm.option1.value = "";
	theForm.option2.value = "";
	theForm.option3.value = "";
	//theForm.rightAnswer.value.checked = false;
	document.getElementById("rightAnswer").checked = false;
}

var start = function(){
	var quiz = theForm.quiz.value;
	var question = theForm.question.value;
	var option1 = theForm.option1.value;
	var option2 = theForm.option2.value;
	var option3 = theForm.option3.value;
	var answer = theForm.rightAnswer.value;
	var qa = new QuestionsAndAnswers(quiz, question, option1, option2, option3, answer);
};