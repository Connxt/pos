<!DOCTYPE html>
<html>
<head>
	<title>Suppliers</title>
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
	                    		<h3 class="box-title"><i class="fa fa-th-list"></i> Supplier List</h3>
			                </div>
	                        <div class="box-body">
		                        <table class="table" id="tbl_suppliers" width="100%">
		                            <thead>
		                                <tr>
		                                    <th>Supplier ID</th>
		                                    <th>Name</th>
		                                    <th>Contact Info</th>
                                            <th>Total Amount Delivered</th>
		                                </tr>
		                            </thead>
		                            <tbody></tbody>
		                        </table>
		                        <br />
		                        <button id="btn_delete_supplier" type="button" class="btn btn-danger disabled"><span class="fa fa-trash-o"></span></button>
                                <button id="btn_view_supplier" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span></button>
		                        <button id="btn_update_supplier" type="button" class="btn btn-primary disabled"><span class="fa fa-pencil"></span></button>
		                        <button id="btn_receive_delivery" type="button" class="btn btn-warning disabled"><i class="fa fa-database"></i></button>
		                        <button id="btn_refresh_supplier_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
		                        <button id="btn_new_supplier" type="button" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> New Supplier</button>
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

	<!-- #modal_new_supplier -->
    <div class="modal fade bs-example-modal-sm" id="modal_new_supplier" tabindex="-1">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <form id="frm_new_supplier" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">New Supplier</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="name_new">Name*</label>
                                    <input name="name_new" id="name_new" type="text" class="form-control" />
                                    <div id="name_new_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
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
    <!-- /#modal_new_supplier -->

    <!-- #modal_view_supplier -->
    <div class="modal fade bs-example-modal-lg" id="modal_view_supplier" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">View Supplier</h4>
                </div>
                <div class="modal-body">
                    <!-- content goes here -->
                    <h4><strong>Supplier Info</strong></h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Supplier ID:&nbsp;&nbsp;<strong><span id="supplier_id"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Contact Info:&nbsp;&nbsp;<strong><span id="contact_info"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Supplier Name:&nbsp;&nbsp;<strong><span id="supplier_name"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Total Amount Delivered:&nbsp;&nbsp;<strong><span id="total_amount_delivered"></span></strong></h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <hr />
                            <h4><strong>Deliveries</strong></h4>
                            <table class="table table-bordered" id="tbl_deliveries" width="100%">
                                <thead>
                                    <tr>
                                        <th>Delivery ID</th>
                                        <th>Total Amount</th>
                                        <th>User</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <br />
                            <button id="btn_view_delivery" type="button" class="btn btn-info disabled"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;&nbsp;View Delivery</button>
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
    <!-- /#modal_view_supplier -->

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

    <!-- #modal_update_supplier -->
    <div class="modal fade bs-example-modal-sm" id="modal_update_supplier" tabindex="-1">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <form id="frm_update_supplier" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Update Supplier</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <input name="supplier_id_update" id="supplier_id_update" type="hidden" class="form-control" />
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="name_update">Name*</label>
                                    <input name="name_update" id="name_update" type="text" class="form-control" />
                                    <div id="name_update_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
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
    <!-- /#modal_update_supplier -->

    <!-- #modal_receive_delivery -->
    <div class="modal fade bs-example-modal-lg" id="modal_receive_delivery" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">Receive Delivery</h4>
                </div>
                <div class="modal-body">
                    <!-- content goes here -->
                    <h4><strong>Supplier Info</strong></h4>
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 style="margin-bottom: 0px;">Supplier ID:&nbsp;&nbsp;<strong><span id="supplier_id_receive_delivery"></span></strong></h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Name:&nbsp;&nbsp;<strong><span id="supplier_name_receive_delivery"></span></strong></h5>
                        </div>
                        <div class="col-lg-6">
                            <h5 style="margin-bottom: 0px;">Contact Info:&nbsp;&nbsp;<strong><span id="supplier_contact_info_receive_delivery"></span></strong></h5>
                        </div>
                    </div>
                    <hr />
                    <h4><strong>Items</strong></h4>
                    <div class="row">
                        <div class="col-lg-12">
                            <table class="table table-bordered" id="tbl_receive_delivery" width="100%">
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
                    <div class="row">
                        <div class="col-lg-offset-9">
                            <h4>Total Amount: <b><span id="total_amount_receive_delivery">0.00</span></b></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2" style="padding-right: 0px;">
                            <input type="text" name="item_id" id="item_id" placeholder="Item ID..." class="form-control" />
                        </div>
                        <div class="col-lg-5" style="padding-right: 0px;">
                            <input type="text" name="description" id="description" placeholder="Description..." class="form-control" readonly/>
                        </div>
                        <div class="col-lg-2">
                            <input type="number" name="quantity" id="quantity" placeholder="Qty..." class="form-control" />
                        </div>
                        <div class="col-lg-1" style="padding-left: 0px;">
                            <button id="btn_add_item_to_delivery" type="button" class="btn btn-default btn-block"><span class="glyphicon glyphicon-ok"></span></button>
                        </div>
                        <div class="col-lg-1" style="padding-left: 0px;">
                            <button id="btn_remove_item_from_delivery" type="button" class="btn btn-default btn-block disabled"><span class="glyphicon glyphicon-remove"></span></button>
                        </div>
                        <div class="col-lg-1" style="padding-left: 0px;">
                            <button id="btn_search_item" type="button" class="btn btn-default btn-block"><span class="glyphicon glyphicon-search"></span></button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="btn_save_delivery" type="button" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> Save Delivery</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /#modal_receive_delivery -->

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
                                        <th>Actual Price</th>
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

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/suppliers.js"></script>
</body>
</html>