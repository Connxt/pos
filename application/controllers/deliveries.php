<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Deliveries extends CI_Controller {
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

		$this->load->model('delivery_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'deliveries';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function delivery_exists() {
		if($this->delivery_model->delivery_exists($this->input->post('deliveryId')))
			echo 1;
		else
			echo 0;
	}

	public function get_delivery() {
		echo json_encode($this->delivery_model->get_delivery($this->input->post('deliveryId')));
	}

	public function get_all_deliveries() {
		echo json_encode($this->delivery_model->get_all_deliveries());
	}
}