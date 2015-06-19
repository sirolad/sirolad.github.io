/*Andela BootCamp 9 
Project: Quiz App
Programmed By: Sirolad & Wilson
Email:sirolad@gmail.com
github id:sirolad
Date: June 2015
*/

//This is a fake bank API
var quizRef = new Firebase("https://bc9quizapp.firebaseio.com/");

$(function() {
    function doLogin(userObj) {
        quizRef.authWithPassword(userObj, authHandler);


    }

    function authHandler(error, authData) {
        if (error) {
            alert("Login Failed!", error);
        } else {
            alert("Authenticated successfully:", authData);
            window.location.href = "welcome.html";
            remember: "sessionOnly";
        }
    }


    //Register Users
    $("#submit_user").click(function() {
        
        var email = $("#register_email").val();
        var password = $("#register_password").val();
        var userObj = {
            email: email,
            password: password
        };
        quizRef.createUser(userObj, function (error, user){
            if (!error) {
                  console.log('logging new registered user');
                  doLogin(userObj);
                  var username = email.slice(0,email.indexOf('@'));
            quizRef.child('user').child(username).set({
              name: username});
            } 
            else {
                  console.log("Failed to register User");
            }
          });
        


    });

    //Login Users
    $("#submit_login").click(function() {
        var email = $("#email_login").val();
        var password = $("#password_login").val();
        var userObj = {
            email: email,
            password: password
        };
        doLogin(userObj);
    });

    //Forget Password
    $("#recall_password").click(function() {
        var email = $("#email_forgot").val();
        var emailObj = {
            email: email
        };
        quizRef.resetPassword(emailObj, function(error, emailObj) {
            if (error === null) {
                alert("Password reset email sent successfully");
            } else {
                alert("Error sending password reset email:", error);
            }
        });
    });


    //Change Password
    $("#change_password").click(function() {
        var email = $("#email_change").val();
        var old = $("#old_change").val();
        var chg = $("#new_change").val();
        var chgObj = {
            email: email,
            oldPassword: old,
            newPassword: chg
        };
        quizRef.changePassword(chgObj, function(error, chgObj) {
            if (error === null) {
                alert("Password changed successfully");
            } else {
                alert("Error changing password:", error);
            }
        });
    });


    //Logout Users
    $("#logout_user").click(function() {
        quizRef.unauth();
        alert('Are you sure?');
        window.location.href = "index.html";
    });

    //Welcome user
    quizRef.on('child_added',function(snapshot){
      var ident = snapshot.val().name;
      $('<div/>',{class: 'output'}).html('ident').appendTo('output');
    });
});
