$(document).ready(function() {

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
			console.log(response);
		};			
		
		$.ajax(newRequest);
		
		
		
	});
		
		
		
		
		
		
		
		
}); // End of (document).ready