var Alerts = (function () {
	var showWarning = function (title, message, callback) {
		sweetAlert({
			title: title,
			text: message,
			type: "warning",
			html: true
		}, callback);
	};

	var showSuccess = function (title, message, callback) {
		sweetAlert({
			title: title,
			text: message,
			type: "success",
			html: true
		}, callback);
	};

	var showError = function (title, message, callback) {
		sweetAlert({
			title: title,
			text: message,
			type: "error",
			html: true
		}, callback);
	}

	var showConfirm = function (title, message, callback) {
		sweetAlert({
			title: title,
			text: message,
			type: "warning",
			html: true,
			showCancelButton: true,
			confirmButtonText: "Yes",
			closeOnConfirm: false
		}, callback);
	}

	return {
		showWarning: showWarning,
		showSuccess: showSuccess,
		showError: showError,
		showConfirm: showConfirm
	}
})();