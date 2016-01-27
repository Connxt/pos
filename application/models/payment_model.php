<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_payment($receipt_id, $amount_paid, $type_of_payment_id, $user_id) {
		$this->db->insert('payments', array(
			'receipt_id' => $receipt_id,
			'amount_paid' => $amount_paid,
			'type_of_payment_id' => $type_of_payment_id,
			'user_id' => $user_id,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}

	function get_payment($payment_id) {
		$payment = $this->db->query('SELECT ' .
			'	payments.id, payments.receipt_id, payments.amount_paid, payments.user_id, payments.created_at, ' .
			'	types_of_payment.type_of_payment, ' .
			'	users.last_name AS user_last_name, users.first_name AS user_first_name, users.middle_name AS user_middle_name, ' .
			'	customers.last_name AS customer_last_name, customers.first_name AS customer_first_name, customers.middle_name AS customer_middle_name, customers.contact_info ' .
			'FROM payments ' .
			'	INNER JOIN types_of_payment ' .
			'	ON payments.type_of_payment_id=types_of_payment.id ' .
			'		INNER JOIN users ' .
			'		ON payments.user_id=users.id ' .
			'			INNER JOIN receipts ' .
			'			ON payments.receipt_id=receipts.id ' .
			'				INNER JOIN customers ' .
			'				ON receipts.customer_id=customers.id ' .
			'WHERE payments.id=' . $payment_id)->row();

		$trade_in_amount = $this->db->query('SELECT SUM(quantity * price) AS trade_in_amount FROM trade_ins WHERE payment_id=' . $payment_id)->row()->trade_in_amount;
		$payment->trade_in_amount = (is_null($trade_in_amount)) ? 0 : $trade_in_amount;

		return $payment;
	}

	function get_all_payments() {
		$temp_payments = $this->db->query('SELECT id FROM payments')->result();
		$payments = array();

		foreach($temp_payments as $payment) {
			array_push($payments, $this->get_payment($payment->id));
		}

		return $payments;
	}

	function get_payments_via_receipt_id($receipt_id) {
		$temp_payments = $this->db->query('SELECT id FROM payments WHERE receipt_id=' . $receipt_id)->result();
		$payments = array();

		foreach($temp_payments as $payment) {
			array_push($payments, $this->get_payment($payment->id));
		}

		return $payments;
	}
}