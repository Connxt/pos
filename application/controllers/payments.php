<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Payments extends CI_Controller {
	public function __construct() {
		parent::__construct();

		$session_data = $this->session->userdata('samson_auth');

		if($this->session->userdata('samson_auth')) {
			if($session_data['user_level'] != 'Administrator')
				redirect('cashiering', 'refresh');
		}
		else {
			redirect('login', 'refresh');
		}

		$this->load->model('payment_model');
		$this->load->model('trade_in_model');
		$this->load->model('receipt_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'payments';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function get_payment() {
		echo json_encode($this->payment_model->get_payment($this->input->post('paymentId')));
	}

	public function get_all_payments() {
		echo json_encode($this->payment_model->get_all_payments());
	}

	public function get_trade_ins_via_payment_id() {
		echo json_encode($this->trade_in_model->get_trade_ins_via_payment_id($this->input->post('paymentId')));
	}

	public function get_receipt() {
		echo json_encode($this->receipt_model->get_receipt($this->input->post('receiptId')));
	}
	
	public function get_receipt_items() {
		echo json_encode($this->receipt_model->get_receipt_items($this->input->post('receiptId')));
	}

	public function get_receipt_services() {
		echo json_encode($this->receipt_model->get_receipt_services($this->input->post('receiptId')));
	}
}