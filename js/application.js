$(document).ready(function() {

//	Changing background


//	var content = $('body');
//	
//	var backgrounds = [
//		'url(images/background-1.jpg)',
//		'url(images/background-2.jpg)',
//		'url(images/background-3.jpg)',
//		'url(images/background-4.jpg)'
//	];
//
//	content.css('background-image', backgrounds[0]);
//
//	function changeBackground() {
//		var randomIndex = Math.floor(Math.random()*backgrounds.length);
//		content.animate({ 'background-image': backgrounds[randomIndex] }, 500);
//	}
//	
//	setInterval(changeBackground, 500);

	
	//Delete all previous sessions on page reload
	var refreshSessionsRequest = new Request();
	refreshSessionsRequest.type = 'DELETE';
	refreshSessionsRequest.url += '/sessions';
	this.success = function(response) {
		console.log(response);
	};
	this.error = function(response) {
		console.log(response);
	};
	
	$.ajax(refreshSessionsRequest);
	
	
	//Hide Tweet Create
	$('.user-info').hide();
	
	
	//	Ajax Request template
	function Request() {
		this.type = '';
		this.url = 'http://localhost:3000';
		this.data = {};
		this.xhrFields = { withCredentials: true };
		this.dataType = 'json';
		this.success = function(response) {
		};
	}

	//Get all user tweets
	function getUserTweets(username) {
		var userTweetRequest = new Request();
		
		userTweetRequest.type = 'GET';
		userTweetRequest.url += '/users/'+ username +'/tweets';
		userTweetRequest.success = function(response) {
			console.log(response);
			
			if(response.length) {
				$('#user-tweets').html('');
				for(var i = 0; i < response.length; i++) {
					var text= '';
					text += '<li>' + response[i].tweet + '</li>';
					$('#user-tweets').append(text);
				}
			}
			else {
				$('#user-tweets').html('');
				$('#user-tweets').append("No tweets found.");
			}
		}
		
		console.log(userTweetRequest);
		
		$.ajax(userTweetRequest);
	}
	
	//List all tweets
	
	function listAll() {
		var allTweetsRequest = new Request();
		allTweetsRequest.type = 'GET';
		allTweetsRequest.url += '/tweets';
		allTweetsRequest.success = function(response) {
			for(var i = 0; i < response.length; i++) {
				var text= '';
				text += '<li>' + response[i].tweet + '</li>';
				text += '<li class="tweet-user"><em>' + response[i].user + '</em></li>';

				$('#all-tweets').append(text);
			}
		};
		allTweetsRequest.error = function(response) {
			$('#all-tweets').append('<li>' + response.responseText + '</li>');
		};


		$.ajax(allTweetsRequest);		
	}
	
	listAll();

	
	// Prevent closing the sign up form on click
	$('.dropdown-menu').click(function(e) {
		 e.stopPropagation();
	});
	
	
	//sign up (and sign in) Request
	$('#signup').on('click', function() {
		
		var usernameInput = $('#username').val();
		var emailInput = $('#email').val();
		var passwordInput = $('#password').val();
		var signUpRequest = new Request();
		var dataPackage = {
			user: {
				username: usernameInput,
				email: emailInput,
				password: passwordInput
			}
		};
		
		signUpRequest.type = 'POST';
		signUpRequest.url += '/users';
		signUpRequest.data = dataPackage;
		signUpRequest.success = function(response) {
			console.log(response);
			
			var signInRequest = new Request();
			var signInDataPackage = {
				user: {
					username: usernameInput,
					password: passwordInput
				}
			};
			signInRequest.type = 'POST';
			signInRequest.url += '/sessions';
			signInRequest.data = signInDataPackage;
			console.log(signInDataPackage);
			signInRequest.success = function(response) {
				$('#signup-dropdown').hide('slow');
				$('#signin-dropdown').hide('slow');
				$('.user-info').show('slow');
				$('#signedin').text("Hello " + usernameInput + ", you are now signed in.")
			};
			signInRequest.error = function(response) {
				$('#sign-up-menu').attr('class', 'has-error');
				$('#sign-up-menu').append('<li>' + response.responseText + '</li>');
			};

			$.ajax(signInRequest);
		
		};
		signUpRequest.error = function(response) {
			$('#sign-up-menu').attr('class', 'has-error');
			$('#sign-up-menu').append('<li>' + response.responseText + '</li>');
		};
		
		$.ajax(signUpRequest);

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
		newRequest.success = function(response) {
			$('#signin-dropdown').hide('slow');
			$('#signup-dropdown').hide('slow');
			$('.user-info').show('slow');
			$('#signedin').text("Hello " + usernameInput + ", you are now signed in.")
			console.log(response);
			console.log(usernameInput);
			getUserTweets(usernameInput);
		};
		newRequest.error = function(response) {
			$('#sign-in-menu').attr('class', 'has-error');
			$('#sign-in-menu').append('<li>' + response.responseText + '</li>');
		};
		
		
		$.ajax(newRequest);

	});
	
	// Search tweets request
	$('#user-search').on('keyup', function() {
		
		var searchInput = $('#user-search').val();
		
		if(!searchInput) {
			$('#all-tweets').html('');
			listAll();
		}
		
		var searchRequest = new Request();
		searchRequest.type = 'GET';
		searchRequest.url += '/tweets/search/' + searchInput;
		searchRequest.success = function(response) {
			console.log(response);
			
			if(response.length) {
				$('#all-tweets').html('');
				for(var i = 0; i < response.length; i++) {
					var text= '';
					text += '<li>' + response[i].tweet + '</li>';
					text += '<li class="tweet-user"><em>' + response[i].user + '</em></li>';

					$('#all-tweets').append(text);

				}
			}
			else {
				$('#all-tweets').html('');
				$('#all-tweets').append("No tweets found.");
			}
		}
		console.log(searchRequest);
		
		$.ajax(searchRequest);
	});
	
	//Post a tweet
	$('#new-tweet').on('click', function() {

		var tweetInput = $('#tweet-input').val();
		var newTweetRequest = new Request();
		var dataPackage = {
			tweet: {
				tweet: tweetInput,
			}
		};

		newTweetRequest.type = 'POST';
		newTweetRequest.url += '/tweets';
		newTweetRequest.data = dataPackage;
		newTweetRequest.success = function(response) {
			console.log(dataPackage);
			$('#newtweet').after('<span>Succesfully Posted</span>').hide(500, function() {
				$(this).remove();
			});
		};
		newTweetRequest.error = function(response) {
			$('#tweet-input').attr('class', 'has-error');
			console.log(response);
		};


		$.ajax(newTweetRequest);

	});
	
	
//sign out request
//	$('#signout').on('click', function() {
//		
//	}
//	
	
	
	//Characters remaining
	$('#tweet-input').on('keyup', function() {
		var currentCharacters = $(this).val().length;
		var remainingCharacters = 140 - currentCharacters;
		$('#characters-remaining').text(remainingCharacters);
	})
	
	
	//Home page reload link
	$('.navbar-brand').on('click', function() {
		location.reload();
	});
		
	
		
		
		
		
		
		
}); // End of (document).ready