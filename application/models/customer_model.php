<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Customer_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_customer($last_name, $first_name, $middle_name, $address, $contact_info) {
		$this->db->insert('customers', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'contact_info' => $contact_info,
			'address' => $address,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function update_customer($customer_id, $last_name, $first_name, $middle_name, $address, $contact_info) {
		$this->db->where('id', $customer_id);
		$this->db->update('customers', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'contact_info' => $contact_info,
			'address' => $address,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function delete_customer($customer_id) {
		$this->db->delete('customers', array('id' => $customer_id));
		return $this->db->affected_rows();
	}

	function customer_exists($customer_id) {
		$query = $this->db->query('SELECT id FROM customers WHERE id=' . $customer_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_customer($customer_id) {
		$customer = $this->db->query('SELECT * FROM customers WHERE id=' . $customer_id)->row();
		$balance = $this->db->query(
			'SELECT SUM(quantity * selling_price) AS balance ' .
			'FROM receipt_items ' .
			'	INNER JOIN receipts ' .
			'	ON receipt_items.receipt_id=receipts.id ' .
			'WHERE customer_id=' . $customer->id)->row()->balance;

		$balance += $this->db->query(
			'SELECT SUM(selling_price) AS balance ' .
			'FROM receipt_services ' .
			'	INNER JOIN receipts ' .
			'	ON receipt_services.receipt_id=receipts.id ' .
			'WHERE customer_id=' . $customer->id)->row()->balance;

		$paid_amount = $this->db->query(
			'SELECT SUM(amount_paid) AS paid_amount ' .
			'FROM payments ' .
			'	INNER JOIN receipts ' .
			'	ON payments.receipt_id=receipts.id ' .
			'WHERE customer_id=' . $customer->id)->row()->paid_amount;

		$customer->total_purchases = $balance;
		$customer->balance = $balance - $paid_amount;
		
		return $customer;
	}

	function get_all_customers() {
		$temp_customers = $this->db->query('SELECT * FROM customers')->result();
		$customers = array();

		foreach($temp_customers as $customer) {
			array_push($customers, $this->get_customer($customer->id));
		}

		return $customers;
	}
}