<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Cashiering extends CI_Controller {
	const INITIAL_PAYMENT = 1;
	const CREDIT_PAYMENT = 2;

	public function __construct() {
		parent::__construct();

		$session_data = $this->session->userdata('samson_auth');

		if(!$this->session->userdata('samson_auth')) {
			redirect('login', 'refresh');
		}

		$this->load->model('item_model');
		$this->load->model('service_model');
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
		$data['current_page'] = 'cashiering';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	/**
	 * Cashiering
	 */
	public function get_nonexistent_items() {
		$item_ids = (gettype($this->input->post('itemIds')) == "array") ? $this->input->post('itemIds') : array(); // ['1', '2', '3'] -> item ids
		$nonexistent_items = array();

		foreach($item_ids as $item_id) {
			if(!$this->item_model->item_exists($item_id)) {
				array_push($nonexistent_items, $item_id);
			}
		}

		echo json_encode($nonexistent_items);
	}

	public function get_nonexistent_services() {
		$service_ids = (gettype($this->input->post('serviceIds')) == "array") ? $this->input->post('serviceIds') : array(); // ['1', '2', '3'] -> service ids
		$nonexistent_services = array();

		foreach($service_ids as $service_id) {
			if(!$this->service_model->service_exists($service_id)) {
				array_push($nonexistent_services, $service_id);
			}
		}

		echo json_encode($nonexistent_services);
	}

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

	public function get_items_with_insufficient_quantity() {
		$items = (gettype($this->input->post('items')) == "array") ? $this->input->post('items') : array();
		$items_with_insufficient_quantity = array();

		foreach($items as $item) {
			$item_info = $this->item_model->get_item($item['itemId']);

			if($item['quantity'] > $item_info->quantity) {
				array_push($items_with_insufficient_quantity, array(
					'item_id' => $item_info->id,
					'current_quantity' => $item_info->quantity,
					'requested_quantity' => $item["quantity"]
				));
			}
		}

		echo json_encode($items_with_insufficient_quantity);
	}

	public function save_transaction() {
		$receipt_items = (gettype($this->input->post('receiptItems')) == "array") ? $this->input->post('receiptItems') : array();
		$receipt_services = (gettype($this->input->post('receiptServices')) == "array") ? $this->input->post('receiptServices') : array();
		$customer_id = $this->input->post('customerId');
		$amount_paid = $this->input->post('amountPaid');
		$trade_ins = (gettype($this->input->post('tradeInItems')) == "array") ? $this->input->post('tradeInItems') : array();
		$mode_of_payment = $this->input->post('modeOfPayment');
		$num_of_days = $this->input->post('numOfDays');
		$user_id = $this->input->post('userId');

		$receipt_id = $this->receipt_model->new_receipt($receipt_items, $receipt_services, $customer_id, $trade_ins, $mode_of_payment, $num_of_days);
		$payment_id = $this->payment_model->new_payment($receipt_id, $amount_paid, Cashiering::INITIAL_PAYMENT, $user_id);
		$this->trade_in_model->new_trade_in($payment_id, $trade_ins);

		foreach($receipt_items as $receipt_item) {
			$this->item_model->deduct_quantity_to_item($receipt_item['itemId'], $receipt_item['quantity']);
		}

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
	 * Services
	 */
	public function service_exists() {
		if($this->service_model->service_exists($this->input->post('serviceId')))
			echo 1;
		else
			echo 0;
	}

	public function get_service() {
		echo json_encode($this->service_model->get_service($this->input->post('serviceId')));
	}

	public function get_all_services() {
		echo json_encode($this->service_model->get_all_services());
	}

	/**
	 * Customers
	 */
	public function new_customer() {
		$this->customer_model->new_customer(
			$this->input->post('lastName'),
			$this->input->post('firstName'),
			$this->input->post('middleName'),
			$this->input->post('address'),
			$this->input->post('contactInfo')
		);

		echo json_encode($this->customer_model->get_customer($this->db->insert_id()));
	}

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