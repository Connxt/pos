<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Credit_Payment extends CI_Controller {
	const INITIAL_PAYMENT = 1;
	const CREDIT_PAYMENT = 2;

	public function __construct() {
		parent::__construct();

		$session_data = $this->session->userdata('samson_auth');

		if(!$this->session->userdata('samson_auth')) {
			redirect('login', 'refresh');
		}

		$this->load->model('item_model');
		$this->load->model('receipt_model');
		$this->load->model('payment_model');
		$this->load->model('customer_model');
		$this->load->model('trade_in_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'credit_payment';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	/**
	 * Credit Payment
	 */	
	public function get_nonexistent_trade_in_items() {
		$item_ids = (gettype($this->input->post('itemIds')) == "array") ? $this->input->post('itemIds') : array(); // ['1', '2', '3'] -> item ids
		$nonexistent_trade_in_items = array();

		foreach($item_ids as $item_id) {
			if(!$this->item_model->item_exists($item_id)) {
				array_push($nonexistent_trade_in_items, $item_id);
			}
		}

		echo json_encode($nonexistent_trade_in_items);
	}

	public function save_transaction() {
		$customer_id = $this->input->post('customerId');
		$receipt_id = $this->input->post('receiptId');
		$amount_paid = $this->input->post('amountPaid');
		$trade_ins = (gettype($this->input->post('tradeInItems')) == "array") ? $this->input->post('tradeInItems') : array();
		$user_id = $this->input->post('userId');

		$payment_id = $this->payment_model->new_payment($receipt_id, $amount_paid, Credit_Payment::CREDIT_PAYMENT, $user_id);
		$this->trade_in_model->new_trade_in($payment_id, $trade_ins);

		foreach($trade_ins as $trade_in) {
			$this->item_model->add_quantity_to_item($trade_in['itemId'], $trade_in['quantity']);
		}
	}

	/**
	 * Items
	 */
	public function item_exists() {
		if($this->item_model->item_exists($this->input->post('itemId')))
			echo 1;
		else
			echo 0;
	}

	public function get_item() {
		echo json_encode($this->item_model->get_item($this->input->post('itemId')));
	}

	public function get_all_items() {
		echo json_encode($this->item_model->get_all_items());
	}

	/**
	 * Receipts
	 */
	public function get_receipts_via_customer_id() {
		echo json_encode($this->receipt_model->get_receipts_via_customer_id($this->input->post('customerId')));
	}

	public function get_receipt() {
		echo json_encode($this->receipt_model->get_receipt($this->input->post('receiptId')));
	}

	/**
	 * Customers
	 */
	public function customer_exists() {
		if($this->customer_model->customer_exists($this->input->post('customerId')))
			echo 1;
		else
			echo 0;
	}

	public function get_customer() {
		echo json_encode($this->customer_model->get_customer($this->input->post('customerId')));
	}

	public function get_all_customers() {
		echo json_encode($this->customer_model->get_all_customers());
	}
}