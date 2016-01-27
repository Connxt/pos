<section class="sidebar">
	<ul class="sidebar-menu">
	<?php
	if($user_level == 'Administrator') {
	?>	<li <?php if($current_page == 'cashiering') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'cashiering'; ?>"> Cashiering</a></li>
		<li <?php if($current_page == 'credit_payment') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'credit_payment'; ?>"> Credit Payment</a></li>
		<li <?php if($current_page == 'items') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'items'; ?>"> Items</a></li>
		<li <?php if($current_page == 'services') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'services'; ?>"> Services</a></li>
		<li <?php if($current_page == 'suppliers') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'suppliers'; ?>"> Suppliers</a></li>
		<li <?php if($current_page == 'deliveries') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'deliveries'; ?>"> Deliveries</a></li>
		<li <?php if($current_page == 'customers') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'customers'; ?>"> Customers</a></li>
		<li <?php if($current_page == 'payments') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'payments'; ?>"> Payments</a></li>
		<li <?php if($current_page == 'users') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'users'; ?>"> Users</a></li>
	<?php
	}
	else {
	?>
		<li <?php if($current_page == 'cashiering') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'cashiering'; ?>"> Cashiering</a></li>
		<li <?php if($current_page == 'credit_payment') echo 'class="active"'; ?>><a href="<?php echo base_url() . 'credit_payment'; ?>"> Credit Payment</a></li>
	<?php
	}
	?>
	</ul>
</section>