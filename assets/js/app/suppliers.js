var Suppliers = (function () {
	var $tblSuppliers = $("#tbl_suppliers"),
		$dtSuppliers = $tblSuppliers.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Supplier ID
				{ "sClass": "text-left", "sWidth": "40%" }, // Name
				{ "sClass": "text-left", "sWidth": "30%" }, // Contact Info
				{ "sClass": "text-right font-bold", "sWidth": "20%" } // Total Amount Delivered
			]
		}),
		$subDtSuppliers = $tblSuppliers.dataTable(),
		$ktSuppliers = new $.fn.dataTable.KeyTable($subDtSuppliers),
		ktSuppliersRowPos = -1,
		ktSuppliersSelectedRowPos = -1;

	var $tblReceiveDelivery = $("#tbl_receive_delivery"),
		$dtReceiveDelivery = $tblReceiveDelivery.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "4em" }, // Item ID
				{ "sClass": "text-left", "sWidth": "25em" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "2em" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Actual Price
				{ "sClass": "text-right font-bold", "sWidth": "5em" } // Total Price
			],
			"sorting": [],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtReceiveDelivery = $tblReceiveDelivery.dataTable(),
		$ktReceiveDelivery = new $.fn.dataTable.KeyTable($subDtReceiveDelivery),
		ktReceiveDeliveryRowPos = -1,
		ktReceiveDeliverySelectedRowPos = -1;

	var $tblItems = $("#tbl_items"),
		$dtItems = $tblItems.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "5em" }, // ID
				{ "sClass": "text-left", "sWidth": "15em" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "2em" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Actual Price
			],
			"paging": false,
			"info": false,
			"scrollY": "280px"
		}),
		$subDtItems = $tblItems.dataTable(),
		$ktItems = new $.fn.dataTable.KeyTable($subDtItems);

	var $tblDeliveries = $("#tbl_deliveries"),
		$dtDeliveries = $tblDeliveries.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "20%" }, // Delivery ID
				{ "sClass": "text-right font-bold", "sWidth": "40%" }, // Total Amount
				{ "sClass": "text-left", "sWidth": "30%" }, // User
				{ "sClass": "text-left", "sWidth": "20%" } // Date
			],
			"order": [ [0, "desc"] ],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "200px"
		}),
		$subDtDeliveries = $tblDeliveries.dataTable(),
		$ktDeliveries = new $.fn.dataTable.KeyTable($subDtDeliveries),
		ktDeliveriesRowPos = -1,
		ktDeliveriesSelectedRowPos = -1;

	var $tblDeliveryItems = $("#tbl_delivery_items"),
		$dtDeliveryItems = $tblDeliveryItems.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Item ID
				{ "sClass": "text-left", "sWidth": "30%" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Actual Price
				{ "sClass": "text-right font-bold", "sWidth": "20%" } // Total Price
			],
			"sorting": [],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "200px"
		}),
		$subDtDeliveryItems = $tblDeliveryItems.dataTable(),
		$ktDeliveryItems = new $.fn.dataTable.KeyTable($subDtDeliveryItems);

	var $btnNewSupplier = $("#btn_new_supplier"),
		$btnDeleteSupplier = $("#btn_delete_supplier"),
		$btnViewSupplier = $("#btn_view_supplier"),
		$btnViewDelivery = $("#btn_view_delivery"),
		$btnUpdateSupplier = $("#btn_update_supplier"),
		$btnRefreshSupplierList = $("#btn_refresh_supplier_list"),
		$btnReceiveDelivery = $("#btn_receive_delivery");

	var $modalNewSupplier = $("#modal_new_supplier"),
		$modalViewSupplier = $("#modal_view_supplier"),
		$modalViewDelivery = $("#modal_view_delivery"),
		$modalUpdateSupplier = $("#modal_update_supplier"),
		$modalReceiveDelivery = $("#modal_receive_delivery"),
		$modalSearchItem = $("#modal_search_item");

	var $itemId = $("#item_id"),
		$description = $("#description"),
		$quantity = $("#quantity"),
		$totalAmountReceiveDelivery = $("#total_amount_receive_delivery"),
		$btnSearchItem = $("#btn_search_item"),
		$btnAddItemToDelivery = $("#btn_add_item_to_delivery"),
		$btnRemoveItemFromDelivery = $("#btn_remove_item_from_delivery"),
		$btnSaveDelivery = $("#btn_save_delivery");

	var newSupplier = function () {
		var $frmNewSupplier = $("#frm_new_supplier");
		var frmNewSupplierValidator = $frmNewSupplier.validate({
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo("div#" + element.attr("name") + "_error");
			},
			rules: {
				name_new: { required: true },
				contact_info_new: { required: true }
			},
			messages: {
				name_new: { required: "Please enter the supplier's name" },
				contact_info_new: { required: "Please enter the supplier's contact info" }
			},
			submitHandler: function (form) {
				NProgress.start();
				$.post(BASE_URL + CURRENT_CONTROLLER + "/new_supplier", {
					name: $("#name_new").val(),
					contactInfo: $("#contact_info_new").val()
				}, function (data) {
					var supplier = JSON.parse(data);

					$dtSuppliers.row.add([
						supplier.id,
						supplier.name,
						supplier.contact_info,
						numeral(supplier.total_amount_delivered).format("0,0.00")
					]).draw(false);

					$frmNewSupplier[0].reset();
					$modalNewSupplier.modal("hide");

					Alerts.showSuccess("Success", "Successfully added a new supplier");
				}).done(function () {
					NProgress.done();
				});
			}
		});

		frmNewSupplierValidator.resetForm();
		$frmNewSupplier[0].reset();
		$modalNewSupplier.modal({ keyboard: true });
	};

	var updateSupplier = function () {
		if(ktSuppliersRowPos >= 0) {
			var $frmUpdateSupplier = $("#frm_update_supplier"),
				$supplierIdUpdate = $("#supplier_id_update"),
				$nameUpdate = $("#name_update"),
				$contactInfoUpdate = $("#contact_info_update");

			var frmUpdateSupplierValidator = $frmUpdateSupplier.validate({
				errorElement: "div",
				errorPlacement: function (error, element) {
					error.appendTo("div#" + element.attr("name") + "_error");
				},
				rules: {
					name_update: { required: true },
					contact_info_update: { required: true }
				},
				messages: {
					name_update: { required: "Please enter the supplier's name" },
					contact_info_update: { required: "Please enter the supplier's contact info" }
				},
				submitHandler: function (form) {
					NProgress.start();

					var supplierId = $supplierIdUpdate.val();

					$.post(BASE_URL + CURRENT_CONTROLLER + "/update_supplier", {
						supplierId: supplierId,
						name: $nameUpdate.val(),
						contactInfo: $contactInfoUpdate.val()
					}, function (data) {
						if(data == 0) {
							$frmUpdateSupplier[0].reset();
							$modalUpdateSupplier.modal("hide");
							$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);

							Alerts.showError("Error!", "Cannot find supplier ID <b>" + supplierId + "</b>. The selected supplier has been deleted by another session.");
						}
						else {
							var supplier = JSON.parse(data);

							$subDtSuppliers.fnUpdate([
								supplier.id,
								supplier.name,
								supplier.contact_info,
								numeral(supplier.total_amount_delivered).format("0,0.00")
							], $subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);

							$frmUpdateSupplier[0].reset();
							$modalUpdateSupplier.modal("hide");

							Alerts.showSuccess("Success", "Successfully updated the selected supplier");
						}
					}).done(function () {
						NProgress.done();
					});
				}
			});

			ktSuppliersSelectedRowPos = ktSuppliersRowPos;
			var supplierId = $subDtSuppliers._("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/supplier_exists", {
				supplierId: supplierId
			}, function (data) {
				if(data == 0) {
					$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find supplier ID <b>" + supplierId + "</b>. The selected supplier has been deleted by another session.");
				}
				else {
					frmUpdateSupplierValidator.resetForm();
					$frmUpdateSupplier[0].reset();
					$modalUpdateSupplier.modal({ keyboard: true });

					NProgress.start();
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_supplier", {
						supplierId: supplierId
					}, function (data) {
						var supplier = JSON.parse(data);

						$supplierIdUpdate.val(supplier.id);
						$nameUpdate.val(supplier.name);
						$contactInfoUpdate.val(supplier.contact_info);

					}).done(function () {
						NProgress.done();
					});
				}
			});
		}
	};

	var viewSupplier = function () {
		if(ktSuppliersRowPos >= 0) {
			ktSuppliersSelectedRowPos = ktSuppliersRowPos;
			var supplierId = $subDtSuppliers._("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/supplier_exists", {
				supplierId: supplierId
			}, function (data) {
				if(data == 0) {
					$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find supplier ID <b>" + supplierId + "</b>. The selected supplier has been deleted by another session.");
				}
				else {
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_supplier", {
						supplierId: supplierId
					}, function (data) {
						var supplier = JSON.parse(data);

						$("#supplier_id").text(supplier.id);
						$("#supplier_name").text(supplier.name);
						$("#contact_info").text(supplier.contact_info);
						$("#total_amount_delivered").text(numeral(supplier.total_amount_delivered).format("0,0.00"));

						$.post(BASE_URL + CURRENT_CONTROLLER + "/get_deliveries_via_supplier_id", {
							supplierId: supplierId
						}, function (data) {
							var deliveries = JSON.parse(data);

							$dtDeliveries.clear().draw();
							for(var i = 0; i < deliveries.length; i++) {
								$dtDeliveries.row.add([
									deliveries[i]["id"],
									numeral(deliveries[i]["total_amount"]).format("0,0.00"),
									deliveries[i]["user_last_name"] + ", " + deliveries[i]["user_first_name"] + " " + deliveries[i]["user_middle_name"].substring(0, 1) + ".",
									moment(deliveries[i]["created_at"]).format("MMM DD, YYYY")
								]);
							}
							$dtDeliveries.draw();
							$modalViewSupplier.modal({ keyboard: true });
						});
					});
				}
			});
		}
	};

	var viewDelivery = function () {
		if(ktDeliveriesRowPos >= 0) {
			ktDeliveriesSelectedRowPos = ktDeliveriesRowPos;
			var deliveryId = $subDtDeliveries._("tr", { "filter": "applied" })[ktDeliveriesSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/delivery_exists", {
				deliveryId: deliveryId
			}, function (data) {
				if(data == 0) {
					$subDtDeliveries.fnDeleteRow($subDtDeliveries.$("tr", { "filter": "applied" })[ktDeliveriesSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find delivery ID <b>" + deliveryId + "</b>. The selected delivery has been deleted by another session.");
				}
				else {
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_delivery", {
						deliveryId: deliveryId
					}, function (data) {
						var delivery = JSON.parse(data);

						$("#delivery_id").text(delivery.id);
						$("#delivery_date").text(moment(delivery.created_at).format("MMM DD, YYYY"));
						$("#user").text(delivery.user_first_name + " " + delivery.user_middle_name + " " + delivery.user_last_name);
						$("#total_amount").text(numeral(delivery.total_amount).format("0,0.00"));

						$dtDeliveryItems.clear();
						for(var i = 0; i < delivery.delivery_items.length; i++) {
							$dtDeliveryItems.row.add([
								delivery.delivery_items[i].item_id,
								delivery.delivery_items[i].description,
								delivery.delivery_items[i].quantity,
								numeral(delivery.delivery_items[i].actual_price).format("0,0.00"),
								numeral(parseFloat(delivery.delivery_items[i].quantity) * parseFloat(delivery.delivery_items[i].actual_price)).format("0,0.00"),
							]);
						}

						$modalViewDelivery.modal({ keyboard: true });
					});
				}
			});
		}
	}

	var deleteSupplier = function () {
		if(ktSuppliersRowPos >= 0) {
			ktSuppliersSelectedRowPos = ktSuppliersRowPos;
			var supplierId = $subDtSuppliers._("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/supplier_exists", {
				supplierId: supplierId
			}, function (data) {
				if(data == 0) {
					$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find supplier ID <b>" + supplierId + "</b>. The selected supplier has been deleted by another session.");
				}
				else {
					Alerts.showConfirm("Warning!", "Are you sure you want to delete this supplier?", function () {
						$.post(BASE_URL + CURRENT_CONTROLLER + "/delete_supplier", {
							supplierId: supplierId
						}, function (data) {
							if(data == -1) {
								Alerts.showError("Error!", "Unable to delete supplier ID <b>" + supplierId + "</b>. The selected supplier has already delivered an item to the inventory.");
							}
							else if(data == 0) {
								$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);
								Alerts.showError("Error!", "Cannot find supplier ID <b>" + supplierId + "</b>. The selected supplier has been deleted by another session.");
							}
							else {
								$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);
								Alerts.showSuccess("Success", "Supplier ID <b>" + supplierId + "</b> has successfully been deleted.");
							}
						});
					});
				}
			});
		}
	};

	var refreshSupplierList = function () {
		NProgress.start();

		$dtSuppliers.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_suppliers", {}, function (data) {
			var suppliers = JSON.parse(data);

			for(var i = 0; i < suppliers.length; i++) {
				$dtSuppliers.row.add([
					suppliers[i]["id"],
					suppliers[i]["name"],
					suppliers[i]["contact_info"],
					numeral(suppliers[i]["total_amount_delivered"]).format("0,0.00")
				]);
			}

			$dtSuppliers.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var viewModalReceiveDelivery = function () {
		if(ktSuppliersRowPos >= 0) {
			ktSuppliersSelectedRowPos = ktSuppliersRowPos;
			var supplierId = $subDtSuppliers._("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/supplier_exists", {
				supplierId: supplierId
			}, function (data) {
				if(data == 0) {
					$subDtSuppliers.fnDeleteRow($subDtSuppliers.$("tr", { "filter": "applied" })[ktSuppliersSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find supplier ID <b>" + supplierId + "</b>. The selected supplier has been deleted by another session.");
				}
				else {
					$dtReceiveDelivery.clear();
					$itemId.val("");
					$description.val("");
					$quantity.val("");
					$totalAmountReceiveDelivery.text("0.00");

					$modalReceiveDelivery.modal({ keyboard: true });

					NProgress.start();
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_supplier", {
						supplierId: supplierId
					}, function (data) {
						var supplier = JSON.parse(data);

						$("#supplier_id_receive_delivery").text(supplier.id);
						$("#supplier_name_receive_delivery").text(supplier.name);
						$("#supplier_contact_info_receive_delivery").text(supplier.contact_info);

					}).done(function () {
						NProgress.done();
					});
				}
			});
		}
	};

	var findItem = function (itemId) {
		NProgress.start()
		$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
			itemId: itemId
		}, function (data) {
			if(data == 1) {
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_item", {
					itemId: itemId
				}, function (data) {
					var item = JSON.parse(data);

					$description.val(item.description);
					$quantity.focus();
				});
			}
			else {
				$description.val("");
			}
		}).done(function () {
			NProgress.done();
		});
	};

	var addItemToDeliveryList = function (itemId, quantity) {
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

						for(var i = 0; i < $dtReceiveDelivery.rows().data().length; i++) {
							if($dtReceiveDelivery.row(i).data()[0] == itemId) {
								dtRow = $dtReceiveDelivery.row(i);
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
							$dtReceiveDelivery.row.add([
								item.id,
								item.description,
								quantity,
								numeral(item.actual_price).format("0.00"),
								numeral(parseFloat(item.actual_price) * quantity).format("0.00")
							]).draw(false);
						}

						$totalAmountReceiveDelivery.text(numeral(getTotalAmount()).format("0,0.00"));

						$itemId.focus();
						$itemId.val("");
						$description.val("");
						$quantity.val("");
					});
				}
			}
		});
	};

	var removeItemFromDelivery = function () {
		if(ktReceiveDeliveryRowPos >= 0) {
			ktReceiveDeliverySelectedRowPos = ktReceiveDeliveryRowPos;
			$subDtReceiveDelivery.fnDeleteRow($subDtReceiveDelivery.$("tr", { "filter": "applied" })[ktReceiveDeliverySelectedRowPos]);
			$totalAmountReceiveDelivery.text(numeral(getTotalAmount()).format("0,0.00"));
		}
	};

	var searchItem = function () {
		NProgress.start();

		$dtItems.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_items", {}, function (data) {
			var items = JSON.parse(data);

			for(var i = 0; i < items.length; i++) {
				var sellingPrice;

				$dtItems.row.add([
					items[i]["id"],
					items[i]["description"],
					numeral(items[i]["quantity"]).format("0,0"),
					numeral(items[i]["actual_price"]).format("0,0.00")
				]);
			}

			$modalSearchItem.modal({ keyboard: true });
			$dtItems.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var getTotalAmount = function () {
		var totalAmount = 0;
		
		for(var i = 0; i < $dtReceiveDelivery.rows().data().length; i++) {
			totalAmount += parseFloat($dtReceiveDelivery.row(i).data()[4]);
		}

		return totalAmount;
	};

	var saveDelivery = function () {
		var numOfItems = $dtReceiveDelivery.rows().data().length;

		if(numOfItems >= 1) {
			var itemIds = [];

			for(var i = 0; i < numOfItems; i++) {
				itemIds.push($dtReceiveDelivery.row(i).data()[0]);
			}

			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_nonexistent_items", {
				itemIds: itemIds
			}, function (data) {
				itemIdsOfNonexistentItems = JSON.parse(data);

				if(itemIdsOfNonexistentItems.length >= 1) {
					var removedItems = [];

					for(var i = 0; i < numOfItems; i++) {
						for(var j = 0; j < itemIdsOfNonexistentItems.length; j++) {
							try {
								/**
								 * produces an error when an item is already removed
								 */
								if($dtReceiveDelivery.row(i).data()[0] == itemIdsOfNonexistentItems[j]) {
									$dtReceiveDelivery.row(i).remove().draw(false);
								}
							}
							catch(exception) { /* handle exception here */ }
						}
					}

					Alerts.showError("Error!", "Some items were removed from the delivery list because those items don't exist anymore in the inventory. Please check the delivery list again.");
				}
				else {
					items = [];
					for(var i = 0; i < numOfItems; i++) {
						var tempItem = {};

						tempItem.itemId = $dtReceiveDelivery.row(i).data()[0];
						tempItem.quantity = $dtReceiveDelivery.row(i).data()[2];
						tempItem.actualPrice = $dtReceiveDelivery.row(i).data()[3];

						items.push(tempItem);
					}

					$.post(BASE_URL + CURRENT_CONTROLLER + "/new_delivery", {
						items: items,
						supplierId: $("#supplier_id_receive_delivery").text(),
						userId: USER_ID
					}, function (data) {
						$dtReceiveDelivery.clear();
						$itemId.val("");
						$description.val("");
						$quantity.val("");
						$totalAmountReceiveDelivery.text("0.00");


						$modalReceiveDelivery.modal("hide");

						Alerts.showSuccess("Success", "Successfully saved a new delivery");
					});
				}
			});
		}
		else {
			Alerts.showError("Error!", "There are no items to be delivered.")
		}
	};

	var events = (function () {
		refreshSupplierList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktSuppliers.fnBlur();
		    $(this).find("input:visible:first").focus();

		    if($(this).attr("id") == $modalReceiveDelivery.attr("id")) {
		    	$dtReceiveDelivery.draw();
		    }
		    else if($(this).attr("id") == $modalSearchItem.attr("id")) {
		    	$dtItems.draw();
		    	$ktItems.fnSetPosition(0, 0);
		    }
		    else if($(this).attr("id") == $modalViewSupplier.attr("id")) {
		    	$dtDeliveries.draw();
		    }
		    else if($(this).attr("id") == $modalViewDelivery.attr("id")) {
		    	$dtDeliveryItems.draw();
		    }
		});

		$ktSuppliers.event.focus(null, null, function (node, x, y) {
			$btnDeleteSupplier.removeClass("disabled");
			$btnViewSupplier.removeClass("disabled");
			$btnUpdateSupplier.removeClass("disabled");
			$btnReceiveDelivery.removeClass("disabled");
			ktSuppliersRowPos = y;
		});

		$ktSuppliers.event.blur(null, null, function (node, x, y) {
			$btnDeleteSupplier.addClass("disabled");
			$btnViewSupplier.addClass("disabled");
			$btnUpdateSupplier.addClass("disabled");
			$btnReceiveDelivery.addClass("disabled");
			ktSuppliersRowPos = -1;
		});

		$ktItems.event.action(null, null, function (node, x, y) {
			$itemId.val($subDtItems._("tr", { "filter": "applied" })[y][0]);
			$description.val($subDtItems._("tr", { "filter": "applied" })[y][1]);
			$modalSearchItem.modal("hide");

			$quantity.focus();
			$ktItems.fnBlur();
		});

		$ktReceiveDelivery.event.focus(null, null, function (node, x, y) {
			$btnRemoveItemFromDelivery.removeClass("disabled");
			ktReceiveDeliveryRowPos = y;
		});

		$ktReceiveDelivery.event.blur(null, null, function (node, x, y) {
			$btnRemoveItemFromDelivery.addClass("disabled");
			ktReceiveDeliveryRowPos = -1;
		});

		$ktDeliveries.event.focus(null, null, function (node, x, y) {
			$btnViewDelivery.removeClass("disabled");
			ktDeliveriesRowPos = y;
		});

		$ktDeliveries.event.blur(null, null, function (node, x, y) {
			$btnViewDelivery.addClass("disabled");
			ktDeliveriesRowPos = -1;
		});

		$btnNewSupplier.click(function () {
			newSupplier();
		});

		$btnUpdateSupplier.click(function () {
			updateSupplier();
		});

		$btnViewSupplier.click(function () {
			viewSupplier();
		});

		$btnViewDelivery.click(function () {
			viewDelivery();
		});

		$btnDeleteSupplier.click(function () {
			deleteSupplier();
		});

		$btnReceiveDelivery.click(function () {
			viewModalReceiveDelivery();
		});

		$btnRefreshSupplierList.click(function () {
			refreshSupplierList();
		});

		$itemId.keypress(function (e) {
			if(e.keyCode == 13) {
				findItem($(this).val());
			}
		});

		$btnAddItemToDelivery.click(function () {
			addItemToDeliveryList($itemId.val(), $quantity.val());
		});

		$btnRemoveItemFromDelivery.click(function () {
			removeItemFromDelivery();
		});

		$quantity.keypress(function (e) {
			if(e.keyCode == 13) {
				addItemToDeliveryList($itemId.val(), $(this).val());
			}
		});

		$btnSearchItem.click(function () {
			searchItem();
		});

		$btnSaveDelivery.click(function () {
			Alerts.showConfirm("Are you sure?", "This delivery can't be changed later.", function () {
				saveDelivery();
			});
		});
	})();
})();