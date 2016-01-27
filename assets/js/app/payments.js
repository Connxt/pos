var Payments = (function () {
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

	var $tblPayments = $("#tbl_payments"),
	$dtPayments = $tblPayments.DataTable({
		"columns": [
			{ "sClass": "text-left", "sWidth": "15%" }, // Payment ID
			{ "sClass": "text-left", "sWidth": "20%" }, // Customer Name
			// { "sClass": "text-right font-bold", "sWidth": "10%" }, // Trade-in Amount
			{ "sClass": "text-right font-bold", "sWidth": "15%" }, // Amount Paid
			{ "sClass": "text-left", "sWidth": "10%" }, // Type
			{ "sClass": "text-left", "sWidth": "10%" }, // Date
			{ "sClass": "text-left", "sWidth": "20%" } // User
		],
		"order": [ [0, "desc"] ]
	}),
	$subDtPayments = $tblPayments.dataTable(),
	$ktPayments = new $.fn.dataTable.KeyTable($subDtPayments),
	ktPaymentsRowPos = -1,
	ktPaymentsSelectedRowPos = -1;

	var $tblDailySales = $("#tbl_daily_sales"),
	$dtDailySales = $tblDailySales.DataTable({
		"columns": [
			{ "sClass": "text-left", "sWidth": "15%" }, // Payment ID
			{ "sClass": "text-right font-bold", "sWidth": "85%" }, // Trade-in Amount
		],
		"order": [ [0, "desc"] ]
	}),
	$subDtDailySales = $tblDailySales.dataTable(),
	$ktDailySales = new $.fn.dataTable.KeyTable($subDtDailySales),
	ktDailySalesRowPos = -1,
	ktDailySalesSelectedRowPos = -1;

	// var $tblTradeIns = $("#tbl_trade_ins"),
	// 	$dtTradeIns = $tblTradeIns.DataTable({
	// 		"columns": [
	// 			{ "sClass": "text-left", "sWidth": "4em" }, // Item ID
	// 			{ "sClass": "text-left", "sWidth": "25em" }, // Description
	// 			{ "sClass": "text-right font-bold", "sWidth": "2em" }, // Quantity
	// 			{ "sClass": "text-right font-bold", "sWidth": "5em" }, // Price
	// 			{ "sClass": "text-right font-bold", "sWidth": "5em" } // Total Price
	// 		],
	// 		"sorting": [],
	// 		"filter": false,
	// 		"paging": false,
	// 		"info": false,
	// 		"scrollY": "200px"
	// 	}),
	// 	$subDtTradeIns = $tblTradeIns.dataTable(),
	// 	$ktTradeIns = new $.fn.dataTable.KeyTable($subDtTradeIns);

	var $tblReceipt = $("#tbl_receipt"),
		$dtReceipt = $tblReceipt.DataTable({
			"columns": [
				{ "sClass": "text-left", "sWidth": "10%" }, // Type
				{ "sClass": "text-left", "sWidth": "10%" }, // ID
				{ "sClass": "text-left", "sWidth": "45%" }, // Description
				{ "sClass": "text-right font-bold editable quantity", "sWidth": "5%" }, // Quantity
				{ "sClass": "text-right font-bold editable price", "sWidth": "15%" }, // Price
				{ "sClass": "text-right font-bold", "sWidth": "15%" } // Total Price
			],
			"sorting": [],
			"filter": false,
			"paging": false,
			"info": false,
			"scrollY": "200px"
		}),
		$subDtReceipt = $tblReceipt.dataTable(),
		$ktReceipt = new $.fn.dataTable.KeyTable($subDtReceipt);

	var $btnViewPayment = $("#btn_view_payment"),
		$btnRefreshPaymentList = $("#btn_refresh_payment_list"),
		$btnRefreshDailySales = $("#btn_refresh_daily_sales");

	var $modalViewPayment = $("#modal_view_payment");

	var viewPayment = function () {
		if(ktPaymentsRowPos >= 0) {
			ktPaymentsSelectedRowPos = ktPaymentsRowPos;
			var paymentId = $subDtPayments._("tr", { "filter": "applied" })[ktPaymentsSelectedRowPos][0];

			$.post(BASE_URL + CURRENT_CONTROLLER + "/get_payment", {
				paymentId: paymentId
			}, function (data) {
				var payment = JSON.parse(data);

				$("#payment_id").text(payment.id);
				$("#customer_name").text(payment.customer_last_name + ", " + payment.customer_first_name + " " + payment.customer_middle_name.substring(0, 1));
				$("#user_name").text(payment.user_last_name + ", " + payment.user_first_name + " " + payment.user_middle_name.substring(0, 1));
				// $("#trade_in_amount").text(numeral(payment.trade_in_amount).format("0,0.00"));
				$("#payment_date").text(moment(payment.created_at).format("MMM DD, YYYY"));
				$("#contact_info").text(payment.contact_info);
				$("#amount_paid").text(numeral(payment.amount_paid).format("0,0.00"));

				// $dtTradeIns.clear().draw();
				// $.post(BASE_URL + CURRENT_CONTROLLER + "/get_trade_ins_via_payment_id", {
				// 	paymentId: paymentId
				// }, function (data) {
				// 	var tradeIns = JSON.parse(data);

				// 	for(var i = 0; i < tradeIns.length; i++) {
				// 		$dtTradeIns.row.add([
				// 			tradeIns[i]["item_id"],
				// 			tradeIns[i]["description"],
				// 			tradeIns[i]["quantity"],
				// 			numeral(tradeIns[i]["price"]).format("0,0.00"),
				// 			numeral(parseFloat(tradeIns[i]["quantity"]) * parseFloat(tradeIns[i]["price"])).format("0,0.00")
				// 		]);
				// 	}
				// });

				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipt", {
					receiptId: payment.receipt_id
				}, function (data) {
					var receipt = JSON.parse(data);

					$("#receipt_id").text(receipt.id),
					$("#receipt_date").text(moment(receipt.created_at).format("MMM DD, YYYY"));
					$("#mode_of_payment").text(receipt.mode_of_payment);
					$("#due_date").text((receipt.mode_of_payment == CONFIG.MODE_OF_PAYMENTS.CREDIT) ? moment(receipt.due_date).format("MMM DD, YYYY") : "N/A");
					$("#receipt_total_amount").text(numeral(receipt.total_amount).format("0,0.00"));
					$("#receipt_balance").text(numeral(receipt.balance).format("0,0.00"));
				});

				$dtReceipt.clear().draw();
				$.post(BASE_URL + CURRENT_CONTROLLER + "/get_receipt_services", {
					receiptId: payment.receipt_id
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
						receiptId: payment.receipt_id
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

				$modalViewPayment.modal({ keyboard: true });
			});
		}
	};

	var refreshPaymentList = function () {
		NProgress.start();

		$dtPayments.clear().draw();
		$dtDailySales.clear().draw();
		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_payments", {}, function (data) {
			var dailySales = [],
				payments = JSON.parse(data);

			for(var i = 0; i < payments.length; i++) {
				$dtPayments.row.add([
					payments[i]["id"],
					payments[i]["customer_last_name"] + ", " + payments[i]["customer_first_name"] + " " + payments[i]["customer_middle_name"].substring(0, 1) + ".",
					// numeral(payments[i]["trade_in_amount"]).format("0,0.00"),
					numeral(payments[i]["amount_paid"]).format("0,0.00"),
					payments[i]["type_of_payment"],
					moment(payments[i]["created_at"]).format("MMM DD, YYYY"),
					payments[i]["user_last_name"] + ", " + payments[i]["user_first_name"] + " " + payments[i]["user_middle_name"].substring(0, 1) + "."
				]);

				var dateExists = false;
				for(var j = 0; j < dailySales.length; j++) {
					if(dailySales[j].date === moment(payments[i]["created_at"]).format("MMM DD, YYYY")) {
						dailySales[j].sales += Number(payments[i]["amount_paid"]);
						dateExists = true;
						break;
					}
				}
				if(!dateExists) {
					dailySales.push({
						date: moment(payments[i]["created_at"]).format("MMM DD, YYYY"),
						sales: Number(payments[i]["amount_paid"])
					});
				}
			}
			
			for(var i = 0; i < dailySales.length; i++) {
				$dtDailySales.row.add([
					dailySales[i]["date"],
					numeral(dailySales[i]["sales"]).format("0,0.00")
				]);
			};

			$dtPayments.draw();
			$dtDailySales.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var refreshDailySales = function () {
		NProgress.start();

		$dtDailySales.clear().draw();
		$.post(BASE_URL + CURRENT_CONTROLLER + "/get_all_payments", {}, function (data) {
			var dailySales = [],
				payments = JSON.parse(data);

			for(var i = 0; i < payments.length; i++) {
				var dateExists = false;
				for(var j = 0; j < dailySales.length; j++) {
					if(dailySales[j].date === moment(payments[i]["created_at"]).format("MMM DD, YYYY")) {
						dailySales[j].sales += Number(payments[i]["amount_paid"]);
						dateExists = true;
						break;
					}
				}
				if(!dateExists) {
					dailySales.push({
						date: moment(payments[i]["created_at"]).format("MMM DD, YYYY"),
						sales: Number(payments[i]["amount_paid"])
					});
				}
			}
			
			for(var i = 0; i < dailySales.length; i++) {
				$dtDailySales.row.add([
					dailySales[i]["date"],
					numeral(dailySales[i]["sales"]).format("0,0.00")
				]);
			};

			$dtDailySales.draw();
		}).done(function () {
			NProgress.done();
		});
	};

	var events = (function () {
		refreshPaymentList();

		$("div.modal").on("shown.bs.modal", function () {
			$ktPayments.fnBlur();
			$(this).find("input:visible:first").focus();

			if($(this).attr("id") == $modalViewPayment.attr("id")) {
				// $dtTradeIns.draw();
				$dtReceipt.draw();
			}
		});

		$ktPayments.event.focus(null, null, function (node, x, y) {
			$btnViewPayment.removeClass("disabled");
			ktPaymentsRowPos = y;
		});

		$ktPayments.event.blur(null, null, function (node, x, y) {
			$btnViewPayment.addClass("disabled");
			ktPaymentsRowPos = -1;
		});

		$btnViewPayment.click(function() {
			viewPayment();
		});

		$btnRefreshPaymentList.click(function () {
			refreshPaymentList();
		});

		$btnRefreshDailySales.click(function () {
			refreshDailySales();
		});
	})();
})();