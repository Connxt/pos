<!DOCTYPE html>
<html>
<head>
	<title>Payments</title>
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
					<div class="col-lg-12">
						<div class="box">
							<div class="box-header with-border">
								<h3 class="box-title"><i class="fa fa-th-list"></i> Payment List</h3>
							</div>
							<div class="box-body">
								<table class="table" id="tbl_payments" width="100%">
									<thead>
										<tr>
											<th>Payment ID</th>
											<th>Customer Name</th>
											<!-- <th>Trade-in</th> -->
											<th>Amount Paid</th>
											<th>Type</th>
											<th>Date</th>
											<th>User</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<br />
								<button id="btn_view_payment" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span></button>
								<button id="btn_refresh_payment_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
					</div>
					<!-- /.col-lg-12 -->
				</div>
				<!-- /.row -->

				<div class="row">
					<div class="col-lg-12">
						<div class="box">
							<div class="box-header with-border">
								<h3 class="box-title"><i class="fa fa-th-list"></i> Daily Sales</h3>
							</div>
							<div class="box-body">
								<table class="table" id="tbl_daily_sales" width="100%">
									<thead>
										<tr>
											<th>Date</th>
											<th>Total Sales</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<br />
								<button id="btn_refresh_daily_sales" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
							</div>
							<!-- /.box-body -->
						</div>
						<!-- /.box -->
					</div>
					<!-- /.col-lg-12 -->
				</div>
				<!-- /.row -->
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
	</div>
	<!-- ./wrapper -->

	<!-- #modal_view_payment -->
	<div class="modal fade bs-example-modal-lg" id="modal_view_payment" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">View Payment</h4>
				</div>
				<div class="modal-body">
					<!-- content goes here -->
					<h4><strong>Payment Info</strong></h4>
					<div class="row">
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Payment ID:&nbsp;&nbsp;<strong><span id="payment_id"></span></strong></h5>
						</div>
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Date:&nbsp;&nbsp;<strong><span id="payment_date"></span></strong></h5>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Customer Name:&nbsp;&nbsp;<strong><span id="customer_name"></span></strong></h5>
						</div>
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Contact Info:&nbsp;&nbsp;<strong><span id="contact_info"></span></strong></h5>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">User:&nbsp;&nbsp;<strong><span id="user_name"></span></strong></h5>
						</div>
					</div>
					<div class="row">
						<!-- <div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Trade-in Amount:&nbsp;&nbsp;<strong><span id="trade_in_amount"></span></strong></h5>
						</div> -->
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Amount Paid:&nbsp;&nbsp;<strong><span id="amount_paid"></span></strong></h5>
						</div>
					</div>
					<hr />

					<!-- <h4><strong>Trade-ins</strong></h4>
					<div class="row">
						<div class="col-lg-12">
							<table class="table table-bordered" id="tbl_trade_ins" width="100%">
								<thead>
									<tr>
										<th>Item ID</th>
										<th>Description</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Total Price</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<hr /> -->

					<h4><strong>Receipt Info</strong></h4>
					<div class="row">
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Receipt ID:&nbsp;&nbsp;<strong><span id="receipt_id"></span></strong></h5>
						</div>
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Date:&nbsp;&nbsp;<strong><span id="receipt_date"></span></strong></h5>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Mode Of Payment:&nbsp;&nbsp;<strong><span id="mode_of_payment"></span></strong></h5>
						</div>
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Due Date:&nbsp;&nbsp;<strong><span id="due_date"></span></strong></h5>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Total Amount:&nbsp;&nbsp;<strong><span id="receipt_total_amount"></span></strong></h5>
						</div>
						<div class="col-lg-6">
							<h5 style="margin-bottom: 0px;">Balance:&nbsp;&nbsp;<strong><span id="receipt_balance"></span></strong></h5>
						</div>
					</div>
					<br />
					<div class="row">
						<div class="col-lg-12">
							<table class="table table-bordered" id="tbl_receipt" width="100%">
								<thead>
									<tr>
										<th>Type</th>
										<th>ID</th>
										<th>Description</th>
										<th>Qty</th>
										<th>Price</th>
										<th>Total</th>
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
	<!-- /#modal_view_payment -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/payments	.js"></script>
</body>
</html>