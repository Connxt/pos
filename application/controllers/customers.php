<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Customers extends CI_Controller {
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

		$this->load->model('customer_model');
		$this->load->model('receipt_model');
		$this->load->model('payment_model');
		$this->load->model('trade_in_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'customers';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function new_customer() {
		$this->customer_model->new_customer(
			$this->input->post('lastName'),
			$this->input->post('firstName'),
			$this->input->post('middleName'),
			$this->input->post('address'),
			$this->input->post('contactInfo')
		);

		echo json_encode($this->_get_customer($this->db->insert_id()));
	}

	public function update_customer() {
		$customer_id = $this->input->post('customerId');

		if($this->customer_model->customer_exists($customer_id)) {
			$this->customer_model->update_customer(
				$customer_id,
				$this->input->post('lastName'),
				$this->input->post('firstName'),
				$this->input->post('middleName'),
				$this->input->post('address'),
				$this->input->post('contactInfo')
			);

			echo json_encode($this->_get_customer($customer_id));
		}
		else {
			echo 0;
		}
	}

	public function delete_customer() {
		$customer_id = $this->input->post('customerId');

		if($this->customer_model->customer_exists($customer_id)) {
			if($this->receipt_model->receipt_exists_via_customer_id($customer_id)) {
				echo -1;
			}
			else {
				$this->customer_model->delete_customer($customer_id);
				echo 1;
			}
		}
		else {
			echo 0;
		}
	}

	public function customer_exists() {
		if($this->customer_model->customer_exists($this->input->post('customerId')))
			echo 1;
		else
			echo 0;
	}

	private function _get_customer($customer_id) {
		$customer = $this->customer_model->get_customer($customer_id);

		if($customer->balance <= 0) {
			$customer->days_left = 0;
			return $customer;
		}
		else {
			$max_days_left = 0;
			$receipts = $this->receipt_model->get_receipts_via_customer_id($customer->id);

			foreach($receipts as $receipt) {
				if($receipt->balance > 0) {
					if($receipt->days_left > $max_days_left) {
						$max_days_left = $receipt->days_left;
					}
				}
			}

			$min_days_left = $max_days_left;

			foreach($receipts as $receipt) {
				if($receipt->balance > 0) {
					if($receipt->days_left < $min_days_left) {
						$min_days_left = $receipt->days_left;
					}
				}
			}

			$customer->days_left = $min_days_left;
			return $customer;
		}
	}

	public function get_customer() {
		$customer = $this->customer_model->get_customer($this->input->post('customerId'));

		if($customer->balance <= 0) {
			$customer->days_left = 0;
			echo json_encode($customer);
		}
		else {
			$max_days_left = 0;
			$receipts = $this->receipt_model->get_receipts_via_customer_id($customer->id);

			foreach($receipts as $receipt) {
				if($receipt->balance > 0) {
					if($receipt->days_left > $max_days_left) {
						$max_days_left = $receipt->days_left;
					}
				}
			}

			$min_days_left = $max_days_left;

			foreach($receipts as $receipt) {
				if($receipt->balance > 0) {
					if($receipt->days_left < $min_days_left) {
						$min_days_left = $receipt->days_left;
					}
				}
			}

			$customer->days_left = $min_days_left;
			echo json_encode($customer);
		}
	}

	public function get_all_customers() {
		$temp_customers = $this->customer_model->get_all_customers();
		$customers = array();

		foreach($temp_customers as $customer) {
			if($customer->balance <= 0) {
				$customer->days_left = 0;
				array_push($customers, $customer);
			}
			else {
				$max_days_left = 0;
				$receipts = $this->receipt_model->get_receipts_via_customer_id($customer->id);

				foreach($receipts as $receipt) {
					if($receipt->balance > 0) {
						if($receipt->days_left > $max_days_left) {
							$max_days_left = $receipt->days_left;
						}
					}
				}

				$min_days_left = $max_days_left;
				foreach($receipts as $receipt) {
					if($receipt->balance > 0) {
						if($receipt->days_left < $min_days_left) {
							$min_days_left = $receipt->days_left;
						}
					}
				}

				$customer->days_left = $min_days_left;
				array_push($customers, $customer);
			}
		}

		echo json_encode($customers);
	}

	public function get_receipt() {
		echo json_encode($this->receipt_model->get_receipt($this->input->post('receiptId')));
	}

	public function get_receipts_via_customer_id() {
		echo json_encode($this->receipt_model->get_receipts_via_customer_id($this->input->post('customerId')));
	}

	public function get_receipt_items() {
		echo json_encode($this->receipt_model->get_receipt_items($this->input->post('receiptId')));
	}

	public function get_receipt_services() {
		echo json_encode($this->receipt_model->get_receipt_services($this->input->post('receiptId')));
	}

	public function get_payment() {
		echo json_encode($this->payment_model->get_payment($this->input->post('paymentId')));
	}

	public function get_payments_via_receipt_id() {
		echo json_encode($this->payment_model->get_payments_via_receipt_id($this->input->post('receiptId')));
	}

	public function get_trade_ins_via_payment_id() {
		echo json_encode($this->trade_in_model->get_trade_ins_via_payment_id($this->input->post('paymentId')));
	}
}