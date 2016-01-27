<!DOCTYPE html>
<html>
<head>
	<title>Items</title>
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
	                    		<h3 class="box-title"><i class="fa fa-th-list"></i> Item List</h3>
			                </div>
	                        <div class="box-body">
		                        <table class="table" id="tbl_items" width="100%">
		                            <thead>
		                                <tr>
		                                    <th>Item ID</th>
		                                    <th>Description</th>
		                                    <th>Quantity&nbsp;</th>
		                                    <th>Actual Price&nbsp;</th>
		                                    <th>S. Price (Cash)&nbsp;</th>
		                                    <th>S. Price (Credit Card)&nbsp;</th>
		                                    <th>S. Price (Credit)&nbsp;</th>
		                                </tr>
		                            </thead>
		                            <tbody></tbody>
		                        </table>
		                        <button id="btn_delete_item" type="button" class="btn btn-danger disabled"><span class="fa fa-trash-o"></span></button>
		                        <button id="btn_update_item" type="button" class="btn btn-primary disabled"><span class="fa fa-pencil"></span></button>
		                        <button id="btn_refresh_item_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
		                        <div class="btn-group dropup">
		                            <button id="btn_toggle_selling_price" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Toggle Selling Price <span class="caret"></span></button>
		                            <ul class="dropdown-menu" role="menu">
		                                <li><a class="toggle-selling-price" data-index="0" data-column="4" href="#">Cash</a></li>
		                                <li><a class="toggle-selling-price" data-index="1" data-column="5" href="#">Credit Card</a></li>
		                                <li><a class="toggle-selling-price" data-index="2" data-column="6" href="#">Credit</a></li>
		                            </ul>
		                        </div>
		                        <button id="btn_new_item" type="button" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> New Item</button>
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

	<!-- #modal_new_item -->
    <div class="modal fade bs-example-modal-md" id="modal_new_item" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_new_item" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">New Item</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="item_id_new">Item ID*</label>
                                    <input name="item_id_new" id="item_id_new" type="text" class="form-control" />
                                    <div id="item_id_new_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="description_new">Description*</label>
                                    <input name="description_new" id="description_new" type="text" class="form-control" />
                                    <div id="description_new_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="actual_price_new">Actual Price*</label>
                                    <input name="actual_price_new" id="actual_price_new" type="number" class="form-control" style="text-align: right;" />
                                    <div id="actual_price_new_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="selling_price_cash_new">Selling Price (Cash)*</label>
                                    <input name="selling_price_cash_new" id="selling_price_cash_new" type="number" class="form-control" style="text-align: right;" />
                                    <div id="selling_price_cash_new_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="selling_price_credit_card_new">Selling Price (CC)*</label>
                                    <input name="selling_price_credit_card_new" id="selling_price_credit_card_new" type="number" class="form-control" style="text-align: right;" />
                                    <div id="selling_price_credit_card_new_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="selling_price_credit_new">Selling Price (Credit)*</label>
                                    <input name="selling_price_credit_new" id="selling_price_credit_new" type="number" class="form-control" style="text-align: right;" />
                                    <div id="selling_price_credit_new_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="pull-left"><strong>Note: </strong>You cannot change the item ID later.</div>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> Save</button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /#modal_new_item -->

    <!-- #modal_update_item -->
    <div class="modal fade bs-example-modal-md" id="modal_update_item" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_update_item" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Update Item</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <input name="item_id_update" id="item_id_update" type="hidden" class="form-control" />
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="description_update">Description*</label>
                                    <input name="description_update" id="description_update" type="text" class="form-control" />
                                    <div id="description_update_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="actual_price_update">Actual Price*</label>
                                    <input name="actual_price_update" id="actual_price_update" type="number" class="form-control" style="text-align: right;" />
                                    <div id="actual_price_update_error" class="error-alert"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="selling_price_cash_update">Selling Price (Cash)*</label>
                                    <input name="selling_price_cash_update" id="selling_price_cash_update" type="number" class="form-control" style="text-align: right;" />
                                    <div id="selling_price_cash_update_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="selling_price_credit_card_update">Selling Price (CC)*</label>
                                    <input name="selling_price_credit_card_update" id="selling_price_credit_card_update" type="number" class="form-control" style="text-align: right;" />
                                    <div id="selling_price_credit_card_update_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="selling_price_credit_update">Selling Price (Credit)*</label>
                                    <input name="selling_price_credit_update" id="selling_price_credit_update" type="number" class="form-control" style="text-align: right;" />
                                    <div id="selling_price_credit_update_error" class="error-alert"></div>
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
    <!-- /#modal_update_item -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/items.js"></script>
</body>
</html>