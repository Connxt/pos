<!DOCTYPE html>
<html>
<head>
	<title>Customers</title>
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
	                    		<h3 class="box-title"><i class="fa fa-th-list"></i> Customer List</h3>
			                </div>
	                        <div class="box-body">
		                        <table class="table" id="tbl_customers" width="100%">
		                            <thead>
		                                <tr>
		                                    <th>Cust. ID</th>
		                                    <th>Name</th>
		                                    <th>Address</th>
		                                    <th>Balance</th>
                                            <th>Total Purchases</th>
                                            <th>Status</th>
		                                </tr>
		                            </thead>
		                            <tbody></tbody>
		                        </table>
		                        <br />
		                        <button id="btn_delete_customer" type="button" class="btn btn-danger disabled"><span class="fa fa-trash-o"></span></button>
                                <button id="btn_view_customer" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span></button>
		                        <button id="btn_update_customer" type="button" class="btn btn-primary disabled"><span class="fa fa-pencil"></span></button>
		                        <button id="btn_refresh_customer_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
		                        <button id="btn_new_customer" type="button" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> New Customer</button>
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

    <!-- #modal_view_customer -->
    <div class="modal fade bs-example-modal-lg" id="modal_view_customer" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">View Customer</h4>
                </div>
                <div class="modal-body">
                    <!-- content goes here -->
                    <h4><strong>Customer Info</strong></h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Customer ID:&nbsp;&nbsp;<strong><span id="customer_id"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Contact Info:&nbsp;&nbsp;<strong><span id="contact_info"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Customer Name:&nbsp;&nbsp;<strong><span id="customer_name"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Address:&nbsp;&nbsp;<strong><span id="address"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Total Purchases:&nbsp;&nbsp;<strong><span id="total_purchases"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Total Balance:&nbsp;&nbsp;<strong><span id="total_balance"></span></strong></h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <hr />
                            <h4><strong>Receipts</strong></h4>
                            <table class="table table-bordered" id="tbl_receipts" width="100%">
                                <thead>
                                    <tr>
                                        <th>Receipt ID</th>
                                        <th>Date</th>
                                        <th>Due Date</th>
                                        <th>Mode</th>
                                        <th>Amount</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <br />
                            <button id="btn_view_receipt" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp;View Receipt</button>
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
    <!-- /#modal_view_customer -->

    <!-- #modal_view_receipt -->
    <div class="modal fade bs-example-modal-lg" id="modal_view_receipt" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">View Receipt</h4>
                </div>
                <div class="modal-body">
                    <!-- content goes here -->
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
                    <div class="row">
                        <div class="col-lg-12">
                            <hr />
                            <h4><strong>Receipt Items/Services</strong></h4>
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
                    <div class="row">
                        <div class="col-lg-12">
                            <hr />
                            <h4><strong>Payments</strong></h4>
                            <table class="table table-bordered" id="tbl_payments" width="100%">
                                <thead>
                                    <tr>
                                        <th>Payment ID</th>
                                        <th>Amount Paid</th>
                                        <!-- <th>Trade-ins</th> -->
                                        <th>Type</th>
                                        <th>User</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <br />
                            <button id="btn_view_payment" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp;View Payment</button>
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
    <!-- /#modal_view_receipt -->

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
                            <h5 style="margin-bottom: 0px;">User:&nbsp;&nbsp;<strong><span id="payment_user"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Type Of Payment:&nbsp;&nbsp;<strong><span id="type_of_payment"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Amount Paid:&nbsp;&nbsp;<strong><span id="amount_paid"></span></strong></h5>
                        </div>
                        <div class="col-lg-6" style="display: none;">
                            <h5 style="margin-bottom: 0px;">Trade-in Amount:&nbsp;&nbsp;<strong><span id="trade_in_amount"></span></strong></h5>
                        </div>
                    </div>

                    <div class="row" style="display: none;">
                        <div class="col-lg-12">
                            <hr />
                            <h4><strong>Trade-ins</strong></h4>
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

    <!-- #modal_update_customer -->
    <div class="modal fade bs-example-modal-md" id="modal_update_customer" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_update_customer" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Update Customer</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <input name="customer_id_update" id="customer_id_update" type="hidden" class="form-control" />
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="last_name_update">Last Name*</label>
                                    <input name="last_name_update" id="last_name_update" type="text" class="form-control" />
                                    <div id="last_name_update_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="first_name_update">First Name*</label>
                                    <input name="first_name_update" id="first_name_update" type="text" class="form-control" />
                                    <div id="first_name_update_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="middle_name_update">Middle Name*</label>
                                    <input name="middle_name_update" id="middle_name_update" type="text" class="form-control" />
                                    <div id="middle_name_update_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
	                        <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="address_update">Address*</label>
                                    <input name="address_update" id="address_update" type="text" class="form-control" />
                                    <div id="address_update_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="contact_info_update">Contact Info*</label>
                                    <input name="contact_info_update" id="contact_info_update" type="text" class="form-control" />
                                    <div id="contact_info_update_error" class="error-alert"></div>
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
    <!-- /#modal_update_customer -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/customers.js"></script>
</body>
</html>