var Users = (function () {
	var $tblUsers = $("#tbl_users"),
		$dtUsers = $tblUsers.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // User ID
				{ "sClass": "text-left", "sWidth": "20%" }, // Username
				{ "sClass": "text-left", "sWidth": "40%" }, // Name
				{ "sClass": "text-left", "sWidth": "30%" }, // User Level
			]
		}),
		$subDtUsers = $tblUsers.dataTable(),
		$ktUsers = new $.fn.dataTable.KeyTable($subDtUsers),
		ktUsersRowPos = -1,
		ktUsersSelectedRowPos = -1;

	var $btnNewUser = $("#btn_new_user"),
		$btnUpdateUser = $("#btn_update_user"),
		$btnRefreshUserList = $("#btn_refresh_user_list");

	var $modalNewUser = $("#modal_new_user"),
		$modalUpdateUser = $("#modal_update_user");

	var newUser = function () {
		var $frmNewUser = $("#frm_new_user");
		var frmNewUserValidator = $frmNewUser.validate({
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo("div#" + element.attr("name") + "_error");
			},
			rules: {
				last_name_new: { required: true },
				first_name_new: { required: true },
				middle_name_new: { required: true },
				username_new: {
					required: true,
					minlength: 8
				},
				password_new: {
					required: true,
					minlength: 8
				},
				confirm_password_new: {
					required: true,
					equalTo: "#password_new"
				}
			},
			messages: {
				last_name_new: { required: "Please enter the user's last name" },
				first_name_new: { required: "Please enter the user's first name" },
				middle_name_new: { required: "Please enter the user's middle name" },
				username_new: {
					required: "Please enter the user's username",
					minlength: "Username should not be less than 8 characters"
				},
				password_new: {
					required: "Please enter the user's password",
					minlength: "Password should not be less than 8 characters"
				},
				confirm_password_new: {
					required: "Please repeat the user's password",
					equalTo: "Password does not match"
				}
			},
			submitHandler: function (form) {
				NProgress.start();
				$.post(BASE_URL + CURRENT_CONTROLLER + "/username_exists", {
					username: $("#username_new").val()
				}, function (data) {
					if(data == 1) {
						Alerts.showError("Error", "Username already exist.");
					}
					else {
						$.post(BASE_URL + CURRENT_CONTROLLER + "/new_user", {
							username: $("#username_new").val(),
							password: $("#password_new").val(),
							lastName: $("#last_name_new").val(),
							firstName: $("#first_name_new").val(),
							middleName: $("#middle_name_new").val(),
							userLevelId: $("#user_level_new").val()
						}, function (data) {
							var user = JSON.parse(data);

							$dtUsers.row.add([
								user.id,
								user.username,
								user.first_name + " " + user.middle_name + " " + user.last_name,
								user.user_level
							]).draw(false);

							$frmNewUser[0].reset();
							$modalNewUser.modal("hide");

							Alerts.showSuccess("Success", "Successfully added a new user");
						});
					}
				}).done(function () {
					NProgress.done();
				});;
			}
		});

		frmNewUserValidator.resetForm();
		$frmNewUser[0].reset();
		$modalNewUser.modal({ keyboard: true });
	};

	var updateUser = function () {
		if(ktUsersRowPos >= 0) {
			var $frmUpdateUser = $("#frm_update_user"),
				$userIdUpdate = $("#user_id_update"),
				$lastNameUpdate = $("#last_name_update"),
				$firstNameUpdate = $("#first_name_update"),
				$middleNameUpdate = $("#middle_name_update"),
				$userLevelUpdate = $("#user_level_update");

			var frmUpdateUserValidator = $frmUpdateUser.validate({
				errorElement: "div",
				errorPlacement: function (error, element) {
					error.appendTo("div#" + element.attr("name") + "_error");
				},
				rules: {
					last_name_update: { required: true },
					first_name_update: { required: true },
					middle_name_update: { required: true }
				},
				messages: {
					last_name_update: { required: "Please enter the user's last name" },
					first_name_update: { required: "Please enter the user's first name" },
					middle_name_update: { required: "Please enter the user's middle name" }
				},
				submitHandler: function (form) {
					NProgress.start();

					var userId = $userIdUpdate.val();

					$.post(BASE_URL + CURRENT_CONTROLLER + "/update_user", {
						userId: userId,
						lastName: $lastNameUpdate.val(),
						firstName: $firstNameUpdate.val(),
						middleName: $middleNameUpdate.val(),
						userLevelId: $userLevelUpdate.val()
					}, function (data) {
						if(data == 0) {
							$frmUpdateUser[0].reset();
							$modalUpdateUser.modal("hide");
							$subDtUsers.fnDeleteRow($subDtUsers.$("tr", { "filter": "applied" })[ktUsersSelectedRowPos]);

							Alerts.showError("Error!", "Cannot find user ID <b>" + userId + "</b>. The selected user has been deleted by another session.");
						}
						else {
							var user = JSON.parse(data);

							$subDtUsers.fnUpdate([
								user.id,
								user.username,
								user.first_name + " " + user.middle_name + " " + user.last_name,
								user.user_level
							], $subDtUsers.$("tr", { "filter": "applied" })[ktUsersSelectedRowPos]);

							$frmUpdateUser[0].reset();
							$modalUpdateUser.modal("hide");

							Alerts.showSuccess("Success", "Successfully updated the selected user");
						}
					}).done(function () {
						NProgress.done();
					});
				}
			});

			ktUsersSelectedRowPos = ktUsersRowPos;
			var userId = $subDtUsers._("tr", { "filter": "applied" })[ktUsersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/user_exists", {
				userId: userId
			}, function (data) {
				if(data == 0) {
					$subDtUsers.fnDeleteRow($subDtUsers.$("tr", { "filter": "applied" })[ktUsersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find user ID <b>" + userId + "</b>. The selected user has been deleted by another session.");
				}
				else {
					frmUpdateUserValidator.resetForm();
					$frmUpdateUser[0].reset();
					$modalUpdateUser.modal({ keyboard: true });

					NProgress.start();
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_user", {
						userId: userId
					}, function (data) {
						var user = JSON.parse(data);

						$userIdUpdate.val(user.id);
						$lastNameUpdate.val(user.last_name);
						$firstNameUpdate.val(user.first_name);
						$middleNameUpdate.val(user.middle_name);
						$userLevelUpdate.val(user.user_level_id);

					}).done(function () {
						NProgress.done();
					});
				}
			});
		}
	};

	var refreshUserList = function () {
		NProgress.start();

		$dtUsers.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_users", {}, function (data) {
			var users = JSON.parse(data);

			for(var i = 0; i < users.length; i++) {
				$dtUsers.row.add([
					users[i]["id"],
					users[i]["username"],
					users[i]["first_name"] + " " + users[i]["middle_name"] + " " + users[i]["last_name"],
					users[i]["user_level"],
					numeral(0).format("0,0.00")
				]);
			}

			$dtUsers.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var events = (function () {
		refreshUserList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktUsers.fnBlur();
		    $(this).find("input:visible:first").focus();
		});

		$ktUsers.event.focus(null, null, function (node, x, y) {
			$btnUpdateUser.removeClass("disabled");
			ktUsersRowPos = y;
		});

		$ktUsers.event.blur(null, null, function (node, x, y) {
			$btnUpdateUser.addClass("disabled");
			ktUsersRowPos = -1;
		});

		$btnNewUser.click(function () {
			newUser();
		});

		$btnUpdateUser.click(function () {
			updateUser();
		});

		$btnRefreshUserList.click(function () {
			refreshUserList();
		});
	})();
})();