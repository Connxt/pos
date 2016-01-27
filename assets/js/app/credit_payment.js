var Credit_Payment = (function () {
	var CONFIG = (function () {
		return {
			DEFAULT_RECEIPT_ID_TEXT: "Select a receipt..."
		};
	})();

	var transactionExists = false;

	var $tblReceipts = $("#tbl_receipts"),
		$dtReceipts = $tblReceipts.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "15%" }, // Receipt ID
				{ "sClass": "text-left", "sWidth": "20%" }, // Date
				{ "sClass": "text-left", "sWidth": "20%" }, // Due Date
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Amount
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Balance
				{ "sClass": "text-left", "sWidth": "15%" }, // Status
			],
			"sorting": [],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "500px"
		}),
		$subDtReceipts = $tblReceipts.dataTable(),
		$ktReceipts = new $.fn.dataTable.KeyTable($subDtReceipts);

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


	var $customerId = $("#customer_id"),
		$customerName = $("#customer_name"),
		$customerBalance = $("#customer_balance"),
		$btnSearchCustomer = $("#btn_search_customer");

	var $tradeInsItemId = $("#trade_ins_item_id"),
		$tradeInsItemDescription = $("#trade_ins_item_description"),
		$tradeInsItemQuantity = $("#trade_ins_item_quantity"),
		$totalTradeInAmount = $("#total_trade_in_amount"),
		$btnAddTradeInItem = $("#btn_add_trade_in_item"),
		$btnRemoveTradeInItem = $("#btn_remove_trade_in_item"),
		$btnTradeInsSearchItem = $("#btn_trade_ins_search_item");

	var $receiptId = $("#receipt_id"),
		$balance = $("#balance"),
		$amountToPay = $("#amount_to_pay"),
		$amountRendered = $("#amount_rendered"),
		$tradeInAmount = $("#trade_in_amount"),
		$change = $("#change");

	var $btnAddTradeInItems = $("#btn_add_trade_in_items"),
		$btnSaveTransaction = $("#btn_save_transaction"),
		$btnCloseTransaction = $("#btn_close_transaction"),
		$btnNewTransaction = $("#btn_new_transaction"),
		$btnShowHelp = $("#btn_show_help");

	var $modalSearchCustomer = $("#modal_search_customer"),
		$modalTradeIns = $("#modal_trade_ins"),
		$modalTradeInsSearchItem = $("#modal_trade_ins_search_item"),
		$modalHelp = $("#modal_help");

	var newTransaction = function () {
		transactionExists = true;

		$dtReceipts.clear().draw();

		$(".resettable").each(function () {
			if($(this).is("button")) {
				$(this).removeClass("disabled");
			}
			else if($(this).is("input")) {
				$(this).removeAttr("disabled");
				$(this).val("");
			}
		});

		$receiptId.text(CONFIG.DEFAULT_RECEIPT_ID_TEXT);

		$customerId.focus();
	};

	var closeTransaction = function () {
		transactionExists = false;

		$dtReceipts.clear().draw();

		$(".resettable").each(function () {
			if($(this).is("button")) {
				$(this).addClass("disabled");
			}
			else if($(this).is("input")) {
				$(this).attr("disabled", "disabled");
				$(this).val("");
			}
		});

		$receiptId.text(CONFIG.DEFAULT_RECEIPT_ID_TEXT);
	};

	var findCustomer = function (customerId) {
		if(customerId != "") {
			NProgress.start();
			$customerId.blur();
			$.post(BASE_URL + CURRENT_CONTROLLER + "/customer_exists", {
				customerId: customerId
			}, function (data) {
				if(data == 1) {
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_customer", {
						customerId: customerId
					}, function (data) {
						var customer = JSON.parse(data);

						$customerName.val(customer["last_name"] + ", " + customer["first_name"] + " " + customer["middle_name"].substring(0, 1));
						$customerBalance.val(numeral(customer["balance"]).format("0,0.00"));
					});

					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipts_via_customer_id", {
						customerId: customerId
					}, function (data) {
						var receipts = JSON.parse(data);

						$dtReceipts.clear().draw();
						
						for(var i = 0; i < receipts.length; i++) {
							var status;

							if(receipts[i]["balance"] <= 0) {
								status = "<span class='label label-default'>Fully Paid</span>";
							}
							else {
								if(receipts[i]["days_left"] < 0) {
									status = "<span class='label label-danger'>Overdue: " + (receipts[i]["days_left"] * -1) + " days</span>";
								}
								else {
									status = "<span class='label label-warning'>" + (receipts[i]["days_left"] * 1) + " days left</span>";
								}
							}

							$dtReceipts.row.add([
								receipts[i]["id"],
								moment(receipts[i]["created_at"]).format("MMM DD, YYYY"),
								moment(receipts[i]["due_date"]).format("MMM DD, YYYY"),
								numeral(receipts[i]["total_amount"]).format("0.00"),
								numeral(receipts[i]["balance"]).format("0.00"),
								status
							]);
						}

						if(receipts.length >= 1) {
							$dtReceipts.draw();
							$ktReceipts.fnSetPosition(0, 0);
						}
					});
				}
				else {
					$customerId.focus();
					$customerName.val("");
					$customerBalance.val("");
					$dtReceipts.clear().draw();
				}
			}).done(function () {
				NProgress.done();
			});
		}
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

	var useReceipt = function (rowNum) {
		if($subDtReceipts._("tr", { "filter": "applied" })[rowNum][4] > 0) {
			$receiptId.text($subDtReceipts._("tr", { "filter": "applied" })[rowNum][0]);
			$balance.val($subDtReceipts._("tr", { "filter": "applied" })[rowNum][4]);

			$ktReceipts.fnBlur();
			$amountToPay.focus();
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
		if($customerId.val() != "") {
			if($receiptId.text() != CONFIG.DEFAULT_RECEIPT_ID_TEXT) {
				var areAmountsValid = false,
					balance = parseFloat($balance.val()),
					amountToPay = isNaN(parseFloat($amountToPay.val())) ? 0 : parseFloat($amountToPay.val()),
					amountRendered = isNaN(parseFloat($amountRendered.val())) ? 0 : parseFloat($amountRendered.val()),
					tradeInAmount = isNaN(parseFloat($tradeInAmount.val())) ? 0 : parseFloat($tradeInAmount.val());

				if(amountToPay < 0) {
					Alerts.showError("Error", "Please enter a valid <b>amount to pay</b>.");
				}
				else if(amountRendered < 0) {
					Alerts.showError("Error", "Please enter a valid <b>amount rendered</b>.");
				}
				else if(tradeInAmount < 0) {
					Alerts.showError("Error", "Please enter a valid <b>trade-in amount</b>.");
				}
				else if(amountRendered <= 0 && tradeInAmount <= 0) {
					Alerts.showError("Error", "Please enter valid amounts for <b>amount rendered</b> or <b>trade-in amount</b>");
				}
				else {
					if(amountToPay > balance) {
						Alerts.showError("Error!", "<b>Balance</b> should not be less than the <b>amount to pay</b>.");
					}
					else if(amountToPay > (amountRendered + tradeInAmount)) {
						Alerts.showError("Error!", "The added values of <b>amount rendered</b> and <b>trade-in amount</b> should not be less than the <b>amount to pay</b>");
					}
					else {
						areAmountsValid = true;
					}

					if(areAmountsValid) {
						var tradeInItems = [];

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

						var getNonExistentTradeInItems = function () {
							var itemIds = [];

							for(var i = 0; i < tradeInItems.length; i++) {
								itemIds.push(tradeInItems[i]["itemId"]);
							}

							return $.post(BASE_URL + CURRENT_CONTROLLER + "/get_nonexistent_trade_in_items", { itemIds: itemIds });
						};

						var getReceipt = function (receiptId) {
							return $.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipt", { receiptId: receiptId });
						};

						customerExists().done(function (data) {
							if(data >= 1) {
								getReceipt($receiptId.text()).done(function (data) {
									var receipt = JSON.parse(data);
									var savedBalance = parseFloat(receipt["balance"]);
									var currentBalance = parseFloat($balance.val());

									if(savedBalance == currentBalance) {
										getNonExistentTradeInItems().done(function (data) {
											var nonexistentTradeInItems = JSON.parse(data);

											if(nonexistentTradeInItems.length <= 0) {
												Alerts.showConfirm("Are you sure?", "Are you sure you want to process this transaction?", function (isConfirm) {
													if(isConfirm) {
														var save = function () {
															$.post(BASE_URL + CURRENT_CONTROLLER + "/save_transaction", {
																customerId: $customerId.val(),
																receiptId: $receiptId.text(),
																amountPaid: amountToPay,
																tradeInItems: tradeInItems,
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

																transactionExists = false;

																Alerts.showSuccess("Success", "Transaction has been successfully saved.");
															});
														};

														save();
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
										Alerts.showError("The data of this <b>customer</b> has been updated. Please restart the process and choose this customer again.")
									}
								});		
							}
							else {
								Alert.showError("Error!", "The selected customer has already been deleted.")
							}
						});
					}
				}
			}
			else {
				Alerts.showError("Error", "There is no selected <b>receipt</b>.");
			}
		}
		else {
			Alerts.showError("Error", "There is no selected <b>customer</b>.");
		}
	};

	var addShortcuts = function () {
		shortcut.add("F1", function () {
			Alerts.showConfirm("New Transaction", "Are you sure you want to open a new transaction?", function (isConfirm) {
				if(isConfirm) {
					newTransaction();
					Alerts.showSuccess("New Transaction Opened", "Successfully opened a new cash transaction");
				}
			});
		});

		shortcut.add("F4", function () {
			if(transactionExists) {
				$customerId.focus();
			}
		});

		shortcut.add("F6", function () {
			if(transactionExists) {
				$ktReceipts.fnSetPosition(0, 0);
			}
		});

		shortcut.add("F8", function () {
			if(transactionExists) {
				searchCustomer();
			}
		});

		shortcut.add("F9", function () {
			if(transactionExists) {
				$amountToPay.focus();
			}
		});

		// shortcut.add("F10", function () {
		// 	if(transactionExists) {
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
	};

	var removeShortcuts = function () {
		var shortcuts = [
			"F1",
			"F4",
			"F6",
			"F8",
			"F9",
			"F10",
			"F12"
		];

		for(var i = 0; i < shortcuts.length; i++) {
			shortcut.remove(shortcuts[i]);
			shortcut.add(shortcuts[i], function () {});
		}
	};

	var events = (function () {
		addShortcuts();
		closeTransaction();

		$("div.modal").on("shown.bs.modal", function () {
			$ktReceipts.fnBlur();
		    $(this).find("input:visible:first").focus();

		    
		    if($(this).attr("id") == $modalSearchCustomer.attr("id")) {
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

		$ktReceipts.event.action(null, null, function (node, x, y) {
			useReceipt(y);
		});

		$ktCustomers.event.action(null, null, function (node, x, y) {
			$customerId.val($subDtCustomers._("tr", { "filter": "applied" })[y][0]);
			findCustomer($subDtCustomers._("tr", { "filter": "applied" })[y][0]);

			$modalSearchCustomer.modal("hide");
			$ktCustomers.fnBlur();
		});

		$(".sidebar-toggle").click(function () {
			setTimeout(function () {
				$dtReceipt.draw();
			}, 300);
		});

		$customerId.keypress(function (e) {
			if(e.keyCode == 13) {
				findCustomer($(this).val());
			}
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

		$btnCloseTransaction.click(function() {
			closeTransaction();
		});

		$btnNewTransaction.click(function () {
			newTransaction();
		});

		$btnShowHelp.click(function () {
			$modalHelp.modal({ keyboard: true });
		});
	})();
})();