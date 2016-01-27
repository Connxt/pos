var Items = (function () {
	var $tblItems = $("#tbl_items"),
		$dtItems = $tblItems.DataTable({
			// "dom": 'T<"clear">lfrtip',
			"dom": "<'top pull-left' l> <'top pull-right' frT> <'bottom' tip>",
	        "tableTools": {
	            "sSwfPath": BASE_URL + "assets/swf/copy_csv_xls_pdf.swf",
	            "aButtons": [
					{ 'sExtends':'copy', "mColumns": "visible", "oSelectorOpts": { filter: 'applied', order: 'current' } },
					{ 'sExtends':'xls', "mColumns": "visible", "oSelectorOpts": { filter: 'applied', order: 'current' } },
					{ 'sExtends':'pdf', "mColumns": "visible", "oSelectorOpts": { filter: 'applied', order: 'current' } },
					{ 'sExtends':'print', "mColumns": "visible", "oSelectorOpts": { filter: 'applied', order: 'current' } }
				]
	        },
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Item ID
				{ "sClass": "text-left", "sWidth": "40%" }, // Description
				{ "sClass": "text-right font-bold", "sWidth": "10%" }, // Quantity
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Actual Price
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Selling Price Cash
				{ "sClass": "text-right font-bold", "sWidth": "20%" }, // Selling Price Credit Card
				{ "sClass": "text-right font-bold", "sWidth": "20%" } // Selling Price Credit
			],
			"columnDefs": [{
				"targets": [5, 6],
				"visible": false
			}]
		}),
		$subDtItems = $tblItems.dataTable(),
		$ktItems = new $.fn.dataTable.KeyTable($subDtItems),
		ktItemsRowPos = -1,
		ktItemsSelectedRowPos = -1;

	var $btnNewItem = $("#btn_new_item"),
		$btnDeleteItem = $("#btn_delete_item"),
		$btnUpdateItem = $("#btn_update_item"),
		$btnRefreshItemList = $("#btn_refresh_item_list"),
		$toggleSellingPrice = $("a.toggle-selling-price");

	var $modalNewItem = $("#modal_new_item"),
		$modalUpdateItem = $("#modal_update_item");

	var newItem = function () {
		var $frmNewItem = $("#frm_new_item");
		var frmNewItemValidator = $frmNewItem.validate({
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo("div#" + element.attr("name") + "_error");
			},
			rules: {
				item_id_new: { required: true },
				description_new: { required: true },
				actual_price_new: { required: true, number: true, min: 1 },
				selling_price_cash_new: { required: true, number: true, min: 1 },
				selling_price_credit_card_new: { required: true, number: true, min: 1 },
				selling_price_credit_new: { required: true, number: true, min: 1 }
			},
			messages: {
				item_id_new: {
					required: "Please enter the item's ID"
				},
				description_new: {
					required: "Please enter the item's description"
				},
				actual_price_new: {
					required: "Please enter the item's actual price",
					number: "Please enter a valid price",
					min: "Actual price should not be less than 1.00"
				},
				selling_price_cash_new: {
					required: "Please enter the item's selling price",
					number: "Please enter a valid price",
					min: "Selling price should not be less than 1.00"
				},
				selling_price_credit_card_new: {
					required: "Please enter the item's selling price",
					number: "Please enter a valid price",
					min: "Selling price should not be less than 1.00"
				},
				selling_price_credit_new: {
					required: "Please enter the item's selling price",
					number: "Please enter a valid price",
					min: "Selling price should not be less than 1.00"
				}
			},
			submitHandler: function (form) {
				NProgress.start();
				$.post(BASE_URL + CURRENT_CONTROLLER + "/new_item", {
					itemId: $("#item_id_new").val(),
					description: $("#description_new").val(),
					actualPrice: $("#actual_price_new").val(),
					sellingPriceCash: $("#selling_price_cash_new").val(),
					sellingPriceCreditCard: $("#selling_price_credit_card_new").val(),
					sellingPriceCredit: $("#selling_price_credit_new").val()
				}, function (data) {
					if(data == 0) {
						$modalNewItem.modal("hide");
						Alerts.showError("Error!", "Item ID <b>" + $("#item_id_new").val() + "</b> is already in use.", function () {
							$modalNewItem.modal({ keyboard: true });
						});
					}
					else {
						var item = JSON.parse(data);

						$dtItems.row.add([
							item.id,
							item.description,
							item.quantity,
							numeral(item.actual_price).format("0,0.00"),
							numeral(item.selling_price_cash).format("0,0.00"),
							numeral(item.selling_price_credit_card).format("0,0.00"),
							numeral(item.selling_price_credit).format("0,0.00")
						]).draw(false);

						$frmNewItem[0].reset();
						$modalNewItem.modal("hide");

						Alerts.showSuccess("Success", "Successfully added a new item");
					}
				}).done(function () {
					NProgress.done();
				});
			}
		});

		frmNewItemValidator.resetForm();
		$frmNewItem[0].reset();
		$modalNewItem.modal({ keyboard: true });
	};

	var updateItem = function () {
		if(ktItemsRowPos >= 0) {
			var $frmUpdateItem = $("#frm_update_item"),
				$itemIdUpdate = $("#item_id_update"),
				$descriptionUpdate = $("#description_update"),
				$actualPriceUpdate = $("#actual_price_update"),
				$sellingPriceCashUpdate = $("#selling_price_cash_update"),
				$sellingPriceCreditCardUpdate = $("#selling_price_credit_card_update"),
				$sellingPriceCreditUpdate = $("#selling_price_credit_update");

			var frmUpdateItemValidator = $frmUpdateItem.validate({
				errorElement: "div",
				errorPlacement: function (error, element) {
					error.appendTo("div#" + element.attr("name") + "_error");
				},
				rules: {
					description_update: { required: true },
					actual_price_update: { required: true, number: true, min: 1 },
					selling_price_cash_update: { required: true, number: true, min: 1 },
					selling_price_credit_card_update: { required: true, number: true, min: 1 },
					selling_price_credit_update: { required: true, number: true, min: 1 }
				},
				messages: {
					description_update: {
						required: "Please enter the item's description"
					},
					actual_price_update: {
						required: "Please enter the item's actual price",
						number: "Please enter a valid price",
						min: "Actual price should not be less than 1.00"
					},
					selling_price_cash_update: {
						required: "Please enter the item's selling price",
						number: "Please enter a valid price",
						min: "Selling price should not be less than 1.00"
					},
					selling_price_credit_card_update: {
						required: "Please enter the item's selling price",
						number: "Please enter a valid price",
						min: "Selling price should not be less than 1.00"
					},
					selling_price_credit_update: {
						required: "Please enter the item's selling price",
						number: "Please enter a valid price",
						min: "Selling price should not be less than 1.00"
					}
				},
				submitHandler: function (form) {
					NProgress.start();

					var itemId = $itemIdUpdate.val();

					$.post(BASE_URL + CURRENT_CONTROLLER + "/update_item", {
						itemId: itemId,
						description: $descriptionUpdate.val(),
						actualPrice: $actualPriceUpdate.val(),
						sellingPriceCash: $sellingPriceCashUpdate.val(),
						sellingPriceCreditCard: $sellingPriceCreditCardUpdate.val(),
						sellingPriceCredit: $sellingPriceCreditUpdate.val()
					}, function (data) {
						if(data == 0) {
							$frmUpdateItem[0].reset();
							$modalUpdateItem.modal("hide");
							$subDtItems.fnDeleteRow($subDtItems.$("tr", { "filter": "applied" })[ktItemsSelectedRowPos]);

							Alerts.showError("Error!", "Cannot find item ID <b>" + itemId + "</b>. The selected item has been deleted by another session.");
						}
						else {
							var item = JSON.parse(data);

							$subDtItems.fnUpdate([
								item.id,
								item.description,
								item.quantity,
								numeral(item.actual_price).format("0,0.00"),
								numeral(item.selling_price_cash).format("0,0.00"),
								numeral(item.selling_price_credit_card).format("0,0.00"),
								numeral(item.selling_price_credit).format("0,0.00")
							], $subDtItems.$("tr", { "filter": "applied" })[ktItemsSelectedRowPos]);

							$frmUpdateItem[0].reset();
							$modalUpdateItem.modal("hide");

							Alerts.showSuccess("Success", "Successfully updated the selected item");
						}
					}).done(function () {
						NProgress.done();
					});
				}
			});

			ktItemsSelectedRowPos = ktItemsRowPos;
			var itemId = $subDtItems._("tr", { "filter": "applied" })[ktItemsSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
				itemId: itemId
			}, function (data) {
				if(data == 0) {
					$subDtItems.fnDeleteRow($subDtItems.$("tr", { "filter": "applied" })[ktItemsSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find item ID <b>" + itemId + "</b>. The selected item has been deleted by another session.");
				}
				else {
					frmUpdateItemValidator.resetForm();
					$frmUpdateItem[0].reset();
					$modalUpdateItem.modal({ keyboard: true });

					NProgress.start();
					$.post(BASE_URL + CURRENT_CONTROLLER + "/get_item", {
						itemId: itemId
					}, function (data) {
						var item = JSON.parse(data);

						$itemIdUpdate.val(item.id);
						$descriptionUpdate.val(item.description);
						$actualPriceUpdate.val(item.actual_price);
						$sellingPriceCashUpdate.val(item.selling_price_cash);
						$sellingPriceCreditCardUpdate.val(item.selling_price_credit_card);
						$sellingPriceCreditUpdate.val(item.selling_price_credit);

					}).done(function () {
						NProgress.done();
					});
				}
			});
		}
	};

	var deleteItem = function () {
		if(ktItemsRowPos >= 0) {
			ktItemsSelectedRowPos = ktItemsRowPos;
			var itemId = $subDtItems._("tr", { "filter": "applied" })[ktItemsSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/item_exists", {
				itemId: itemId
			}, function (data) {
				if(data == 0) {
					$subDtItems.fnDeleteRow($subDtItems.$("tr", { "filter": "applied" })[ktItemsSelectedRowPos]);
					Alerts.showError("Error!", "Cannot find item ID <b>" + itemId + "</b>. The selected item has been deleted by another session.");
				}
				else {
					Alerts.showConfirm("Warning!", "Are you sure you want to delete this item?", function () {
						$.post(BASE_URL + CURRENT_CONTROLLER + "/delete_item", {
							itemId: itemId
						}, function (data) {
							if(data == -2) {
								Alerts.showError("Error!", "Unable to delete item ID <b>" + itemId + "</b>. A supplier has already delivered this item.");
							}
							else if(data == -1) {
								Alerts.showError("Error!", "Unable to delete item ID <b>" + itemId + "</b>. The selected item has already been used in a transaction.");
							}
							else if(data == 0) {
								$subDtItems.fnDeleteRow($subDtItems.$("tr", { "filter": "applied" })[ktItemsSelectedRowPos]);
								Alerts.showError("Error!", "Cannot find item ID <b>" + itemId + "</b>. The selected item has been deleted by another session.");
							}
							else {
								$subDtItems.fnDeleteRow($subDtItems.$("tr", { "filter": "applied" })[ktItemsSelectedRowPos]);
								Alerts.showSuccess("Success", "Item ID <b>" + itemId + "</b> has successfully been deleted.");
							}
						});
					});
				}
			});
		}
	};

	var refreshItemList = function () {
		NProgress.start();

		$dtItems.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_items", {}, function (data) {
			var items = JSON.parse(data);

			for(var i = 0; i < items.length; i++) {
				$dtItems.row.add([
					items[i]["id"],
					items[i]["description"],
					numeral(items[i]["quantity"]).format("0,0"),
					numeral(items[i]["actual_price"]).format("0,0.00"),
					numeral(items[i]["selling_price_cash"]).format("0,0.00"),
					numeral(items[i]["selling_price_credit_card"]).format("0,0.00"),
					numeral(items[i]["selling_price_credit"]).format("0,0.00")
				]);
			}

			$dtItems.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var events = (function () {
		refreshItemList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktItems.fnBlur();
		    $(this).find("input:visible:first").focus();
		});

		$ktItems.event.focus(null, null, function (node, x, y) {
			$btnDeleteItem.removeClass("disabled");
			$btnUpdateItem.removeClass("disabled");
			ktItemsRowPos = y;
		});

		$ktItems.event.blur(null, null, function (node, x, y) {
			$btnDeleteItem.addClass("disabled");
			$btnUpdateItem.addClass("disabled");
			ktItemsRowPos = -1;
		});

		$btnNewItem.click(function () {
			newItem();
		});

		$btnUpdateItem.click(function () {
			updateItem();
		});

		$btnDeleteItem.click(function () {
			deleteItem();
		});

		$btnRefreshItemList.click(function () {
			refreshItemList();
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

			$dtItems.column(columnToBeVisible).visible(true);
			for(var i = 0; i < columnsToBeInvisible.length; i++) {
				$dtItems.column(columnsToBeInvisible[i]).visible(false);
			}

			NProgress.done();
		});
	})();
})();