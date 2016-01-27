<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Services extends CI_Controller {
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

		$this->load->model('service_model');
		$this->load->model('receipt_model');
		$this->load->model('delivery_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'services';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function new_service() {
		$service_id = $this->input->post('serviceId');

		if($this->service_model->service_exists($service_id)) {
			echo 0;
		}
		else {
			$this->service_model->new_service(
				$service_id,
				$this->input->post('description'),
				$this->input->post('sellingPriceCash'),
				$this->input->post('sellingPriceCreditCard'),
				$this->input->post('sellingPriceCredit')
			);

			echo json_encode($this->service_model->get_service($service_id));
		}
	}

	public function update_service() {
		$service_id = $this->input->post('serviceId');

		if($this->service_model->service_exists($service_id)) {
			$this->service_model->update_service(
				$service_id,
				$this->input->post('description'),
				$this->input->post('sellingPriceCash'),
				$this->input->post('sellingPriceCreditCard'),
				$this->input->post('sellingPriceCredit')
			);

			echo json_encode($this->service_model->get_service($service_id));
		}
		else {
			echo 0;
		}
	}

	public function delete_service() {
		$service_id = $this->input->post('serviceId');

		if($this->service_model->service_exists($service_id)) {
			if($this->receipt_model->receipt_service_exists_via_service_id($service_id)) {
				echo -1; // service was already used in a transaction
			}
			else {
				$this->service_model->delete_service($service_id);
				echo 1;
			}
		}
		else {
			echo 0; // service was already deleted by another session
		}
	}

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
}