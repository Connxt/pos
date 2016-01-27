<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Items extends CI_Controller {
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

		$this->load->model('item_model');
		$this->load->model('receipt_model');
		$this->load->model('delivery_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'items';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function new_item() {
		$item_id = $this->input->post('itemId');

		if($this->item_model->item_exists($item_id)) {
			echo 0;
		}
		else {
			$this->item_model->new_item(
				$item_id,
				$this->input->post('description'),
				$this->input->post('actualPrice'),
				$this->input->post('sellingPriceCash'),
				$this->input->post('sellingPriceCreditCard'),
				$this->input->post('sellingPriceCredit')
			);

			echo json_encode($this->item_model->get_item($item_id));
		}
	}

	public function update_item() {
		$item_id = $this->input->post('itemId');

		if($this->item_model->item_exists($item_id)) {
			$this->item_model->update_item(
				$item_id,
				$this->input->post('description'),
				$this->input->post('actualPrice'),
				$this->input->post('sellingPriceCash'),
				$this->input->post('sellingPriceCreditCard'),
				$this->input->post('sellingPriceCredit')
			);

			echo json_encode($this->item_model->get_item($item_id));
		}
		else {
			echo 0;
		}
	}

	public function delete_item() {
		$item_id = $this->input->post('itemId');

		if($this->item_model->item_exists($item_id)) {
			if($this->delivery_model->delivery_item_exists_via_item_id($item_id)) {
				echo -2; // item was already delivered by a supplier
			}
			else if($this->receipt_model->receipt_item_exists_via_item_id($item_id)) {
				echo -1; // item was already used in a transaction
			}
			else {
				$this->item_model->delete_item($item_id);
				echo 1;
			}
		}
		else {
			echo 0; // item was already deleted by another session
		}
	}

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
}