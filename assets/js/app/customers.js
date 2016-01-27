var Customers = (function () {
	var CONFIG = (function () {
		var MODE_OF_PAYMENTS = {
				CASH: "Cash",
				CREDIT_CARD: "Credit Card",
				CREDIT: "Credit"
			},
			PARTICULAR_TYPES = {
				ITEM: "Item",
				SERVICE: "Service"
			};
		return {
			MODE_OF_PAYMENTS: MODE_OF_PAYMENTS,
			PARTICULAR_TYPES: PARTICULAR_TYPES
		};
	})();

	var $tblCustomers = $("#tbl_customers"),
		$dtCustomers = $tblCustomers.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Customer ID
				{ "sClass": "text-left", "sWidth": "25%" }, // Name
				{ "sClass": "text-left", "sWidth": "25%" }, // Address
				{ "sClass": "text-right font-bold", "sWidth": "10%" }, // Total Balance
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Total Purchases
				{ "sClass": "text-left", "sWidth": "15%" } // Status
			]
		}),
		$subDtCustomers = $tblCustomers.dataTable(),
		$ktCustomers = new $.fn.dataTable.KeyTable($subDtCustomers),
		ktCustomersRowPos = -1,
		ktCustomersSelectedRowPos = -1;

	var $tblReceipts = $("#tbl_receipts"),
		$dtReceipts = $tblReceipts.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Receipt ID
				{ "sClass": "text-left", "sWidth": "15%" }, // Date
				{ "sClass": "text-left", "sWidth": "15%" }, // Due Date
				{ "sClass": "text-left", "sWidth": "20%" }, // Mode
				{ "sClass": "text-right font-bold", "sWidth": "10%" }, // Amount
				{ "sClass": "text-right font-bold", "sWidth": "10%" }, // Balance
				{ "sClass": "text-left", "sWidth": "15%" }, // Status
			],
			"order": [ [0, "desc"] ],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "200px"
		}),
		$subDtReceipts = $tblReceipts.dataTable(),
		$ktReceipts = new $.fn.dataTable.KeyTable($subDtReceipts),
		ktReceiptsRowPos = -1,
		ktReceiptsSelectedRowPos = -1;

	var $tblReceipt = $("#tbl_receipt"),
		$dtReceipt = $tblReceipt.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Type
				{ "sClass": "text-left", "sWidth": "10%" }, // Item/Service ID
				{ "sClass": "text-left", "sWidth": "45%" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "5%" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Price
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Total Price
			],
			"order": [ [0, "desc"] ],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "200px"
		}),
		$subDtReceipt = $tblReceipt.dataTable(),
		$ktReceipt = new $.fn.dataTable.KeyTable($subDtReceipt);

	var $tblPayments = $("#tbl_payments"),
		$dtPayments = $tblPayments.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "15%" }, // Payment ID
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Amount Paid
				// { "sClass": "text-right font-bold", "sWidth": "15%" }, // Trade-ins
				{ "sClass": "text-left", "sWidth": "10%" }, // Type Of Payment
				{ "sClass": "text-left", "sWidth": "25%" }, // User
				{ "sClass": "text-left", "sWidth": "15%" }, // Date
			],
			"order": [ [0, "desc"] ],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "200px"
		}),
		$subDtPayments = $tblPayments.dataTable(),
		$ktPayments = new $.fn.dataTable.KeyTable($subDtPayments),
		ktPaymentsRowPos = -1,
		ktPaymentsSelectedRowPos = -1;

	// var $tblTradeIns = $("#tbl_trade_ins"),
	// 	$dtTradeIns = $tblTradeIns.DataTable({
	// 		"columns": [
	// 			{ "sClass": "text-left", "sWidth": "15%" }, // Item ID
	// 			{ "sClass": "text-left", "sWidth": "40%" }, // Description
	// 			{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Quantity
	// 			{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Price
	// 			{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Total Price
	// 		],
	// 		"order": [ [0, "desc"] ],
	// 		"filter": false,
	// 		"paging": false,
	// 		"info": false,
	// 		"scrollY": "200px"
	// 	}),
	// 	$subDtTradeIns = $tblTradeIns.dataTable(),
	// 	$ktTradeIns = new $.fn.dataTable.KeyTable($subDtTradeIns);

	var $btnNewCustomer = $("#btn_new_customer"),
		$btnViewCustomer = $("#btn_view_customer"),
		$btnDeleteCustomer = $("#btn_delete_customer"),
		$btnUpdateCustomer = $("#btn_update_customer"),
		$btnRefreshCustomerList = $("#btn_refresh_customer_list"),
		$btnViewReceipt = $("#btn_view_receipt"),
		$btnViewPayment = $("#btn_view_payment");

	var $customerId = $("#customer_id"),
		$customerName = $("#customer_name"),
		$totalPurchases = $("#total_purchases"),
		$contactInfo = $("#contact_info"),
		$address = $("#address"),
		$totalBalance = $("#total_balance");

	var $receiptId = $("#receipt_id"),
		$receiptDate = $("#receipt_date"),
		$modeOfPayment = $("#mode_of_payment"),
		$dueDate = $("#due_date"),
		$receiptTotalAmount = $("#receipt_total_amount"),
		$receiptBalance = $("#receipt_balance");

	var $paymentId = $("#payment_id"),
		$paymentDate = $("#payment_date"),
		$paymentUser = $("#payment_user"),
		$typeOfPayment = $("#type_of_payment"),
		$amountPaid = $("#amount_paid"),
		$tradeInAmount = $("#trade_in_amount");


	var $modalNewCustomer = $("#modal_new_customer"),
		$modalViewCustomer = $("#modal_view_customer"),
		$modalUpdateCustomer = $("#modal_update_customer"),
		$modalViewReceipt = $("#modal_view_receipt"),
		$modalViewPayment = $("#modal_view_payment");

	var newCustomer = function () {
		var $frmNewCustomer = $("#frm_new_customer");
		var frmNewCustomerValidator = $frmNewCustomer.validate({
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo("div#" + element.attr("name") + "_error");
			},
			rules: {
				last_name_new: { required: true },
				first_name_new: { required: true },
				middle_name_new: { required: true },
				address_new: { required: true },
				contact_info_new: { required: true }
			},
			messages: {
				last_name_new: { required: "Please enter the customer's last name" },
				first_name_new: { required: "Please enter the customer's first name" },
				middle_name_new: { required: "Please enter the customer's middle name" },
				address_new: { required: "Please enter the customer's address" },
				contact_info_new: { required: "Please enter the customer's contact info" }
			},
			submitHandler: function (form) {
				NProgress.start();
				$.post(BASE_URL + CURRENT_CONTROLLER + "/new_customer", {
					lastName: $("#last_name_new").val(),
					firstName: $("#first_name_new").val(),
					middleName: $("#middle_name_new").val(),
					address: $("#address_new").val(),
					contactInfo: $("#contact_info_new").val()
				}, function (data) {
					var customer = JSON.parse(data);

					$dtCustomers.row.add([
						customer.id,
						customer.last_name + ", " + customer.first_name + " " + customer.middle_name.substring(0, 1) + ".",
						customer.address,
						numeral(customer.balance).format("0,0.00"),
						numeral(customer.total_purchases).format("0,0.00"),
						getReceiptStatus(customer.balance, customer.days_left)
					]).draw(false);

					$frmNewCustomer[0].reset();
					$modalNewCustomer.modal("hide");

					Alerts.showSuccess("Success", "Successfully added a new customer");
				}).done(function () {
					NProgress.done();
				});
			}
		});

		frmNewCustomerValidator.resetForm();
		$frmNewCustomer[0].reset();
		$modalNewCustomer.modal({ keyboard: true });
	};

	var getReceiptStatus = function (balance, daysLeft) {
		if(balance <= 0) {
			return "<span class='label label-default'>Fully Paid</span>";
		}
		else {
			if(daysLeft < 0) {
				return "<span class='label label-danger'>Overdue: " + (daysLeft * -1) + " days</span>";
			}
			else {
				return "<span class='label label-warning'>" + (daysLeft * 1) + " days left</span>";
			}
		}
	};

	var viewCustomer = function () {
		if(ktCustomersRowPos >= 0) {
			ktCustomersSelectedRowPos = ktCustomersRowPos;
			var customerId = $subDtCustomers._("tr", { "filter": "applied" })[ktCustomersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/customer_exists", {
				customerId: customerId
			}, function (data) {
				if(data == 0) {
					$subDtCustomers.fnDeleteRow($subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find customer ID <b>" + customerId + "</b>. The selected customer has been deleted by another session.");
				}
				else {
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_customer", {
						customerId: customerId
					}, function (data) {
						var customer = JSON.parse(data);

						$customerId.text(customer.id);
						$customerName.text(customer.first_name + " " + customer.middle_name + " " + customer.last_name);
						$totalPurchases.text(numeral(customer.total_purchases).format("0,0.00"));
						$contactInfo.text(customer.contact_info);
						$address.text(customer.address);
						$totalBalance.text(numeral(customer.balance).format("0,0.00"));

						$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipts_via_customer_id", {
							customerId: customerId
						}, function (data) {
							var receipts = JSON.parse(data);

							$dtReceipts.clear().draw();
							for(var i = 0; i < receipts.length; i++) {
								$dtReceipts.row.add([
									receipts[i]["id"],
									moment(receipts[i]["created_at"]).format("MMM DD, YYYY"),
									moment(receipts[i]["due_date"]).format("MMM DD, YYYY"),
									receipts[i]["mode_of_payment"],
									numeral(receipts[i]["total_amount"]).format("0,0.00"),
									numeral(receipts[i]["balance"]).format("0,0.00"),
									getReceiptStatus(receipts[i]["balance"], receipts[i]["days_left"])
								]);
							}
							$dtReceipts.draw();
							$modalViewCustomer.modal({ keyboard: true });
						});
					});
				}
			});
		}
	};

	var deleteCustomer = function () {
		if(ktCustomersRowPos >= 0) {
			ktCustomersSelectedRowPos = ktCustomersRowPos;
			var customerId = $subDtCustomers._("tr", { "filter": "applied" })[ktCustomersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/customer_exists", {
				customerId: customerId
			}, function (data) {
				if(data == 0) {
					$subDtCustomers.fnDeleteRow($subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find customer ID <b>" + customerId + "</b>. The selected customer has been deleted by another session.");
				}
				else {
					Alerts.showConfirm("Warning!", "Are you sure you want to delete this customer?", function () {
						$.post(BASE_URL + CURRENT_CONTROLLER + "/delete_customer", {
							customerId: customerId
						}, function (data) {
							if(data == -1) {
								Alerts.showError("Error!", "Unable to delete customer ID <b>" + customerId + "</b>. The selected customer has already done a transaction.");
							}
							else if(data == 0) {
								$subDtCustomers.fnDeleteRow($subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);
								Alerts.showError("Error!", "Cannot find customer ID <b>" + customerId + "</b>. The selected customer has been deleted by another session.");
							}
							else {
								$subDtCustomers.fnDeleteRow($subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);
								Alerts.showSuccess("Success", "Customer ID <b>" + customerId + "</b> has successfully been deleted.");
							}
						});
					});
				}
			});
		}
	};

	var updateCustomer = function () {
		if(ktCustomersRowPos >= 0) {
			var $frmUpdateCustomer = $("#frm_update_customer"),
				$customerIdUpdate = $("#customer_id_update"),
				$lastNameUpdate = $("#last_name_update"),
				$firstNameUpdate = $("#first_name_update"),
				$middleNameUpdate = $("#middle_name_update"),
				$addressUpdate = $("#address_update"),
				$contactInfoUpdate = $("#contact_info_update");

			var frmUpdateCustomerValidator = $frmUpdateCustomer.validate({
				errorElement: "div",
				errorPlacement: function (error, element) {
					error.appendTo("div#" + element.attr("name") + "_error");
				},
				rules: {
					last_name_update: { required: true },
					first_name_update: { required: true },
					middle_name_update: { required: true },
					address_update: { required: true },
					contact_info_update: { required: true }
				},
				messages: {
					last_name_update: { required: "Please enter the customer's last name" },
					first_name_update: { required: "Please enter the customer's first name" },
					middle_name_update: { required: "Please enter the customer's middle name" },
					address_update: { required: "Please enter the customer's address" },
					contact_info_update: { required: "Please enter the customer's contact info" }
				},
				submitHandler: function (form) {
					NProgress.start();

					var customerId = $customerIdUpdate.val();

					$.post(BASE_URL + CURRENT_CONTROLLER + "/update_customer", {
						customerId: customerId,
						lastName: $lastNameUpdate.val(),
						firstName: $firstNameUpdate.val(),
						middleName: $middleNameUpdate.val(),
						address: $addressUpdate.val(),
						contactInfo: $contactInfoUpdate.val()
					}, function (data) {
						if(data == 0) {
							$frmUpdateCustomer[0].reset();
							$modalUpdateCustomer.modal("hide");
							$subDtCustomers.fnDeleteRow($subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);

							Alerts.showError("Error!", "Cannot find customer ID <b>" + customerId + "</b>. The selected customer has been deleted by another session.");
						}
						else {
							var customer = JSON.parse(data);
							
							$subDtCustomers.fnUpdate([
								customer.id,
								customer.last_name + ", " + customer.first_name + " " + customer.middle_name.substring(0, 1) + ".",
								customer.address,
								numeral(customer.balance).format("0,0.00"),
								numeral(customer.total_purchases).format("0,0.00"),
								getReceiptStatus(customer.balance, customer.days_left)
							], $subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);

							$frmUpdateCustomer[0].reset();
							$modalUpdateCustomer.modal("hide");

							Alerts.showSuccess("Success", "Successfully updated the selected customer");
						}
					}).done(function () {
						NProgress.done();
					});
				}
			});

			ktCustomersSelectedRowPos = ktCustomersRowPos;
			var customerId = $subDtCustomers._("tr", { "filter": "applied" })[ktCustomersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/customer_exists", {
				customerId: customerId
			}, function (data) {
				if(data == 0) {
					$subDtCustomers.fnDeleteRow($subDtCustomers.$("tr", { "filter": "applied" })[ktCustomersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find customer ID <b>" + customerId + "</b>. The selected customer has been deleted by another session.");
				}
				else {
					frmUpdateCustomerValidator.resetForm();
					$frmUpdateCustomer[0].reset();
					$modalUpdateCustomer.modal({ keyboard: true });

					NProgress.start();
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_customer", {
						customerId: customerId
					}, function (data) {
						var customer = JSON.parse(data);

						$customerIdUpdate.val(customer.id);
						$lastNameUpdate.val(customer.last_name);
						$firstNameUpdate.val(customer.first_name);
						$middleNameUpdate.val(customer.middle_name);
						$addressUpdate.val(customer.address);
						$contactInfoUpdate.val(customer.contact_info);

					}).done(function () {
						NProgress.done();
					});
				}
			});
		}
	};

	var refreshCustomerList = function () {
		NProgress.start();

		$dtCustomers.clear().draw();
		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_customers", {}, function (data) {
			var customers = JSON.parse(data);

			for(var i = 0; i < customers.length; i++) {
				$dtCustomers.row.add([
					customers[i]["id"],
					customers[i]["last_name"] + ", " + customers[i]["first_name"] + " " + customers[i]["middle_name"].substring(0, 1) + ".",
					customers[i]["address"],
					numeral(customers[i]["balance"]).format("0,0.00"),
					numeral(customers[i]["total_purchases"]).format("0,0.00"),
					getReceiptStatus(customers[i]["balance"], customers[i]["days_left"])
				]);
			}

			$dtCustomers.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var viewReceipt = function () {
		if(ktReceiptsRowPos >= 0) {
			ktReceiptsSelectedRowPos = ktReceiptsRowPos;
			var receiptId = $subDtReceipts._("tr", { "filter": "applied" })[ktReceiptsSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipt", {
				receiptId: receiptId
			}, function (data) {
				var receipt = JSON.parse(data);

				$receiptId.text(receipt.id),
				$receiptDate.text(moment(receipt.created_at).format("MMM DD, YYYY"));
				$modeOfPayment.text(receipt.mode_of_payment);
				$dueDate.text((receipt.mode_of_payment == CONFIG.MODE_OF_PAYMENTS.CREDIT) ? moment(receipt.due_date).format("MMM DD, YYYY") : "N/A");
				$receiptTotalAmount.text(numeral(receipt.total_amount).format("0,0.00"));
				$receiptBalance.text(numeral(receipt.balance).format("0,0.00"));
			});

			$dtReceipt.clear().draw();
			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipt_services", {
				receiptId: receiptId
			}, function (data) {
				var receiptServices = JSON.parse(data);

				for(var i = 0; i < receiptServices.length; i++) {
					$dtReceipt.row.add([
						CONFIG.PARTICULAR_TYPES.SERVICE,
						receiptServices[i]["service_id"],
						receiptServices[i]["description"],
						1,
						numeral(receiptServices[i]["selling_price"]).format("0,0.00"),
						numeral(parseFloat(receiptServices[i]["selling_price"])).format("0,0.00")
					]);
				}

				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipt_items", {
					receiptId: receiptId
				}, function (data) {
					var receiptItems = JSON.parse(data);

					for(var i = 0; i < receiptItems.length; i++) {
						$dtReceipt.row.add([
							CONFIG.PARTICULAR_TYPES.ITEM,
							receiptItems[i]["item_id"],
							receiptItems[i]["description"],
							receiptItems[i]["quantity"],
							numeral(receiptItems[i]["selling_price"]).format("0,0.00"),
							numeral(parseFloat(receiptItems[i]["quantity"]) * parseFloat(receiptItems[i]["selling_price"])).format("0,0.00")
						]);
					}
				});
			});
	
			$dtPayments.clear().draw();
			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_payments_via_receipt_id", {
				receiptId: receiptId
			}, function (data) {
				var payments = JSON.parse(data);

				for(var i = 0; i < payments.length; i++) {
					$dtPayments.row.add([
						payments[i]["id"],
						numeral(payments[i]["amount_paid"]).format("0,0.00"),
						// numeral(payments[i]["trade_in_amount"]).format("0,0.00"),
						payments[i]["type_of_payment"],
						payments[i]["user_first_name"] + " " + payments[i]["user_middle_name"] + " " + payments[i]["user_last_name"],
						moment(payments[i]["created_at"]).format("MMM DD, YYYY")
					]);
				}
			});

			$modalViewReceipt.modal({ keyboard: true });
		}
	};

	var viewPayment = function () {
		if(ktPaymentsRowPos >= 0) {
			ktPaymentsSelectedRowPos = ktPaymentsRowPos;
			var paymentId = $subDtPayments._("tr", { "filter": "applied" })[ktPaymentsSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_payment", {
				paymentId: paymentId
			}, function (data) {
				var payment = JSON.parse(data);

				$paymentId.text(payment.id),
				$paymentDate.text(moment(payment.created_at).format("MMM DD, YYYY"));
				$paymentUser.text(payment.user_first_name + " " + payment.user_middle_name + " " + payment.user_last_name);
				$typeOfPayment.text(payment.type_of_payment);
				$amountPaid.text(numeral(payment.amount_paid).format("0,0.00"));
				// $tradeInAmount.text(numeral(payment.trade_in_amount).format("0,0.00"));
			});

			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_trade_ins_via_payment_id", {
				paymentId: paymentId
			}, function (data) {
				var tradeIns = JSON.parse(data);

				// $dtTradeIns.clear().draw();
				// for(var i = 0; i < tradeIns.length; i++) {
				// 	$dtTradeIns.row.add([
				// 		tradeIns[i]["item_id"],
				// 		tradeIns[i]["description"],
				// 		tradeIns[i]["quantity"],
				// 		numeral(tradeIns[i]["price"]).format("0,0.00"),
				// 		numeral(parseFloat(tradeIns[i]["quantity"]) * parseFloat(tradeIns[i]["price"])).format("0,0.00")
				// 	]);
				// }

				// $dtTradeIns.draw();
				$modalViewPayment.modal({ keyboard: true });
			});
		}
	};

	var events = (function () {
		refreshCustomerList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktCustomers.fnBlur();
		    $(this).find("input:visible:first").focus();

		    if($(this).attr("id") == $modalViewCustomer.attr("id")) {
		    	$dtReceipts.draw();
		    }
		    else if($(this).attr("id") == $modalViewReceipt.attr("id")) {
		    	$dtReceipt.draw();
		    	$dtPayments.draw();
		    }
		    else if($(this).attr("id") == $modalViewPayment.attr("id")) {
		    	// $dtTradeIns.draw();
		    }
		});

		$ktCustomers.event.focus(null, null, function (node, x, y) {
			$btnViewCustomer.removeClass("disabled");
			$btnDeleteCustomer.removeClass("disabled");
			$btnUpdateCustomer.removeClass("disabled");
			ktCustomersRowPos = y;
		});

		$ktCustomers.event.blur(null, null, function (node, x, y) {
			$btnViewCustomer.addClass("disabled");
			$btnDeleteCustomer.addClass("disabled");
			$btnUpdateCustomer.addClass("disabled");
			ktCustomersRowPos = -1;
		});

		$ktReceipts.event.focus(null, null, function (node, x, y) {
			$btnViewReceipt.removeClass("disabled");
			ktReceiptsRowPos = y;
		});

		$ktReceipts.event.blur(null, null, function (node, x, y) {
			$btnViewReceipt.addClass("disabled");
			ktReceiptsRowPos = -1;
		});

		$ktPayments.event.focus(null, null, function (node, x, y) {
			$btnViewPayment.removeClass("disabled");
			ktPaymentsRowPos = y;
		});

		$ktPayments.event.blur(null, null, function (node, x, y) {
			$btnViewPayment.addClass("disabled");
			ktPaymentsRowPos = -1;
		});

		$btnNewCustomer.click(function () {
			newCustomer();
		});

		$btnViewCustomer.click(function () {
			viewCustomer();
		});

		$btnDeleteCustomer.click(function () {
			deleteCustomer();
		});

		$btnUpdateCustomer.click(function () {
			updateCustomer();
		});

		$btnRefreshCustomerList.click(function () {
			refreshCustomerList();
		});

		$btnViewReceipt.click(function () {
			viewReceipt();
		});

		$btnViewPayment.click(function () {
			viewPayment();
		});
	})();
})();