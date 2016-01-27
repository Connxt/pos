var Login = (function () {
	var $username = $("#username"),
		$password = $("#password"),
		$frmLogin = $("#frm_login"),
		$errorMessage = $("#error_message");

	var events = (function () {
		var loginValidator = $frmLogin.validate({
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo("div#" + element.attr("name") + "_error")
			},
			rules: {
				username: { required: true },
				password: { required: true }
			},
			messages: {
				username: { required: "Enter your username" },
				password: { required: "Enter your password" }
			},
			submitHandler: function (form) {
				NProgress.start();

				$.post(BASE_URL + CURRENT_CONTROLLER + "/login_user", {
					username: $username.val(),
					password: $password.val()
				}, function (data) {
					if(data != 0) {
						window.location.href = BASE_URL + "login";
					}
					else {
						$errorMessage.empty().append("<p><i class='icon fa fa-ban'></i> Username and password did not match.</p>").fadeIn(1000);
					}
				}).done(function () {
					NProgress.done();
				});
			}
		});

	})();
})();