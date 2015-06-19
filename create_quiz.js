function Quiz(category, name){
	var ref = new Firebase("https://bc9quizapp.firebaseio.com/");
	var usersRef = ref.child("quiz");
	//var catObj={};
	//catObj['category']=category;
	//catObj['name']=name;
	//console.log(catObj);

	this.add = function(){
		//usersRef.set(catObj);
		//usersRef.push(catObj);
		if(category === "" || category === null || name === "" || name === null){
			alert('Quiz category or name cannot be blank. Please try again.');
		}
		else{
			usersRef.push({'category':category, 'name':name}, function(error){
		        if (error !== null) {
		            alert('Unable to push comments to Firebase!');
		        }
		        else{
		        	 alert('Quiz added.');
		        }
		    });
		}
	};

	this.update = function(){
		//var usersRef = ref.child('quiz/-Js0_6412_nw3K1m3suS').child('category').set("whatever");
		var usersRef = ref.child('quiz').child('category').set("whatever");
	}
}

var create = function(){
	var q = new Quiz(createQuizForm.category.value,createQuizForm.name.value); 
	q.add();
}