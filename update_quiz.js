var showQuizes = function(){
	var ref = new Firebase("https://bc9quizapp.firebaseio.com/quiz/");
	var urlParam1 = getURLParameter("name");
	var urlParam2 = getURLParameter("category");
	var urlParam3 = getURLParameter("id");
	
	quizUpdateForm.id.value = urlParam3;
	quizUpdateForm.oldCategory.value = urlParam2;
	quizUpdateForm.name.value = urlParam1;
	
	ref.on("child_added", 
		function(snapshot){
		  	var ss = snapshot.val();
		  	document.getElementById("quizList").innerHTML += "<a href='?id="+snapshot.name()+"&name="+ss.name+"&category="+ss.category+"'>"+ss.name +"("+ ss.category +")</a><br/>";
		}, 
		function (errorObject){
	  		alert("The read failed: " + errorObject.code);
	});
 }

 var updateQuiz = function(){
	var id = quizUpdateForm.id.value;
	var name = quizUpdateForm.name.value;
 	var category = quizUpdateForm.newCategory.value;
	var ref = new Firebase("https://bc9quizapp.firebaseio.com/");
	var usersRef = ref.child("quiz");
	if(category === "" || category === null || name === "" || name === null){
			alert('Quiz category or name cannot be blank. Please try again.');
	}
	else{
		usersRef.child(id).set({category: category, name: name}, function(error){
	        if (error !== null) {
	            alert('Unable to update quiz!');
	        }
	        else{
	        	alert('Quiz updated.');
	        	location.reload();
	        }
	    });
	}
 }