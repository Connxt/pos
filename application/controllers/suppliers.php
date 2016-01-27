<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Suppliers extends CI_Controller {
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

		$this->load->model('supplier_model');
		$this->load->model('item_model');
		$this->load->model('delivery_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'suppliers';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function new_supplier() {
		$this->supplier_model->new_supplier(
			$this->input->post('name'),
			$this->input->post('contactInfo')
		);

		echo json_encode($this->supplier_model->get_supplier($this->db->insert_id()));
	}

	public function update_supplier() {
		$supplier_id = $this->input->post('supplierId');

		if($this->supplier_model->supplier_exists($supplier_id)) {
			$this->supplier_model->update_supplier(
				$supplier_id,
				$this->input->post('name'),
				$this->input->post('contactInfo')
			);

			echo json_encode($this->supplier_model->get_supplier($supplier_id));
		}
		else {
			echo 0;
		}
	}

	public function delete_supplier() {
		$supplier_id = $this->input->post('supplierId');

		if($this->supplier_model->supplier_exists($supplier_id)) {
			if($this->delivery_model->delivery_exists_via_supplier_id($supplier_id)) {
				echo -1;
			}
			else {
				$this->supplier_model->delete_supplier($supplier_id);
				echo 1;
			}
		}
		else {
			echo 0;
		}
	}

	public function supplier_exists() {
		if($this->supplier_model->supplier_exists($this->input->post('supplierId')))
			echo 1;
		else
			echo 0;
	}

	public function get_supplier() {
		echo json_encode($this->supplier_model->get_supplier($this->input->post('supplierId')));
	}

	public function get_all_suppliers() {
		echo json_encode($this->supplier_model->get_all_suppliers());
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

	public function get_nonexistent_items() {
		$item_ids = $this->input->post('itemIds'); // ['1', '2', '3'] -> item ids
		$nonexistent_items = array();

		foreach($item_ids as $item_id) {
			if(!$this->item_model->item_exists($item_id)) {
				array_push($nonexistent_items, $item_id);
			}
		}

		echo json_encode($nonexistent_items);
	}

	public function new_delivery() {
		$items = $this->input->post('items'); // [ { 'itemId': '1', 'quantity': 1, 'actualPrice': 100.00 }, { 'itemId': '2', 'quantity': 2, 'actualPrice': 200.00 } ]

		$this->delivery_model->new_delivery(
			$items,
			$this->input->post('supplierId'),
			$this->input->post('userId')
		);

		foreach($items as $item) {
			$this->item_model->add_quantity_to_item($item['itemId'], $item['quantity']);
		}
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

	public function get_deliveries_via_supplier_id() {
		echo json_encode($this->delivery_model->get_deliveries_via_supplier_id($this->input->post('supplierId')));
	}
}