<!DOCTYPE html>
<html>
<head>
	<title>Users</title>
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
	                    		<h3 class="box-title"><i class="fa fa-th-list"></i> User List</h3>
			                </div>
	                        <div class="box-body">
		                        <table class="table" id="tbl_users" width="100%">
		                            <thead>
		                                <tr>
		                                    <th>User ID</th>
		                                    <th>Username</th>
		                                    <th>Name</th>
		                                    <th>User Level</th>
		                                </tr>
		                            </thead>
		                            <tbody></tbody>
		                        </table>
		                        <br />
		                        <button id="btn_update_user" type="button" class="btn btn-primary disabled"><span class="fa fa-pencil"></span></button>
		                        <button id="btn_refresh_user_list" type="button" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span></button>
		                        <button id="btn_new_user" type="button" class="btn btn-success pull-right"><span class="glyphicon glyphicon-plus"></span> New User</button>
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

	<!-- #modal_new_user -->
    <div class="modal fade bs-example-modal-md" id="modal_new_user" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_new_user" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">New User</h4>
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
                        	<div class="col-lg-4">
                        		<div class="form-group">
                        			<label for="user_level_new">User Level*</label>
                        			<select name="user_level_new" id="user_level_new" class="form-control">
                                        <option value="1">Administrator</option>
                                        <option value="2">Cashier</option>
                                    </select>
                                    <div id="user_level_new_error" class="error-alert"></div>
                        		</div>
                        	</div>
                        </div>
                        <div class="row">
	                        <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="username_new">Username*</label>
                                    <input name="username_new" id="username_new" type="text" class="form-control" />
                                    <div id="username_new_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="password_new">Password*</label>
                                    <input name="password_new" id="password_new" type="password" class="form-control" />
                                    <div id="password_new_error" class="error-alert"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="confirm_password_new">Confirm Password*</label>
                                    <input name="confirm_password_new" id="confirm_password_new" type="password" class="form-control" />
                                    <div id="confirm_password_new_error" class="error-alert"></div>
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
    <!-- /#modal_new_user -->

    <!-- #modal_update_user -->
    <div class="modal fade bs-example-modal-md" id="modal_update_user" tabindex="-1">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <form id="frm_update_user" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">New User</h4>
                    </div>
                    <div class="modal-body">
                        <!-- content goes here -->
                        <input name="user_id_update" id="user_id_update" type="hidden" class="form-control" />
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
                        	<div class="col-lg-4">
                        		<div class="form-group">
                        			<label for="user_level_update">User Level*</label>
                        			<select name="user_level_update" id="user_level_update" class="form-control">
                                        <option value="1">Administrator</option>
                                        <option value="2">Cashier</option>
                                    </select>
                                    <div id="user_level_update_error" class="error-alert"></div>
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
    <!-- /#modal_update_user -->

	<?php include($path . 'js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/app/users.js"></script>
</body>
</html>