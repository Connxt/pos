var Services = (function () {
	var $tblServices = $("#tbl_services"),
		$dtServices = $tblServices.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "15%" }, // Service ID
				{ "sClass": "text-left", "sWidth": "65%" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Selling Price Cash
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Selling Price Credit Card
				{ "sClass": "text-right font-bold", "sWidth": "20%" } // Selling Price Credit
			],
			"columnDefs": [{
				"targets": [3, 4],
				"visible": false
			}]
		}),
		$subDtServices = $tblServices.dataTable(),
		$ktServices = new $.fn.dataTable.KeyTable($subDtServices),
		ktServicesRowPos = -1,
		ktServicesSelectedRowPos = -1;

	var $btnNewService = $("#btn_new_service"),
		$btnDeleteService = $("#btn_delete_service"),
		$btnUpdateService = $("#btn_update_service"),
		$btnRefreshServiceList = $("#btn_refresh_service_list"),
		$toggleSellingPrice = $("a.toggle-selling-price");

	var $modalNewService = $("#modal_new_service"),
		$modalUpdateService = $("#modal_update_service");

	var newService = function () {
		var $frmNewService = $("#frm_new_service");
		var frmNewServiceValidator = $frmNewService.validate({
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo("div#" + element.attr("name") + "_error");
			},
			rules: {
				service_id_new: { required: true },
				description_new: { required: true },
				selling_price_cash_new: { required: true, number: true, min: 1 },
				selling_price_credit_card_new: { required: true, number: true, min: 1 },
				selling_price_credit_new: { required: true, number: true, min: 1 }
			},
			messages: {
				service_id_new: {
					required: "Please enter the service's ID"
				},
				description_new: {
					required: "Please enter the service's description"
				},
				selling_price_cash_new: {
					required: "Please enter the service's selling price",
					number: "Please enter a valid price",
					min: "Selling price should not be less than 1.00"
				},
				selling_price_credit_card_new: {
					required: "Please enter the service's selling price",
					number: "Please enter a valid price",
					min: "Selling price should not be less than 1.00"
				},
				selling_price_credit_new: {
					required: "Please enter the service's selling price",
					number: "Please enter a valid price",
					min: "Selling price should not be less than 1.00"
				}
			},
			submitHandler: function (form) {
				NProgress.start();
				$.post(BASE_URL + CURRENT_CONTROLLER + "/new_service", {
					serviceId: $("#service_id_new").val(),
					description: $("#description_new").val(),
					sellingPriceCash: $("#selling_price_cash_new").val(),
					sellingPriceCreditCard: $("#selling_price_credit_card_new").val(),
					sellingPriceCredit: $("#selling_price_credit_new").val()
				}, function (data) {
					if(data == 0) {
						$modalNewService.modal("hide");
						Alerts.showError("Error!", "Service ID <b>" + $("#service_id_new").val() + "</b> is already in use.", function () {
							$modalNewService.modal({ keyboard: true });
						});
					}
					else {
						var service = JSON.parse(data);

						$dtServices.row.add([
							service.id,
							service.description,
							numeral(service.selling_price_cash).format("0,0.00"),
							numeral(service.selling_price_credit_card).format("0,0.00"),
							numeral(service.selling_price_credit).format("0,0.00")
						]).draw(false);

						$frmNewService[0].reset();
						$modalNewService.modal("hide");

						Alerts.showSuccess("Success", "Successfully added a new service");
					}
				}).done(function () {
					NProgress.done();
				});
			}
		});

		frmNewServiceValidator.resetForm();
		$frmNewService[0].reset();
		$modalNewService.modal({ keyboard: true });
	};

	var updateService = function () {
		if(ktServicesRowPos >= 0) {
			var $frmUpdateService = $("#frm_update_service"),
				$serviceIdUpdate = $("#service_id_update"),
				$descriptionUpdate = $("#description_update"),
				$sellingPriceCashUpdate = $("#selling_price_cash_update"),
				$sellingPriceCreditCardUpdate = $("#selling_price_credit_card_update"),
				$sellingPriceCreditUpdate = $("#selling_price_credit_update");

			var frmUpdateServiceValidator = $frmUpdateService.validate({
				errorElement: "div",
				errorPlacement: function (error, element) {
					error.appendTo("div#" + element.attr("name") + "_error");
				},
				rules: {
					description_update: { required: true },
					selling_price_cash_update: { required: true, number: true, min: 1 },
					selling_price_credit_card_update: { required: true, number: true, min: 1 },
					selling_price_credit_update: { required: true, number: true, min: 1 }
				},
				messages: {
					description_update: {
						required: "Please enter the service's description"
					},
					selling_price_cash_update: {
						required: "Please enter the service's selling price",
						number: "Please enter a valid price",
						min: "Selling price should not be less than 1.00"
					},
					selling_price_credit_card_update: {
						required: "Please enter the service's selling price",
						number: "Please enter a valid price",
						min: "Selling price should not be less than 1.00"
					},
					selling_price_credit_update: {
						required: "Please enter the service's selling price",
						number: "Please enter a valid price",
						min: "Selling price should not be less than 1.00"
					}
				},
				submitHandler: function (form) {
					NProgress.start();

					var serviceId = $serviceIdUpdate.val();

					$.post(BASE_URL + CURRENT_CONTROLLER + "/update_service", {
						serviceId: serviceId,
						description: $descriptionUpdate.val(),
						sellingPriceCash: $sellingPriceCashUpdate.val(),
						sellingPriceCreditCard: $sellingPriceCreditCardUpdate.val(),
						sellingPriceCredit: $sellingPriceCreditUpdate.val()
					}, function (data) {
						if(data == 0) {
							$frmUpdateService[0].reset();
							$modalUpdateService.modal("hide");
							$subDtServices.fnDeleteRow($subDtServices.$("tr", { "filter": "applied" })[ktServicesSelectedRowPos]);

							Alerts.showError("Error!", "Cannot find service ID <b>" + serviceId + "</b>. The selected service has been deleted by another session.");
						}
						else {
							var service = JSON.parse(data);

							$subDtServices.fnUpdate([
								service.id,
								service.description,
								numeral(service.selling_price_cash).format("0,0.00"),
								numeral(service.selling_price_credit_card).format("0,0.00"),
								numeral(service.selling_price_credit).format("0,0.00")
							], $subDtServices.$("tr", { "filter": "applied" })[ktServicesSelectedRowPos]);

							$frmUpdateService[0].reset();
							$modalUpdateService.modal("hide");

							Alerts.showSuccess("Success", "Successfully updated the selected service");
						}
					}).done(function () {
						NProgress.done();
					});
				}
			});

			ktServicesSelectedRowPos = ktServicesRowPos;
			var serviceId = $subDtServices._("tr", { "filter": "applied" })[ktServicesSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/service_exists", {
				serviceId: serviceId
			}, function (data) {
				if(data == 0) {
					$subDtServices.fnDeleteRow($subDtServices.$("tr", { "filter": "applied" })[ktServicesSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find service ID <b>" + serviceId + "</b>. The selected service has been deleted by another session.");
				}
				else {
					frmUpdateServiceValidator.resetForm();
					$frmUpdateService[0].reset();
					$modalUpdateService.modal({ keyboard: true });

					NProgress.start();
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_service", {
						serviceId: serviceId
					}, function (data) {
						var service = JSON.parse(data);

						$serviceIdUpdate.val(service.id);
						$descriptionUpdate.val(service.description);
						$sellingPriceCashUpdate.val(service.selling_price_cash);
						$sellingPriceCreditCardUpdate.val(service.selling_price_credit_card);
						$sellingPriceCreditUpdate.val(service.selling_price_credit);
					}).done(function () {
						NProgress.done();
					});
				}
			});
		}
	};

	var deleteService = function () {
		if(ktServicesRowPos >= 0) {
			ktServicesSelectedRowPos = ktServicesRowPos;
			var serviceId = $subDtServices._("tr", { "filter": "applied" })[ktServicesSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/service_exists", {
				serviceId: serviceId
			}, function (data) {
				if(data == 0) {
					$subDtServices.fnDeleteRow($subDtServices.$("tr", { "filter": "applied" })[ktServicesSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find service ID <b>" + serviceId + "</b>. The selected service has been deleted by another session.");
				}
				else {
					Alerts.showConfirm("Warning!", "Are you sure you want to delete this service?", function () {
						$.post(BASE_URL + CURRENT_CONTROLLER + "/delete_service", {
							serviceId: serviceId
						}, function (data) {
							if(data == -1) {
								Alerts.showError("Error!", "Unable to delete service ID <b>" + serviceId + "</b>. The selected service has already been used in a transaction.");
							}
							else if(data == 0) {
								$subDtServices.fnDeleteRow($subDtServices.$("tr", { "filter": "applied" })[ktServicesSelectedRowPos]);
								Alerts.showError("Error!", "Cannot find service ID <b>" + serviceId + "</b>. The selected service has been deleted by another session.");
							}
							else {
								$subDtServices.fnDeleteRow($subDtServices.$("tr", { "filter": "applied" })[ktServicesSelectedRowPos]);
								Alerts.showSuccess("Success", "Service ID <b>" + serviceId + "</b> has successfully been deleted.");
							}
						});
					});
				}
			});
		}
	};

	var refreshServiceList = function () {
		NProgress.start();

		$dtServices.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_services", {}, function (data) {
			var services = JSON.parse(data);

			for(var i = 0; i < services.length; i++) {
				$dtServices.row.add([
					services[i]["id"],
					services[i]["description"],
					numeral(services[i]["selling_price_cash"]).format("0,0.00"),
					numeral(services[i]["selling_price_credit_card"]).format("0,0.00"),
					numeral(services[i]["selling_price_credit"]).format("0,0.00")
				]);
			}

			$dtServices.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var events = (function () {
		refreshServiceList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktServices.fnBlur();
		    $(this).find("input:visible:first").focus();
		});

		$ktServices.event.focus(null, null, function (node, x, y) {
			$btnDeleteService.removeClass("disabled");
			$btnUpdateService.removeClass("disabled");
			ktServicesRowPos = y;
		});

		$ktServices.event.blur(null, null, function (node, x, y) {
			$btnDeleteService.addClass("disabled");
			$btnUpdateService.addClass("disabled");
			ktServicesRowPos = -1;
		});

		$btnNewService.click(function () {
			newService();
		});

		$btnUpdateService.click(function () {
			updateService();
		});

		$btnDeleteService.click(function () {
			deleteService();
		});

		$btnRefreshServiceList.click(function () {
			refreshServiceList();
		});

		$toggleSellingPrice.click(function () {
			NProgress.start();

			var columns = [];
			$toggleSellingPrice.each(function () {
				columns.push($(this).attr("data-column"));
			});

			var columnToBeVisible = $(this).attr("data-column");
			columns.splice(columns.indexOf(columnToBeVisible), 1);
			var columnsToBeInvisible = columns;

			$dtServices.column(columnToBeVisible).visible(true);
			for(var i = 0; i < columnsToBeInvisible.length; i++) {
				$dtServices.column(columnsToBeInvisible[i]).visible(false);
			}

			NProgress.done();
		});
	})();
})();