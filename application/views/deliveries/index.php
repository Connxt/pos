<!DOCTYPE html>
<html>
<head>
	<title>Deliveries</title>
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
	                    		<h3 class="box-title"><i class="fa fa-th-list"></i> Delivery List</h3>
			                </div>
	                        <div class="box-body">
		                        <table class="table" id="tbl_deliveries" width="100%">
		                            <thead>
		                                <tr>
		                                    <th>Delivery ID</th>
		                                    <th>Supplier</th>
		                                    <th>Total Amount</th>
		                                    <th>User</th>
		                                    <th>Date</th>
		                                </tr>
		                            </thead>
		                            <tbody></tbody>
		                        </table>
		                        <button id="btn_view_delivery" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span></button>
		                        <button id="btn_refresh_delivery_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
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

	<!-- #modal_view_delivery -->
    <div class="modal fade bs-example-modal-lg" id="modal_view_delivery" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">View Delivery</h4>
                </div>
                <div class="modal-body">
                    <!-- content goes here -->
                    <h4><strong>Delivery Info</strong></h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Delivery ID:&nbsp;&nbsp;<strong><span id="delivery_id"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
	                        <h5 style="margin-bottom: 0px;">Date:&nbsp;&nbsp;<strong><span id="delivery_date"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Supplier ID:&nbsp;&nbsp;<strong><span id="supplier_id"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Supplier Name:&nbsp;&nbsp;<strong><span id="supplier_name"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Contact Info:&nbsp;&nbsp;<strong><span id="supplier_contact_info"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">User:&nbsp;&nbsp;<strong><span id="user"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Total Amount:&nbsp;&nbsp;<strong><span id="total_amount"></span></strong></h5>
                        </div>
                    </div>
                    <hr />
                    <h4><strong>Delivered Items</strong></h4>
                    <div class="row">
                        <div class="col-lg-12">
                            <table class="table table-bordered" id="tbl_delivery_items" width="100%">
                                <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Actual Price</th>
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
    <!-- /#modal_view_delivery -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/deliveries.js"></script>
</body>
</html>