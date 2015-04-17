$(document).ready(function() {

//	Changing background


	var content = $('body');
	
	var backgrounds = [
		'url(images/background-1.jpg)',
		'url(images/background-2.jpg)',
		'url(images/background-3.jpg)',
		'url(images/background-4.jpg)'
	];

	content.css('background-image', backgrounds[0]);

	function changeBackground() {
		var randomIndex = Math.floor(Math.random()*backgrounds.length);
		content.animate({ 'background-image': backgrounds[randomIndex] }, 500);
	}
	
	setInterval(changeBackground, 500);

	
	
//	Ajax Request template
	function Request() {
   this.type = '';
   this.url = 'http://localhost:3000';
   this.data = {};
   this.dataType = 'json';
   this.success = function(response) {
   };
	}
	
	
// Prevent closing the sign up form on click
	$('.dropdown-menu').click(function(e) {
		 e.stopPropagation();
	});
	
	
//sign up Request
	$('#signup').on('click', function() {
		
		var usernameInput = $('#username').val();
		var emailInput = $('#email').val();
		var passwordInput = $('#password').val();
		var newRequest = new Request();
		var dataPackage = {
			user: {
				username: usernameInput,
				email: emailInput,
				password: passwordInput
			}
		};
		
		newRequest.type = 'POST';
		newRequest.url += '/users';
		newRequest.data = dataPackage;
		newRequest.success = function(response) {
			$('#signup-dropdown').hide();
			$('#signin-dropdown').hide();
			console.log(response);
		};
		newRequest.error = function(response) {
			$('#sign-up-menu').attr('class', 'has-error');
			$('#sign-up-menu').append('<li>' + response.responseText + '</li>');
		};
		
		
		$.ajax(newRequest);

	});
	
//sign in request
	$('#signin').on('click', function() {
		
		var usernameInput = $('#signin-username').val();
		var passwordInput = $('#signin-password').val();
		var newRequest = new Request();
		var dataPackage = {
			user: {
				username: usernameInput,
				password: passwordInput
			}
		};
		
		newRequest.type = 'POST';
		newRequest.url += '/sessions';
		newRequest.data = dataPackage;
		newRequest.xhrFields = { withCredentials: true };
		newRequest.success = function(response) {
			$('#signin-dropdown').hide();
			$('#signup-dropdown').hide();
			$('#signedin').text("Hello " + usernameInput + ", you are now signed in.")
			console.log(response);
		};
		newRequest.error = function(response) {
			$('#sign-in-menu').attr('class', 'has-error');
			$('#sign-in-menu').append('<li>' + response.responseText + '</li>');
		};
		
		
		$.ajax(newRequest);

	});
	
	
	$('.navbar-brand').on('click', function() {
		location.reload();
	});
		
	
		
		
		
		
		
		
}); // End of (document).ready