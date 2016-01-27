var Cashiering = (function () {
	var CONFIG = (function () {
		var SEARCH_PANELS = {
				ITEM: 1,
				SERVICE: 2
			},
			SEARCH_PANEL_LABELS = {
				ITEM: "Item",
				SERVICE: "Service"
			},
			MODES_OF_PAYMENT = {
				NONE: 0,
				CASH: 1,
				CREDIT_CARD: 2,
				CREDIT: 3
			},
			PARTICULAR_TYPES = {
				ITEM: "Item",
				SERVICE: "Service"
			};

		return {
			SEARCH_PANELS: SEARCH_PANELS,
			SEARCH_PANEL_LABELS: SEARCH_PANEL_LABELS,
			MODES_OF_PAYMENT: MODES_OF_PAYMENT,
			DEFAULT_SEARCH_PANEL: SEARCH_PANELS.ITEM,
			PARTICULAR_TYPES: PARTICULAR_TYPES,
			DEFAULT_CUSTOMER_ID: 1
		};
	})();

	var myModeOfPayment = CONFIG.MODES_OF_PAYMENT.NONE;

	var $tblReceipt = $("#tbl_receipt"),
		$dtReceipt = $tblReceipt.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Type
				{ "sClass": "text-left", "sWidth": "10%" }, // ID
				{ "sClass": "text-left", "sWidth": "45%" }, // Description
				{ "sClass": "text-right font-bold editable quantity", "sWidth": "5%" }, // Quantity
				{ "sClass": "text-right font-bold editable price", "sWidth": "15%" }, // Price
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Total Price
				{ "sWidth": "0%", "bSortable": false } // Actual Price
			],
			"sorting": [],
			"columnDefs": [{
				"targets": [6],
				"visible": false,
				"searchable": false
			}],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "500px"
		}),
		$subDtReceipt = $tblReceipt.dataTable(),
		$ktReceipt = new $.fn.dataTable.KeyTable($subDtReceipt),
		ktReceiptRowPos = -1,
		ktReceiptSelectedRowPos = -1;

	var $tblItems = $("#tbl_items"),
		$dtItems = $tblItems.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "5em" }, // ID
				{ "sClass": "text-left", "sWidth": "15em" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "2em" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Price
			],
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtItems = $tblItems.dataTable(),
		$ktItems = new $.fn.dataTable.KeyTable($subDtItems);

	var $tblServices = $("#tbl_services"),
		$dtServices = $tblServices.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "5em" }, // ID
				{ "sClass": "text-left", "sWidth": "20em" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Price
			],
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtServices = $tblServices.dataTable(),
		$ktServices = new $.fn.dataTable.KeyTable($subDtServices);

	var $tblCustomers = $("#tbl_customers"),
		$dtCustomers = $tblCustomers.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "5em" }, // ID
				{ "sClass": "text-left", "sWidth": "20em" }, // Name
				{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Balance
			],
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtCustomers = $tblCustomers.dataTable(),
		$ktCustomers = new $.fn.dataTable.KeyTable($subDtCustomers);

	var $tblTradeIns = $("#tbl_trade_ins"),
		$dtTradeIns = $tblTradeIns.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "4em" }, // Item ID
				{ "sClass": "text-left", "sWidth": "25em" }, // Description
				{ "sClass": "text-right font-bold editable quantity", "sWidth": "2em" }, // Quantity
				{ "sClass": "text-right font-bold editable price", "sWidth": "5em" }, // Price
				{ "sClass": "text-right font-bold", "sWidth": "5em" } // Total Price
			],
			"sorting": [],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtTradeIns = $tblTradeIns.dataTable(),
		$ktTradeIns = new $.fn.dataTable.KeyTable($subDtTradeIns),
		ktTradeInsRowPos = -1,
		ktTradeInsSelectedRowPos = -1;

	var $tblTradeInsSearchItem = $("#tbl_trade_ins_search_item"),
		$dtTradeInsSearchItem = $tblTradeInsSearchItem.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "5em" }, // ID
				{ "sClass": "text-left", "sWidth": "15em" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "2em" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Price
			],
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtTradeInsSearchItem = $tblTradeInsSearchItem.dataTable(),
		$ktTradeInsSearchItem = new $.fn.dataTable.KeyTable($subDtTradeInsSearchItem);

	var $btnToggleSearchPanel = $("#btn_toggle_search_panel"),
		$searchPanelLabel = $("#search_panel_label"),
		$itemSearchPanel = $("#item_search_panel"),
		$serviceSearchPanel = $("#service_search_panel");

	var	$itemId = $("#item_id"),
		$itemDescription = $("#item_description"),
		$itemQuantity = $("#item_quantity"),
		$btnAddItem = $("#btn_add_item"),
		$btnSearchItem = $("#btn_search_item");

	var	$serviceId = $("#service_id"),
		$serviceDescription = $("#service_description")
		$btnAddService = $("#btn_add_service"),
		$btnSearchService = $("#btn_search_service");

	var $customerId = $("#customer_id"),
		$customerName = $("#customer_name"),
		$btnNewCustomer = $("#btn_new_customer"),
		$btnSearchCustomer = $("#btn_search_customer");

	var $tradeInsItemId = $("#trade_ins_item_id"),
		$tradeInsItemDescription = $("#trade_ins_item_description"),
		$tradeInsItemQuantity = $("#trade_ins_item_quantity"),
		$totalTradeInAmount = $("#total_trade_in_amount"),
		$btnAddTradeInItem = $("#btn_add_trade_in_item"),
		$btnRemoveTradeInItem = $("#btn_remove_trade_in_item"),
		$btnTradeInsSearchItem = $("#btn_trade_ins_search_item");

	var $grandTotal = $("#grand_total"),
		$amountToPay = $("#amount_to_pay"),
		$amountRendered = $("#amount_rendered"),
		$tradeInAmount = $("#trade_in_amount"),
		$change = $("#change");

	var $btnAddTradeInItems = $("#btn_add_trade_in_items"),
		$btnSaveTransaction = $("#btn_save_transaction"),
		$btnCloseTransaction = $("#btn_close_transaction"),
		$btnNewCashTransaction = $("#btn_new_cash_transaction"),
		$btnNewCreditCardTransaction = $("#btn_new_credit_card_transaction"),
		$btnNewCreditTransaction = $("#btn_new_credit_transaction"),
		$btnShowHelp = $("#btn_show_help");

	var $modalSearchItem = $("#modal_search_item"),
		$modalSearchService = $("#modal_search_service"),
		$modalNewCustomer = $("#modal_new_customer"),
		$modalSearchCustomer = $("#modal_search_customer"),
		$modalTradeIns = $("#modal_trade_ins"),
		$modalTradeInsSearchItem = $("#modal_trade_ins_search_item"),
		$modalHelp = $("#modal_help");


	var toggleSearchPanelToDefault = function () {
		if(CONFIG.DEFAULT_SEARCH_PANEL == CONFIG.SEARCH_PANELS.ITEM) {
			$serviceSearchPanel.hide();

			$itemSearchPanel.show();
			$itemId.focus();
			$searchPanelLabel.text(CONFIG.SEARCH_PANEL_LABELS.ITEM);
		}
		else {
			$itemSearchPanel.hide();

			$serviceSearchPanel.show();
			$serviceId.focus();
			$searchPanelLabel.text(CONFIG.SEARCH_PANEL_LABELS.SERVICE);
		}
	};

	var toggleSearchPanel = function () {
		if($itemSearchPanel.css("display") == "none") {
			$serviceSearchPanel.hide();
			$itemSearchPanel.show();
			$itemId.focus();
			$searchPanelLabel.text(CONFIG.SEARCH_PANEL_LABELS.ITEM);
		}
		else {
			$itemSearchPanel.hide();
			$serviceSearchPanel.show();
			$serviceId.focus();
			$searchPanelLabel.text(CONFIG.SEARCH_PANEL_LABELS.SERVICE);
		}
	};

	var addEditableFunctionalityToReceipt = function () {
		$("#tbl_receipt tbody td.editable").each(function () {
			$ktReceipt.event.remove.action(this);
			$ktReceipt.event.action(this, function (nCell) {
				ktReceiptSelectedRowPos = ktReceiptRowPos;
				$ktReceipt.block = true;

				$(nCell).editable(function (val) {
					$ktReceipt.block = false;

					if($(this).hasClass("quantity")) {
						var editedQuantity = isNaN(parseInt(val)) ? 0 : parseInt(val);

						var row = $dtReceipt.row(ktReceiptSelectedRowPos),
							type = row.data()[0],
							id = row.data()[1],
							description = row.data()[2],
							quantity = parseInt(row.data()[3]),
							price = parseFloat(row.data()[4]),
							actualPrice = row.data()[5];

						if(type == CONFIG.PARTICULAR_TYPES.ITEM) {
							if(editedQuantity <= 0) {
								editedQuantity = quantity;
							}
						}
						else if(type == CONFIG.PARTICULAR_TYPES.SERVICE) {
							editedQuantity = 1;
						}

						val = editedQuantity;

						row.data([
							type,
							id,
							description,
							editedQuantity,
							numeral(price).format("0.00"),
							numeral(editedQuantity * price).format("0.00"),
							actualPrice
						]).draw(false);
					}
					else if($(this).hasClass("price")) {
						var editedPrice = isNaN(parseFloat(val)) ? 0 : parseFloat(val);

						var row = $dtReceipt.row(ktReceiptSelectedRowPos),
							type = row.data()[0],
							id = row.data()[1],
							description = row.data()[2],
							quantity = parseInt(row.data()[3]),
							price = parseFloat(row.data()[4]),
							actualPrice = row.data()[5];

						if(editedPrice <= 0) {
							editedPrice = price;
						}

						val = numeral(editedPrice).format("0.00");

						row.data([
							type,
							id,
							description,
							quantity,
							numeral(editedPrice).format("0.00"),
							numeral(quantity * editedPrice).format("0.00"),
							actualPrice
						]).draw(false);
					}

					$grandTotal.val(numeral(getGrandTotal()).format("0.00"));
					if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
						$amountToPay.val(numeral(getGrandTotal()).format("0.00"));
					}

					$(nCell).editable("destroy");

					return val;
				}, {
					"onblur": "submit",
					"onreset": function () {
						setTimeout(function () { $ktReceipt.block = false; }, 0);
					}
				});

				setTimeout(function () { $(nCell).click(); }, 0);
			});
		});
	};

	var newTransaction = function (modeOfPayment) {
		myModeOfPayment = modeOfPayment;

		$(".btn-new-transaction").each(function () {
			$(this).removeClass("btn-primary");
			$(this).addClass("btn-default");
		});

		if(modeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH) {
			$(".btn-cash").removeClass("btn-default");
			$(".btn-cash").addClass("btn-primary");
		}
		else if(modeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
			$(".btn-credit-card").removeClass("btn-default");
			$(".btn-credit-card").addClass("btn-primary");
		}
		else if(modeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT) {
			$(".btn-credit").removeClass("btn-default");
			$(".btn-credit").addClass("btn-primary");
		}

		$.post(BASE_URL + CURRENT_CONTROLLER + "/customer_exists", {
			customerId: CONFIG.DEFAULT_CUSTOMER_ID
		}, function (data) {
			if(data == 1) {
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_customer", {
					customerId: CONFIG.DEFAULT_CUSTOMER_ID
				}, function (data) {
					var customer = JSON.parse(data);

					$customerId.val(customer.id);
					$customerName.val(customer.last_name + ", " + customer.first_name + " " + customer.middle_name.substring(0, 1) + ".");
				});	
			}
		});

		$dtReceipt.clear().draw();
		$dtItems.clear().draw();
		$dtServices.clear().draw();
		$dtCustomers.clear().draw();
		$dtTradeIns.clear().draw();
		$dtTradeInsSearchItem.clear().draw();

		$(".resettable").each(function () {
			if($(this).is("button")) {
				$(this).removeClass("disabled");
			}
			else if($(this).is("input")) {
				$(this).removeAttr("disabled");
				$(this).val("");
			}
		});

		if(modeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || modeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
			$amountToPay.attr("disabled", "disabled");
		}

		toggleSearchPanelToDefault();
	};

	var closeTransaction = function () {
		myModeOfPayment = CONFIG.MODES_OF_PAYMENT.NONE;

		$(".btn-new-transaction").each(function () {
			$(this).removeClass("btn-primary");
			$(this).addClass("btn-default");
		});

		$dtReceipt.clear().draw();
		$dtItems.clear().draw();
		$dtServices.clear().draw();
		$dtCustomers.clear().draw();
		$dtTradeIns.clear().draw();
		$dtTradeInsSearchItem.clear().draw();

		$(".resettable").each(function () {
			if($(this).is("button")) {
				$(this).addClass("disabled");
			}
			else if($(this).is("input")) {
				$(this).attr("disabled", "disabled");
				$(this).val("");
			}
		});

		toggleSearchPanelToDefault();
	};

	var findItem = function (itemId) {
		NProgress.start()
		$itemId.blur();
		$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
			itemId: itemId
		}, function (data) {
			if(data == 1) {
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_item", {
					itemId: itemId
				}, function (data) {
					var item = JSON.parse(data);

					$itemDescription.val(item.description);
					$itemQuantity.focus();
				});
			}
			else {
				$itemId.focus();
				$itemDescription.val("");
			}
		}).done(function () {
			NProgress.done();
		});
	};

	var addItem = function (itemId, quantity) {
		$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
			itemId: itemId
		}, function (data) {
			if(data == 1) {
				quantity = parseInt(quantity);

				if(quantity >= 1) {
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_item", {
						itemId: itemId
					}, function (data) {
						var item = JSON.parse(data),
							isItemOnTheList = false,
							dtRow,
							sellingPrice,
							isAdded = false;

						if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH)
							sellingPrice = parseFloat(item.selling_price_cash);
						else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD)
							sellingPrice = parseFloat(item.selling_price_credit_card);
						else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT)
							sellingPrice = parseFloat(item.selling_price_credit);

						for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
							if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.ITEM && $dtReceipt.row(i).data()[1] == itemId) {
								dtRow = $dtReceipt.row(i);
								isItemOnTheList = true;
								break;
							}
						}

						if(isItemOnTheList) {
							var addedQuantity = parseInt(dtRow.data()[3]) + quantity;

							if(addedQuantity > item.quantity) {
								Alerts.showError("Not enough quantity", "Current Quantity: <strong>" + item.quantity + "</strong> Requested Quantity: <strong>" + addedQuantity + "</strong>");
							}
							else {
								dtRow.data([
									CONFIG.PARTICULAR_TYPES.ITEM,
									item.id,
									item.description,
									addedQuantity,
									numeral(sellingPrice).format("0.00"),
									numeral(sellingPrice * addedQuantity).format("0.00"),
									item.actual_price
								]);

								isAdded = true;
							}
						}
						else {
							if(quantity > item.quantity) {
								Alerts.showError("Not enough quantity", "Current Quantity: <strong>" + item.quantity + "</strong> Requested Quantity: <strong>" + quantity + "</strong>");
							}
							else {
								$dtReceipt.row.add([
									CONFIG.PARTICULAR_TYPES.ITEM,
									item.id,
									item.description,
									quantity,
									numeral(sellingPrice).format("0.00"),
									numeral(sellingPrice * quantity).format("0.00"),
									item.actual_price
								]).draw(false);

								isAdded = true;
							}
						}

						if(isAdded) {
							$itemId.focus();
							$itemId.val("");
							$itemDescription.val("");
							$itemQuantity.val("");
							$grandTotal.val(numeral(getGrandTotal()).format("0.00"));

							if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
								$amountToPay.val(numeral(getGrandTotal()).format("0.00"));
							}

							addEditableFunctionalityToReceipt();
						}
					});
				}
			}
		});
	};

	var searchItem = function () {
		NProgress.start();

		$dtItems.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_items", {}, function (data) {
			var items = JSON.parse(data);

			for(var i = 0; i < items.length; i++) {
				var sellingPrice;

				if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH)
					sellingPrice = parseFloat(items[i].selling_price_cash);
				else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD)
					sellingPrice = parseFloat(items[i].selling_price_credit_card);
				else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT)
					sellingPrice = parseFloat(items[i].selling_price_credit);

				$dtItems.row.add([
					items[i]["id"],
					items[i]["description"],
					numeral(items[i]["quantity"]).format("0,0"),
					numeral(sellingPrice).format("0,0.00")
				]);
			}

			$modalSearchItem.modal({ keyboard: true });
			$dtItems.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var findService = function (serviceId) {
		NProgress.start()
		$.post(BASE_URL + CURRENT_CONTROLLER + "/service_exists", {
			serviceId: serviceId
		}, function (data) {
			if(data == 1) {
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_service", {
					serviceId: serviceId
				}, function (data) {
					var service = JSON.parse(data);

					$serviceDescription.val(service.description);
					addService(serviceId);
				});
			}
			else {
				$serviceDescription.val("");
			}
		}).done(function () {
			NProgress.done();
		});
	};

	var addService = function (serviceId) {
		$.post(BASE_URL + CURRENT_CONTROLLER + "/service_exists", {
			serviceId: serviceId
		}, function (data) {
			if(data == 1) {
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_service", {
					serviceId: serviceId
				}, function (data) {
					var service = JSON.parse(data),
						isServiceOnTheList = false,
						dtRow,
						sellingPrice;

					if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH)
						sellingPrice = parseFloat(service.selling_price_cash);
					else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD)
						sellingPrice = parseFloat(service.selling_price_credit_card);
					else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT)
						sellingPrice = parseFloat(service.selling_price_credit);

					for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
						if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.SERVICE && $dtReceipt.row(i).data()[1] == serviceId) {
							dtRow = $dtReceipt.row(i);
							isServiceOnTheList = true;
							break;
						}
					}

					if(isServiceOnTheList) {
						dtRow.data([
							CONFIG.PARTICULAR_TYPES.SERVICE,
							service.id,
							service.description,
							1,
							numeral(sellingPrice).format("0.00"),
							numeral(sellingPrice).format("0.00"),
							0
						]);
					}
					else {
						$dtReceipt.row.add([
							CONFIG.PARTICULAR_TYPES.SERVICE,
							service.id,
							service.description,
							1,
							numeral(sellingPrice).format("0.00"),
							numeral(sellingPrice).format("0.00"),
							0
						]).draw(false);
					}

					$serviceId.focus();
					$serviceId.val("");
					$serviceDescription.val("");
					$grandTotal.val(numeral(getGrandTotal()).format("0.00"));

					if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
						$amountToPay.val(numeral(getGrandTotal()).format("0.00"));
					}

					addEditableFunctionalityToReceipt();
				});
			}
		});
	};

	var searchService = function () {
		NProgress.start();

		$dtServices.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_services", {}, function (data) {
			var services = JSON.parse(data);

			for(var i = 0; i < services.length; i++) {
				var sellingPrice;

				if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH)
					sellingPrice = parseFloat(services[i].selling_price_cash);
				else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD)
					sellingPrice = parseFloat(services[i].selling_price_credit_card);
				else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT)
					sellingPrice = parseFloat(services[i].selling_price_credit);

				$dtServices.row.add([
					services[i]["id"],
					services[i]["description"],
					numeral(sellingPrice).format("0,0.00")
				]);
			}

			$modalSearchService.modal({ keyboard: true });
			$dtServices.draw();
		}).done(function () {
			NProgress.done();
		});
	};

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

					$frmNewCustomer[0].reset();
					$modalNewCustomer.modal("hide");

					$customerId.val(customer.id);
					$customerName.val(customer.last_name + ", " + customer.first_name + " " + customer.middle_name.substring(0, 1) + ".");

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

	var searchCustomer = function () {
		NProgress.start();

		$dtCustomers.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_customers", {}, function (data) {
			var customers = JSON.parse(data);

			for(var i = 0; i < customers.length; i++) {
				$dtCustomers.row.add([
					customers[i]["id"],
					customers[i]["last_name"] + ", " + customers[i]["first_name"] + " " + customers[i]["middle_name"].substring(0, 1) + ".",
					numeral(customers[i]["balance"]).format("0,0.00")
				]);
			}

			$modalSearchCustomer.modal({ keyboard: true });
			$dtCustomers.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var getGrandTotal = function () {
		var grandTotal = 0;

		for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
			grandTotal += parseFloat($dtReceipt.row(i).data()[5]);
		}

		return grandTotal;
	};

	var removeParticular = function () {
		if(ktReceiptRowPos >= 0) {
			ktReceiptSelectedRowPos = ktReceiptRowPos;
			$dtReceipt.row(ktReceiptSelectedRowPos).remove().draw(false);

			try {
				$grandTotal.val(numeral(getGrandTotal()).format("0.00"));
				if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
					$amountToPay.val(numeral(getGrandTotal()).format("0.00"));
				}

				$ktReceipt.fnSetPosition(0, ktReceiptSelectedRowPos);
			}
			catch(exception) { /* handle exception here */ }
		}
	};

	var openTradeInsModal = function () {
		$modalTradeIns.modal({ keyboard: true });
	};

	var tradeInsFindItem = function (itemId) {
		NProgress.start()
		$tradeInsItemId.blur();
		$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
			itemId: itemId
		}, function (data) {
			if(data == 1) {
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_item", {
					itemId: itemId
				}, function (data) {
					var item = JSON.parse(data);

					$tradeInsItemDescription.val(item.description);
					$tradeInsItemQuantity.focus();
				});
			}
			else {
				$tradeInsItemId.focus();
				$tradeInsItemDescription.val("");
			}
		}).done(function () {
			NProgress.done();
		});
	};

	var addEditableFunctionalityToTradeIns = function () {
		$("#tbl_trade_ins tbody td.editable").each(function () {
			$ktTradeIns.event.remove.action(this);
			$ktTradeIns.event.action(this, function (nCell) {
				ktTradeInsSelectedRowPos = ktTradeInsRowPos;
				$ktTradeIns.block = true;

				$(nCell).editable(function (val) {
					$ktTradeIns.block = false;

					if($(this).hasClass("quantity")) {
						var editedQuantity = isNaN(parseInt(val)) ? 0 : parseInt(val);

						var row = $dtTradeIns.row(ktTradeInsSelectedRowPos),
							id = row.data()[0],
							description = row.data()[1],
							quantity = parseInt(row.data()[2]),
							price = parseFloat(row.data()[3]);

						if(editedQuantity <= 0) {
							editedQuantity = quantity;
						}

						val = editedQuantity;

						row.data([
							id,
							description,
							editedQuantity,
							numeral(price).format("0.00"),
							numeral(editedQuantity * price).format("0.00")
						]).draw(false);
					}
					else if($(this).hasClass("price")) {
						var editedPrice = isNaN(parseFloat(val)) ? 0 : parseFloat(val);

						var row = $dtTradeIns.row(ktTradeInsSelectedRowPos),
							id = row.data()[0],
							description = row.data()[1],
							quantity = parseInt(row.data()[2]),
							price = parseFloat(row.data()[3]);

						if(editedPrice < 0) {
							editedPrice = price;
						}

						val = numeral(editedPrice).format("0.00");

						row.data([
							id,
							description,
							quantity,
							numeral(editedPrice).format("0.00"),
							numeral(quantity * editedPrice).format("0.00")
						]).draw(false);
					}

					$totalTradeInAmount.text(numeral(getTotalTradeInAmount()).format("0,0.00"));
					$tradeInAmount.val(numeral(getTotalTradeInAmount()).format("0.00"));

					$(nCell).editable("destroy");

					return val;
				}, {
					"onblur": "submit",
					"onreset": function () {
						setTimeout(function () { $ktTradeIns.block = false; }, 0);
					}
				});

				setTimeout(function () { $(nCell).click(); }, 0);
			});
		});
	};

	var addTradeInItem = function (itemId, quantity) {
		$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
			itemId: itemId
		}, function (data) {
			if(data == 1) {
				quantity = parseInt(quantity);
				if(quantity >= 1) {
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_item", {
						itemId: itemId
					}, function (data) {
						var item = JSON.parse(data),
							isItemOnTheList = false,
							dtRow;

						for(var i = 0; i < $dtTradeIns.rows().data().length; i++) {
							if($dtTradeIns.row(i).data()[0] == itemId) {
								dtRow = $dtTradeIns.row(i);
								isItemOnTheList = true;
								break;
							}
						}

						if(isItemOnTheList) {
							var addedQuantity = parseInt(dtRow.data()[2]) + quantity;

							dtRow.data([
								item.id,
								item.description,
								addedQuantity,
								numeral(item.actual_price).format("0.00"),
								numeral(parseFloat(item.actual_price) * addedQuantity).format("0.00")
							]);
						}
						else {
							$dtTradeIns.row.add([
								item.id,
								item.description,
								quantity,
								numeral(item.actual_price).format("0.00"),
								numeral(parseFloat(item.actual_price) * quantity).format("0.00")
							]).draw(false);
						}

						$totalTradeInAmount.text(numeral(getTotalTradeInAmount()).format("0,0.00"));
						$tradeInAmount.val(numeral(getTotalTradeInAmount()).format("0.00"));

						$tradeInsItemId.focus();
						$tradeInsItemId.val("");
						$tradeInsItemDescription.val("");
						$tradeInsItemQuantity.val("");

						addEditableFunctionalityToTradeIns();
					});
				}
			}
		});
	};

	var removeTradeInItem = function () {
		if(ktTradeInsRowPos >= 0) {
			ktTradeInsSelectedRowPos = ktTradeInsRowPos;
			$subDtTradeIns.fnDeleteRow($subDtTradeIns.$("tr", { "filter": "applied" })[ktTradeInsSelectedRowPos]);
			$totalTradeInAmount.text(numeral(getTotalTradeInAmount()).format("0,0.00"));
			$tradeInAmount.val(numeral(getTotalTradeInAmount()).format("0.00"));
		}
	};

	var tradeInsSearchItem = function () {
		NProgress.start();

		$dtTradeInsSearchItem.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_items", {}, function (data) {
			var items = JSON.parse(data);

			for(var i = 0; i < items.length; i++) {
				var sellingPrice;

				$dtTradeInsSearchItem.row.add([
					items[i]["id"],
					items[i]["description"],
					numeral(items[i]["quantity"]).format("0,0"),
					numeral(items[i]["actual_price"]).format("0,0.00")
				]);
			}

			$modalTradeInsSearchItem.modal({ keyboard: true });
			$dtTradeInsSearchItem.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var getTotalTradeInAmount = function () {
		var totalTradeInAmount = 0;

		for(var i = 0; i < $dtTradeIns.rows().data().length; i++) {
			totalTradeInAmount += parseFloat($dtTradeIns.row(i).data()[4]);
		}

		return totalTradeInAmount;
	};

	var saveTransaction = function () {
		if($dtReceipt.rows().data().length >= 1) {
			if($customerId.val() != "") {
				var areAmountsValid = false,
					grandTotal = parseFloat($grandTotal.val()),
					amountToPay = isNaN(parseFloat($amountToPay.val())) ? 0 : parseFloat($amountToPay.val()),
					amountRendered = isNaN(parseFloat($amountRendered.val())) ? 0 : parseFloat($amountRendered.val()),
					tradeInAmount = isNaN(parseFloat($tradeInAmount.val())) ? 0 : parseFloat($tradeInAmount.val()),
					balance = grandTotal - amountToPay;

				if(amountToPay < 0) {
					Alerts.showError("Error", "Please enter a valid <b>amount to pay</b>.");
				}
				else if(amountRendered < 0) {
					Alerts.showError("Error", "Please enter a valid <b>amount rendered</b>.");
				}
				else if(tradeInAmount < 0) {
					Alerts.showError("Error", "Please enter a valid <b>trade-in amount</b>.");
				}
				else {
					if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
						if(amountToPay != grandTotal) { // just in case
							Alerts.showError("Error!", "The <b>amount to pay</b> should be equal to the <b>grand total</b> of this transaction.");
						}
						else if((amountRendered + tradeInAmount) < grandTotal || (amountRendered + tradeInAmount) < amountToPay) {
							Alerts.showError("Error!", "The added values of <b>amount rendered</b> and <b>trade-in amount</b> should not be less than the <b>grand total</b> or the <b>amount to pay</b>.");
						}
						else {
							areAmountsValid = true;
						}
					}
					else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT) {
						if(amountToPay > grandTotal) {
							Alerts.showError("Error!", "<b>Grand total</b> should not be less than the <b>amount to pay</b>.");
						}
						else if(amountToPay > (amountRendered + tradeInAmount)) {
							Alerts.showError("Error!", "The added values of <b>amount rendered</b> and <b>trade-in amount</b> should not be less than the <b>amount to pay</b>");
						}
						else {
							areAmountsValid = true;
						}
					}
				}

				if(areAmountsValid) {
					var receiptItems = [],
						receiptServices = [],
						tradeInItems = [];

					for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
						var obj = {};

						if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.ITEM) {
							obj["itemId"] = $dtReceipt.row(i).data()[1];
							obj["description"] = $dtReceipt.row(i).data()[2];
							obj["quantity"] = $dtReceipt.row(i).data()[3];
							obj["sellingPrice"] = $dtReceipt.row(i).data()[4];
							obj["total"] = $dtReceipt.row(i).data()[5];
							obj["actualPrice"] = $dtReceipt.row(i).data()[6];

							receiptItems.push(obj);
						}
						else {
							obj["serviceId"] = $dtReceipt.row(i).data()[1];
							obj["description"] = $dtReceipt.row(i).data()[2];
							obj["sellingPrice"] = $dtReceipt.row(i).data()[4];

							receiptServices.push(obj);
						}
					}

					for(var i = 0; i < $dtTradeIns.rows().data().length; i++) {
						var obj = {};

						obj["itemId"] = $dtTradeIns.row(i).data()[0];
						obj["description"] = $dtTradeIns.row(i).data()[1];
						obj["quantity"] = $dtTradeIns.row(i).data()[2];
						obj["price"] = $dtTradeIns.row(i).data()[3];

						tradeInItems.push(obj);
					}

					var customerExists = function () {
						return $.post(BASE_URL + CURRENT_CONTROLLER + "/customer_exists", { customerId: $customerId.val() });
					};

					var getNonExistentReceiptItems = function () {
						var itemIds = [];

						for(var i = 0; i < receiptItems.length; i++) {
							itemIds.push(receiptItems[i]["itemId"]);
						}

						return $.post(BASE_URL + CURRENT_CONTROLLER + "/get_nonexistent_items", { itemIds: itemIds });
					};

					var getNonExistentServices = function () {
						var serviceIds = [];

						for(var i = 0; i < receiptServices.length; i++) {
							serviceIds.push(receiptServices[i]["serviceId"]);
						}

						return $.post(BASE_URL + CURRENT_CONTROLLER + "/get_nonexistent_services", { serviceIds: serviceIds });
					};

					var getNonExistentTradeInItems = function () {
						var itemIds = [];

						for(var i = 0; i < tradeInItems.length; i++) {
							itemIds.push(tradeInItems[i]["itemId"]);
						}

						return $.post(BASE_URL + CURRENT_CONTROLLER + "/get_nonexistent_trade_in_items", { itemIds: itemIds });
					};

					var getItemsWithInsufficientQuantity = function () {
						return $.post(BASE_URL + CURRENT_CONTROLLER + "/get_items_with_insufficient_quantity", { items: receiptItems });
					};

					customerExists().done(function (data) {
						if(data >= 1) {
							getNonExistentReceiptItems().done(function (data) {
								var nonexistentItems = JSON.parse(data);

								if(nonexistentItems.length <= 0) {
									getNonExistentServices().done(function (data) {
										var nonexistentServices = JSON.parse(data);

										if(nonexistentServices.length <= 0) {
											getNonExistentTradeInItems().done(function (data) {
												var nonexistentTradeInItems = JSON.parse(data);

												if(nonexistentTradeInItems.length <= 0) {
													getItemsWithInsufficientQuantity().done(function (data) {
														var itemsWithInsufficientQuantity = JSON.parse(data);

														if(itemsWithInsufficientQuantity.length <= 0) {
															Alerts.showConfirm("Are you sure?", "Are you sure you want to process this transaction?", function (isConfirm) {

																if(isConfirm) {
																	var save = function (numOfDays) {
																		$.post(BASE_URL + CURRENT_CONTROLLER + "/save_transaction", {
																			receiptItems: receiptItems,
																			receiptServices: receiptServices,
																			customerId: $customerId.val(),
																			amountPaid: amountToPay,
																			tradeInItems: tradeInItems,
																			modeOfPayment: myModeOfPayment,
																			numOfDays: numOfDays,
																			userId: USER_ID
																		}, function (data) {
																			$(".resettable").each(function () {
																				if($(this).is("button")) {
																					$(this).addClass("disabled");
																				}
																				else if($(this).is("input")) {
																					$(this).attr("disabled", "disabled");
																				}
																			});

																			$amountToPay.val(numeral(amountToPay).format("0.00"));
																			$amountRendered.val(numeral(amountRendered).format("0.00"));
																			$change.val(numeral((amountRendered + tradeInAmount) - amountToPay).format("0.00"));

																			myModeOfPayment = CONFIG.MODES_OF_PAYMENT.NONE;

																			Alerts.showSuccess("Success", "Transaction has been successfully saved.");
																		});
																	};

																	if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
																		save(0);
																	}
																	else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT) {
																		swal({
																			title: "Credit",
																			text: "Enter the number of days to pay:",
																			type: "input",
																			showCancelButton: true,
																			closeOnConfirm: false,
																			inputPlaceholder: "Number of days..."
																		}, function (inputValue) {
																			var numOfDays = parseInt(inputValue);
																			if(isNaN(numOfDays) || numOfDays <= 0) {
																				Alerts.showError("Error!", "Please enter a valid number of days.");
																			}
																			else {
																				save(numOfDays);
																			}
																		});
																	}
																}
															});
														}
														else {
															// there are items with insufficient quantity
															var message = "<div class='text-left'>Please review and edit the list of items. The following <b>items</b> doesn't have the sufficient quantity to complete this transaction: <br /><ul>";

															for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
																for(var j = 0; j < itemsWithInsufficientQuantity.length; j++) {
																	if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.ITEM && $dtReceipt.row(i).data()[1] == itemsWithInsufficientQuantity[j]["item_id"]) {
																		message += "<li>" + $dtReceipt.row(i).data()[1] + "| " + $dtReceipt.row(i).data()[2] + " | Quantity: " + itemsWithInsufficientQuantity[j]["current_quantity"] + ", Requested Quantity: " + itemsWithInsufficientQuantity[j]["requested_quantity"] + "</li>";
																	}
																}
															}
															message += "</ul></div>";

															$grandTotal.val(numeral(getGrandTotal()).format("0.00"));

															Alerts.showError("Error", message);
														}
													});
												}
												else {
													// there are trade-in items that don't exist
													var message = "<div class='text-left'>The following <b>trade-in items</b> has been removed from the trade-in list because it has been deleted from the inventory and cannot be used for any transactions: <br /><ul>";

													for(var i = 0; i < $dtTradeIns.rows().data().length; i++) {
														for(var j = 0; j < nonexistentTradeInItems.length; j++) {
															if($dtTradeIns.row(i).data()[1] == nonexistentTradeInItems[j]) {
																message += "<li>" + $dtTradeIns.row(i).data()[0] + "| " + $dtTradeIns.row(i).data()[1] + "</li>";
															}
														}
													}
													message += "</ul></div>";

													for(var i = 0; i < $dtTradeIns.rows().data().length; i++) {
														for(var j = 0; j < nonexistentTradeInItems.length; j++) {
															try {
																if($dtTradeIns.row(i).data()[0] == nonexistentTradeInItems[j]) {
																	$dtTradeIns.row(i).remove().draw(false);
																}
															}
															catch(exception) { /* handle exception here */ }
														}
													}

													$totalTradeInAmount.text(numeral(getTotalTradeInAmount()).format("0,0.00"));
													$tradeInAmount.val(numeral(getTotalTradeInAmount()).format("0.00"));

													Alerts.showError("Error", message);
												}
											});
										}
										else {
											// there are receipt services that don't exist
											var message = "<div class='text-left'>The following <b>services</b> has been removed from the list because it has been deleted from the inventory and cannot be used for any transactions: <br /><ul>";

											for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
												for(var j = 0; j < nonexistentServices.length; j++) {
													if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.SERVICE && $dtReceipt.row(i).data()[1] == nonexistentServices[j]) {
														message += "<li>" + $dtReceipt.row(i).data()[1] + "| " + $dtReceipt.row(i).data()[2] + "</li>";
													}
												}
											}
											message += "</ul></div>";

											for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
												for(var j = 0; j < nonexistentServices.length; j++) {
													try {
														if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.SERVICE && $dtReceipt.row(i).data()[1] == nonexistentServices[j]) {
															$dtReceipt.row(i).remove().draw(false);
														}
													}
													catch(exception) { /* handle exception here */ }
												}
											}

											$grandTotal.val(numeral(getGrandTotal()).format("0.00"));

											Alerts.showError("Error", message);
										}
									});
								}
								else {
									// there are receipt tems that don't exist
									var message = "<div class='text-left'>The following <b>items</b> has been removed from the list because it has been deleted from the inventory and cannot be used for any transactions: <br /><ul>";

									for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
										for(var j = 0; j < nonexistentItems.length; j++) {
											if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.ITEM && $dtReceipt.row(i).data()[1] == nonexistentItems[j]) {
												message += "<li>" + $dtReceipt.row(i).data()[1] + "| " + $dtReceipt.row(i).data()[2] + "</li>";
											}
										}
									}
									message += "</ul></div>";

									for(var i = 0; i < $dtReceipt.rows().data().length; i++) {
										for(var j = 0; j < nonexistentItems.length; j++) {
											try {
												if($dtReceipt.row(i).data()[0] == CONFIG.PARTICULAR_TYPES.ITEM && $dtReceipt.row(i).data()[1] == nonexistentItems[j]) {
													$dtReceipt.row(i).remove().draw(false);
												}
											}
											catch(exception) { /* handle exception here */ }
										}
									}

									$grandTotal.val(numeral(getGrandTotal()).format("0.00"));

									Alerts.showError("Error", message);
								}
							});
						}
						else {
							Alert.showError("Error!", "The selected customer has already been deleted.")
						}
					});
				}
			}
			else {
				// there is no customer
				Alerts.showError("Error", "There is no selected <b>customer</b>.");
			}
		}
		else {
			// there are no items or services to sell
			Alerts.showError("Error", "There are no <b>items</b> or <b>services</b> to sell.");
		}
	};

	var addShortcuts = function () {
		shortcut.add("F1", function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new <b>cash</b> transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction(CONFIG.MODES_OF_PAYMENT.CASH);
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new cash transaction");
				}
			});
		});

		shortcut.add("F2", function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new <b>credit card</b> transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction(CONFIG.MODES_OF_PAYMENT.CREDIT_CARD);
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new credit card transaction");
				}
			});
		});

		shortcut.add("F3", function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new <b>credit</b> transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction(CONFIG.MODES_OF_PAYMENT.CREDIT);
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new credit transaction");
				}
			});
		});

		shortcut.add("F4", function () {
			if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
				toggleSearchPanel();
			}
		});

		shortcut.add("F5", function () {
			if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
				searchItem();
			}
		});

		shortcut.add("F6", function () {
			if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
				$ktReceipt.fnSetPosition(0, 0);
			}
		});

		shortcut.add("F7", function () {
			if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
				newCustomer();
			}
		});

		shortcut.add("F8", function () {
			if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
				searchCustomer();
			}
		});

		shortcut.add("F9", function () {
			if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CASH || myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT_CARD) {
				$amountRendered.focus();
			}
			else if(myModeOfPayment == CONFIG.MODES_OF_PAYMENT.CREDIT) {
				$amountToPay.focus();
			}
		});

		// shortcut.add("F10", function () {
		// 	if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
		// 		openTradeInsModal();
		// 	}
		// });

		shortcut.add("F12", function () {
			Alerts.showConfirm("Close Transaction", "Are you sure you want to close this transaction?", function (isConfirm) {
				if(isConfirm) {
					closeTransaction();
					Alerts.showSuccess("Transaction Closed", "Successfully closed the transaction.");
				}
			});
		});

		shortcut.add("Delete", function () {
			if(myModeOfPayment != CONFIG.MODES_OF_PAYMENT.NONE) {
				removeParticular();
			}
		});
	};

	var removeShortcuts = function () {
		// didnt used f11 because it was reserved for full-screen capability
		var shortcuts = [
			"F1",
			"F2",
			"F3",
			"F4",
			"F5",
			"F6",
			"F7",
			"F8",
			"F9",
			"F10",
			"F12",
			"Delete"
		];

		for(var i = 0; i < shortcuts.length; i++) {
			shortcut.remove(shortcuts[i]);
			shortcut.add(shortcuts[i], function () {});
		}
	};

	var events = (function () {
		addShortcuts();
		closeTransaction();
		toggleSearchPanelToDefault();

		$("div.modal").on("shown.bs.modal", function () {
			$ktReceipt.fnBlur();
		    $(this).find("input:visible:first").focus();

		    if($(this).attr("id") == $modalSearchItem.attr("id")) {
		    	$dtItems.draw();
		    	$ktItems.fnSetPosition(0, 0);
		    }
		    else if($(this).attr("id") == $modalSearchService.attr("id")) {
		    	$dtServices.draw();
		    	$ktServices.fnSetPosition(0, 0);
		    }
		    else if($(this).attr("id") == $modalSearchCustomer.attr("id")) {
		    	$dtCustomers.draw();
		    	$ktCustomers.fnSetPosition(0, 0);
		    }
		    else if($(this).attr("id") == $modalTradeIns.attr("id")) {
		    	$dtTradeIns.draw();
		    }
		    else if($(this).attr("id") == $modalTradeInsSearchItem.attr("id")) {
		    	$dtTradeInsSearchItem.draw();
		    	$ktTradeInsSearchItem.fnSetPosition(0, 0);
		    }

		    removeShortcuts();
		});

		$("div.modal").on("hidden.bs.modal", function () {
			addShortcuts();
		});

		$ktReceipt.event.focus(null, null, function (node, x, y) {
			ktReceiptRowPos = y;
		});

		$ktReceipt.event.blur(null, null, function (node, x, y) {
			ktReceiptRowPos = -1;
		});

		$ktItems.event.action(null, null, function (node, x, y) {
			$itemId.val($subDtItems._("tr", { "filter": "applied" })[y][0]);
			$itemDescription.val($subDtItems._("tr", { "filter": "applied" })[y][1]);
			$modalSearchItem.modal("hide");

			$itemQuantity.focus();
			$ktItems.fnBlur();
		});

		$ktServices.event.action(null, null, function (node, x, y) {
			$serviceId.val($subDtServices._("tr", { "filter": "applied" })[y][0]);
			$serviceDescription.val($subDtServices._("tr", { "filter": "applied" })[y][1]);
			$modalSearchService.modal("hide");

			$serviceId.focus();
			addService($subDtServices._("tr", { "filter": "applied" })[y][0]);
			$ktServices.fnBlur();
		});

		$ktCustomers.event.action(null, null, function (node, x, y) {
			$customerId.val($subDtCustomers._("tr", { "filter": "applied" })[y][0]);
			$customerName.val($subDtCustomers._("tr", { "filter": "applied" })[y][1]);
			$modalSearchCustomer.modal("hide");

			$ktCustomers.fnBlur();
		});

		$ktTradeIns.event.focus(null, null, function (node, x, y) {
			ktTradeInsRowPos = y;
			$btnRemoveTradeInItem.removeClass("disabled");
		});

		$ktTradeIns.event.blur(null, null, function (node, x, y) {
			ktTradeInsRowPos = -1;
			$btnRemoveTradeInItem.addClass("disabled");
		});

		$ktTradeInsSearchItem.event.action(null, null, function (node, x, y) {
			$tradeInsItemId.val($subDtTradeInsSearchItem._("tr", { "filter": "applied" })[y][0]);
			$tradeInsItemDescription.val($subDtTradeInsSearchItem._("tr", { "filter": "applied" })[y][1]);
			$modalTradeInsSearchItem.modal("hide");

			$tradeInsItemQuantity.focus();
			$ktTradeInsSearchItem.fnBlur();
		});

		$btnToggleSearchPanel.click(function () {
			toggleSearchPanel();
		});

		$(".sidebar-toggle").click(function () {
			setTimeout(function () {
				$dtReceipt.draw();
			}, 300);
		});

		$itemId.keypress(function (e) {
			if(e.keyCode == 13) {
				findItem($(this).val());
			}
		});

		$itemQuantity.keypress(function (e) {
			if(e.keyCode == 13) {
				addItem($itemId.val(), $(this).val());
			}
		});

		$btnAddItem.click(function () {
			addItem($itemId.val(), $itemQuantity.val());
		});

		$btnSearchItem.click(function () {
			searchItem();
		});

		$serviceId.keypress(function (e) {
			if(e.keyCode == 13) {
				findService($(this).val());
			}
		});

		$btnAddService.click(function () {
			addService($serviceId.val());
		});

		$btnSearchService.click(function () {
			searchService();
		});

		$btnNewCustomer.click(function () {
			newCustomer();
		});

		$btnSearchCustomer.click(function () {
			searchCustomer();
		});

		$btnAddTradeInItems.click(function () {
			openTradeInsModal();
		});

		$tradeInsItemId.keypress(function (e) {
			if(e.keyCode == 13) {
				tradeInsFindItem($(this).val());
			}
		});

		$btnAddTradeInItem.click(function () {
			addTradeInItem($tradeInsItemId.val(), $tradeInsItemQuantity.val());
		});

		$btnRemoveTradeInItem.click(function () {
			removeTradeInItem();
		});

		$tradeInsItemQuantity.keypress(function (e) {
			if(e.keyCode == 13) {
				addTradeInItem($tradeInsItemId.val(), $(this).val());
			}
		});

		$btnTradeInsSearchItem.click(function () {
			tradeInsSearchItem();
		});

		$amountToPay.keypress(function (e) {
			if(e.keyCode == 13) {
				$amountRendered.focus();
			}
		});

		$amountRendered.keypress(function (e) {
			if(e.keyCode == 13) {
				saveTransaction();
			}
		});

		$btnSaveTransaction.click(function () {
			saveTransaction();
		});

		$btnCloseTransaction.click(function () {
			Alerts.showConfirm("Close Transaction", "Are you sure you want to close this transaction?", function (isConfirm) {
				if(isConfirm) {
					closeTransaction();
					Alerts.showSuccess("Transaction Closed", "Successfully closed the transaction.");
				}
			});
		});

		$btnNewCashTransaction.click(function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new <b>cash</b> transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction(CONFIG.MODES_OF_PAYMENT.CASH);
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new cash transaction");
				}
			});
		});

		$btnNewCreditCardTransaction.click(function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new <b>credit card</b> transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction(CONFIG.MODES_OF_PAYMENT.CREDIT_CARD);
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new credit card transaction");
				}
			});
		});

		$btnNewCreditTransaction.click(function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new <b>credit</b> transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction(CONFIG.MODES_OF_PAYMENT.CREDIT);
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new credit transaction");
				}
			});
		});

		$btnShowHelp.click(function () {
			$modalHelp.modal({ keyboard: true });
		});
	})();
})();