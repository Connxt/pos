<!DOCTYPE html>
<html>
<head>
	<title>Services</title>
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
	                    		<h3 class="box-title"><i class="fa fa-th-list"></i> Service List</h3>
			                </div>
	                        <div class="box-body">
		                        <table class="table" id="tbl_services" width="100%">
		                            <thead>
		                                <tr>
		                                    <th>Service ID</th>
		                                    <th>Description</th>
		                                    <th>S. Price (Cash)&nbsp;</th>
                                            <th>S. Price (Credit Card)&nbsp;</th>
                                            <th>S. Price (Credit)&nbsp;</th>
		                                </tr>
		                            </thead>
		                            <tbody></tbody>
		                        </table>
		                        <br />
		                        <button id="btn_delete_service" type="button" class="btn btn-danger disabled"><span class="fa fa-trash-o"></span></button>
		                        <button id="btn_update_service" type="button" class="btn btn-primary disabled"><span class="fa fa-pencil"></span></button>
		                        <button id="btn_refresh_service_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
                                <div class="btn-group dropup">
                                    <button id="btn_toggle_selling_price" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Toggle Selling Price <span class="caret"></span></button>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a class="toggle-selling-price" data-index="0" data-column="2" href="#">Cash</a></li>
                                        <li><a class="toggle-selling-price" data-index="1" data-column="3" href="#">Credit Card</a></li>
                                        <li><a class="toggle-selling-price" data-index="2" data-column="4" href="#">Credit</a></li>
                                    </ul>
                                </div>
		                        <button id="btn_new_service" type="button" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> New Service</button>
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

	<!-- #modal_new_service -->
    <div class="modal fade bs-example-modal-md" id="modal_new_service" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_new_service" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">New Service</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="service_id_new">Service ID*</label>
                                    <input name="service_id_new" id="service_id_new" type="text" class="form-control" />
                                    <div id="service_id_new_error" class="error-alert"></div>
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
                        <div class="pull-left"><strong>Note: </strong>You cannot change the service ID later.</div>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> Save</button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /#modal_new_service -->

    <!-- #modal_update_service -->
    <div class="modal fade bs-example-modal-md" id="modal_update_service" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_update_service" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Update Service</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <input name="service_id_update" id="service_id_update" type="hidden" class="form-control" />
                        <div class="row">
                            <div class="col-lg-12">
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
    <!-- /#modal_update_service -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/services.js"></script>
</body>
</html>