<!DOCTYPE html>
<html>
<head>
	<title>Cashiering</title>
	<?php include($path . 'css.php'); ?>
</head>
<body class="skin-blue fixed">
	<div class="wrapper">
		<header class="main-header">
			<?php include($path . 'header.php'); ?>
		</header>
		<aside class="main-sidebar">
			<?php include($path . 'sidebar.php'); ?>
		</aside>
		<div class="content-wrapper">
			<section class="content">
				<div class="row">
					<div class="col-lg-8">
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="row">
									<div class="col-lg-2" style="padding-right: 0px;">
										<button id="btn_toggle_search_panel" type="button" class="btn btn-default btn-block resettable"><strong><span id="search_panel_label">Service</span>&nbsp;&nbsp;<span class="glyphicon glyphicon-lock"></span></strong></button>
									</div>

									<div id="item_search_panel" style="display: none;">
										<div class="col-lg-2">
											<input id="item_id" type="text" class="form-control resettable" placeholder="Item ID..." />
										</div>
										<div class="col-lg-4" style="padding-left: 0px;">
											<input id="item_description" type="text" class="form-control resettable" placeholder="Description..." readonly/>
										</div>
										<div class="col-lg-2" style="padding-left: 0px;">
											<input id="item_quantity" type="number" class="form-control resettable" placeholder="Qty..." />
										</div>
										<div class="col-lg-1" style="padding-left: 0px;">
											<button id="btn_add_item" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-ok"></span></button>
										</div>
										<div class="col-lg-1" style="padding-left: 0px;">
											<button id="btn_search_item" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-search"></span></button>
										</div>
									</div>

									<div id="service_search_panel" style="display: none;">
										<div class="col-lg-2">
											<input id="service_id" type="text" class="form-control resettable" placeholder="Service ID..." />
										</div>
										<div class="col-lg-6" style="padding-left: 0px;">
											<input id="service_description" type="text" class="form-control resettable" placeholder="Description..." readonly/>
										</div>
										<div class="col-lg-1" style="padding-left: 0px;">
											<button id="btn_add_service" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-ok"></span></button>
										</div>
										<div class="col-lg-1" style="padding-left: 0px;">
											<button id="btn_search_service" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-search"></span></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4" style="padding-left: 0px;">
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="row">
									<input id="customer_id" type="hidden" />
									<div class="col-lg-8">
										<input id="customer_name" type="text" class="form-control resettable" placeholder="Customer Name..." readonly/>
									</div>
									<div class="col-lg-2" style="padding-left: 0px;">
										<button id="btn_new_customer" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-plus"></span></button>
									</div>
									<div class="col-lg-2" style="padding-left: 0px;">
										<button id="btn_search_customer" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-search"></span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default" style="margin-bottom: 0px;">
							<div class="panel-body">
								<div class="row">
									<div class="col-lg-9">
										<table class="table" id="tbl_receipt" width="100%">
											<thead>
												<tr>
													<th>Type</th>
													<th>ID</th>
													<th>Description</th>
													<th>Qty</th>
													<th>Price</th>
													<th>Total</th>
													<th>Actual Price</th> <!-- hidden -->
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
									<div class="col-lg-3">
										<div class="form-group">
											<label for="grand_total">Grand Total:</label>
											<input id="grand_total" name="grand_total" type="number" class="form-control text-right resettable" readonly/>
										</div>
										<div class="form-group">
											<label for="amount_to_pay">Amount To Pay:</label>
											<input id="amount_to_pay" name="amount_to_pay" type="number" class="form-control text-right resettable" />
										</div>
										<div class="form-group">
											<label for="amount_rendered">Amount Rendered:</label>
											<input id="amount_rendered" name="amount_rendered" type="number" class="form-control text-right resettable" />
										</div>
										<div class="form-group" style="display: none;">
											<div class="row">
												<div class="col-lg-9">
													<label for="trade_in_amount">Trade-in Amount:</label>
													<input id="trade_in_amount" name="trade_in_amount" type="number" class="form-control text-right resettable" readonly/>
												</div>
												<div class="col-lg-3" style="padding-left: 0px;">
													<label>&nbsp;</label>
													<button id="btn_add_trade_in_items" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-plus"></span></button>
												</div>
											</div>
										</div>
										<div class="form-group">
											<label for="change">Change:</label>
											<input id="change" name="change" type="number" class="form-control text-right resettable" readonly/>
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-lg-9">
													<button id="btn_save_transaction" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-inbox"></span></button>
												</div>
												<div class="col-lg-3" style="padding-left: 0px;">
													<button id="btn_close_transaction" type="button" class="btn btn-default btn-block resettable"><span class="glyphicon glyphicon-off"></span></button>
												</div>
											</div>
										</div>
										<div class="form-group">
											<button id="btn_new_cash_transaction" type="button" class="btn btn-default btn-new-transaction btn-cash" style="width: 27%">Cash</button>
											<button id="btn_new_credit_card_transaction" type="button" class="btn btn-default btn-new-transaction btn-credit-card" style="width: 40%">Credit Card</button>
											<button id="btn_new_credit_transaction" type="button" class="btn btn-default btn-new-transaction btn-credit" style="width: 30%">Credit</button>
										</div>
										<div class="form-group" style="margin-bottom: 0px;">
											<button id="btn_show_help" type="button" class="btn btn-default btn-block"><span class="glyphicon glyphicon-list"></span>&nbsp;&nbsp;Help</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
	</div>
	<!-- ./wrapper -->

	<!-- #modal_search_item -->
	<div class="modal fade bs-example-modal-md" id="modal_search_item" tabindex="-1">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Search Item</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<div class="row">
						<div class="col-lg-12">
							<table class="table" id="tbl_items" width="100%">
								<thead>
									<tr>
										<th>Item ID</th>
										<th>Description</th>
										<th>Qty</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_search_item -->

	<!-- #modal_search_service -->
	<div class="modal fade bs-example-modal-md" id="modal_search_service" tabindex="-1">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Search Service</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<div class="row">
						<div class="col-lg-12">
							<table class="table" id="tbl_services" width="100%">
								<thead>
									<tr>
										<th>Service ID</th>
										<th>Description</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_search_service -->

	<!-- #modal_new_customer -->
	<div class="modal fade bs-example-modal-md" id="modal_new_customer" tabindex="-1">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<form id="frm_new_customer" method="post">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
						<h4 class="modal-title">New Customer</h4>
					</div>
					<div class="modal-body">
						<!-- content goes here -->
						<div class="row">
							<div class="col-lg-4">
								<div class="form-group">
									<label for="last_name_new">Last Name*</label>
									<input name="last_name_new" id="last_name_new" type="text" class="form-control" />
									<div id="last_name_new_error" class="error-alert"></div>
								</div>
							</div>
							<div class="col-lg-4">
								<div class="form-group">
									<label for="first_name_new">First Name*</label>
									<input name="first_name_new" id="first_name_new" type="text" class="form-control" />
									<div id="first_name_new_error" class="error-alert"></div>
								</div>
							</div>
							<div class="col-lg-4">
								<div class="form-group">
									<label for="middle_name_new">Middle Name*</label>
									<input name="middle_name_new" id="middle_name_new" type="text" class="form-control" />
									<div id="middle_name_new_error" class="error-alert"></div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-6">
								<div class="form-group">
									<label for="address_new">Address*</label>
									<input name="address_new" id="address_new" type="text" class="form-control" />
									<div id="address_new_error" class="error-alert"></div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="form-group">
									<label for="contact_info_new">Contact Info*</label>
									<input name="contact_info_new" id="contact_info_new" type="text" class="form-control" />
									<div id="contact_info_new_error" class="error-alert"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="submit" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> Save</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_new_customer -->

	<!-- #modal_search_customer -->
	<div class="modal fade bs-example-modal-md" id="modal_search_customer" tabindex="-1">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Search Customer</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<div class="row">
						<div class="col-lg-12">
							<table class="table" id="tbl_customers" width="100%">
								<thead>
									<tr>
										<th>Customer ID</th>
										<th>Name</th>
										<th>Balance</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_search_customer -->

	<!-- #modal_trade_ins -->
	<div class="modal fade bs-example-modal-lg" id="modal_trade_ins" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Add Trade-in Item</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<div class="row">
						<div class="col-lg-12">
							<table class="table table-bordered" id="tbl_trade_ins" width="100%">
								<thead>
									<tr>
										<th>Item ID</th>
										<th>Description</th>
										<th>Qty</th>
										<th>Price</th>
										<th>Total Price</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-offset-9">
							<h4>Total Amount: <b><span id="total_trade_in_amount">0.00</span></b></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-2" style="padding-right: 0px;">
							<input type="text" name="trade_ins_item_id" id="trade_ins_item_id" placeholder="Item ID..." class="form-control resettable" />
						</div>
						<div class="col-lg-5" style="padding-right: 0px;">
							<input type="text" name="trade_ins_item_description" id="trade_ins_item_description" placeholder="Description..." class="form-control resettable" readonly/>
						</div>
						<div class="col-lg-2">
							<input type="number" name="trade_ins_item_quantity" id="trade_ins_item_quantity" placeholder="Qty..." class="form-control resettable" />
						</div>
						<div class="col-lg-1" style="padding-left: 0px;">
							<button id="btn_add_trade_in_item" type="button" class="btn btn-default btn-block"><span class="glyphicon glyphicon-ok"></span></button>
						</div>
						<div class="col-lg-1" style="padding-left: 0px;">
							<button id="btn_remove_trade_in_item" type="button" class="btn btn-default btn-block"><span class="glyphicon glyphicon-remove"></span></button>
						</div>
						<div class="col-lg-1" style="padding-left: 0px;">
							<button id="btn_trade_ins_search_item" type="button" class="btn btn-default btn-block"><span class="glyphicon glyphicon-search"></span></button>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_trade_ins -->

	<!-- #modal_trade_ins_search_item -->
	<div class="modal fade bs-example-modal-md" id="modal_trade_ins_search_item" tabindex="-1">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Search Item</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<div class="row">
						<div class="col-lg-12">
							<table class="table" id="tbl_trade_ins_search_item" width="100%">
								<thead>
									<tr>
										<th>Item ID</th>
										<th>Description</th>
										<th>Qty</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_trade_ins_search_item -->

	<!-- #modal_help -->
	<div class="modal fade bs-example-modal-md" id="modal_help" tabindex="-1">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Help</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<table width="100%">
						<tr>
							<td><kbd>F1</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>New cash transaction</td>
						</tr>
						<tr>
							<td><kbd>F2</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>New credit card ransaction</td>
						</tr>
						<tr>
							<td><kbd>F3</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>New credit transaction</td>
						</tr>
						<tr>
							<td><kbd>F4</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Toggle search panel</td>
						</tr>
						<tr>
							<td><kbd>F5</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Search item</td>
						</tr>
						<tr>
							<td><kbd>F6</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Focus to item/service list</td>
						</tr>
						<tr>
							<td><kbd>F7</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>New customer</td>
						</tr>
						<tr>
							<td><kbd>F8</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Search customer</td>
						</tr>
						<tr>
							<td><kbd>F9</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Focus to amount to pay/amount rendered</td>
						</tr>
						<!-- <tr>
							<td><kbd>F10</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Add items to trade-in</td>
						</tr> -->
						<tr>
							<td><kbd>F11</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Full-screen</td>
						</tr>
						<tr>
							<td><kbd>F12</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Close current transction</td>
						</tr>
						<tr>
							<td><kbd>Del</kbd></td>
							<td>&nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</td>
							<td>Deletes the selected item/service from the list</td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /#modal_help -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/cashiering.js"></script>
</body>
</html>