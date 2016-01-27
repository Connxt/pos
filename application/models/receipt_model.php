<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Receipt_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_receipt(array $receipt_items, array $receipt_services, $customer_id, array $trade_ins, $mode_of_payment, $num_of_days) {
		$this->db->insert('receipts', array(
			'customer_id' => $customer_id,
			'mode_of_payment_id' => $mode_of_payment,
			'due_date' => date('Y-m-d', strtotime(date('Y-m-d') . ' + ' . $num_of_days . ' days')),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));

		$receipt_id = $this->db->insert_id();

		foreach($receipt_items as $receipt_item) {
			$this->db->insert('receipt_items', array(
				'receipt_id' => $receipt_id,
				'item_id' => $receipt_item['itemId'],
				'quantity' => $receipt_item['quantity'],
				'actual_price' => $receipt_item['actualPrice'],
				'selling_price' => $receipt_item['sellingPrice']
			));
		}

		foreach($receipt_services as $receipt_service) {
			$this->db->insert('receipt_services', array(
				'receipt_id' => $receipt_id,
				'service_id' => $receipt_service['serviceId'],
				'selling_price' => $receipt_service['sellingPrice']
			));
		}

		return $receipt_id;
	}

	function receipt_exists($receipt_id) {
		$query = $this->db->query('SELECT id FROM receipts WHERE id=' . $receipt_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function receipt_exists_via_customer_id($customer_id) {
		$query = $this->db->query('SELECT id FROM receipts WHERE customer_id=' . $customer_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function receipt_item_exists($receipt_item_id) {
		$query = $this->db->query('SELECT id FROM receipt_items WHERE id=' . $receipt_item_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function receipt_item_exists_via_item_id($item_id) {
		$query = $this->db->query('SELECT id FROM receipt_items WHERE item_id="' . $item_id . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function receipt_service_exists_via_service_id($service_id) {
		$query = $this->db->query('SELECT id FROM receipt_services WHERE service_id="' . $service_id . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_receipt($receipt_id) {
		$receipt = $this->db->query(
			'SELECT ' . 
			'	receipts.id, receipts.customer_id, receipts.due_date, receipts.created_at, ' .
			'	modes_of_payment.mode_of_payment ' .
			'	FROM receipts ' .
			'		INNER JOIN modes_of_payment ' .
			'		ON receipts.mode_of_payment_id=modes_of_payment.id ' .
			'WHERE receipts.id=' . $receipt_id)->row();

		$balance = $this->db->query('SELECT SUM(quantity * selling_price) AS balance FROM receipt_items WHERE receipt_id=' . $receipt_id)->row()->balance;
		$balance += $this->db->query('SELECT SUM(selling_price) AS balance FROM receipt_services WHERE receipt_id=' . $receipt_id)->row()->balance;
		$paid_amount = $this->db->query('SELECT SUM(amount_paid) AS paid_amount FROM payments WHERE receipt_id=' . $receipt_id)->row()->paid_amount;

		$receipt->total_amount = $balance;
		$receipt->paid_amount = $paid_amount;
		$receipt->balance = $balance - $paid_amount;

		if($receipt->balance >= 1) {
			$now = new DateTime(date('Y-m-d'));
			$due_date = new DateTime($receipt->due_date);

			$diff = $now->diff($due_date)->format('%R%a');

			$receipt->days_left = $diff;
		}
		else {
			$receipt->days_left = 0;
		}

		return $receipt;
	}

	function get_all_receipts() {
		$temp_receipts = $this->db->query('SELECT * FROM receipts');
		$receipts = array();

		foreach($temp_receipts as $receipt) {
			array_push($receipts, $this->get_receipt($receipt->id));
		}

		return $receipts;
	}

	function get_receipts_via_customer_id($customer_id) {
		$temp_receipts = $this->db->query('SELECT * FROM receipts WHERE customer_id=' . $customer_id)->result();
		$receipts = array();

		foreach($temp_receipts as $receipt) {
			array_push($receipts, $this->get_receipt($receipt->id));
		}

		return $receipts;
	}

	function get_receipt_items($receipt_id) {
		$receipt_items = $this->db->query(
			'SELECT ' .
			'	items.description, ' .
			'	receipt_items.receipt_id, receipt_items.item_id, receipt_items.quantity, receipt_items.actual_price, receipt_items.selling_price ' .
			'FROM receipt_items ' .
			'	INNER JOIN items ' .
			'	ON receipt_items.item_id=items.id ' .
			'WHERE receipt_items.receipt_id=' . $receipt_id)->result();

		return $receipt_items;
	}

	function get_receipt_services($receipt_id) {
		$receipt_items = $this->db->query(
			'SELECT ' .
			'	services.description, ' .
			'	receipt_services.receipt_id, receipt_services.service_id, receipt_services.selling_price ' .
			'FROM receipt_services ' .
			'	INNER JOIN services ' .
			'	ON receipt_services.service_id=services.id ' .
			'WHERE receipt_services.receipt_id=' . $receipt_id)->result();

		return $receipt_items;
	}
}