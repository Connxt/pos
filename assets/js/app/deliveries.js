var Deliveries = (function () {
	var $tblDeliveries = $("#tbl_deliveries"),
		$dtDeliveries = $tblDeliveries.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Delivery ID
				{ "sClass": "text-left", "sWidth": "30%" }, // Supplier
				{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Total Amount
				{ "sClass": "text-left", "sWidth": "20%" }, // User
				{ "sClass": "text-left", "sWidth": "15%" } // Date
			],
			"order": [ [0, "desc"] ]
		}),
		$subDtDeliveries = $tblDeliveries.dataTable(),
		$ktDeliveries = new $.fn.dataTable.KeyTable($subDtDeliveries),
		ktDeliveriesRowPos = -1,
		ktDeliveriesSelectedRowPos = -1;

	var $tblDeliveryItems = $("#tbl_delivery_items"),
		$dtDeliveryItems = $tblDeliveryItems.DataTable({
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
			"scrollY": "200px"
		}),
		$subDtDeliveryItems = $tblDeliveryItems.dataTable(),
		$ktDeliveryItems = new $.fn.dataTable.KeyTable($subDtDeliveryItems);

	var $btnViewDelivery = $("#btn_view_delivery"),
		$btnRefreshDeliveryList = $("#btn_refresh_delivery_list");

	var $modalViewDelivery = $("#modal_view_delivery");

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
						$("#supplier_id").text(delivery.supplier_id);
						$("#supplier_name").text(delivery.supplier_name);
						$("#supplier_contact_info").text(delivery.contact_info);
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

	var refreshDeliveryList = function () {
		NProgress.start();

		$dtDeliveries.clear().draw();

		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_deliveries", {}, function (data) {
			var deliveries = JSON.parse(data);

			for(var i = 0; i < deliveries.length; i++) {
				$dtDeliveries.row.add([
					deliveries[i]["id"],
					deliveries[i]["supplier_name"],
					numeral(deliveries[i]["total_amount"]).format("0,0.00"),
					deliveries[i]["user_last_name"] + ", " + deliveries[i]["user_first_name"] + " " + deliveries[i]["user_middle_name"].substring(0, 1) + ".",
					moment(deliveries[i]["created_at"]).format("MMM DD, YYYY")
				]);
			}

			$dtDeliveries.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var events = (function () {
		refreshDeliveryList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktDeliveries.fnBlur();
		    $(this).find("input:visible:first").focus();

		    if($(this).attr("id") == $modalViewDelivery.attr("id")) {
		    	$dtDeliveryItems.draw();
		    }
		});

		$ktDeliveries.event.focus(null, null, function (node, x, y) {
			$btnViewDelivery.removeClass("disabled");
			ktDeliveriesRowPos = y;
		});

		$ktDeliveries.event.blur(null, null, function (node, x, y) {
			$btnViewDelivery.addClass("disabled");
			ktDeliveriesRowPos = -1;
		});

		$btnViewDelivery.click(function() {
			viewDelivery();
		});

		$btnRefreshDeliveryList.click(function () {
			refreshDeliveryList();
		});
	})();
})();