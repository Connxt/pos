<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Service_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_service($service_id, $description, $selling_price_cash, $selling_price_credit_card, $selling_price_credit) {
		$this->db->insert('services', array(
			'id' => $service_id,
			'description' => $description,
			'selling_price_cash' => $selling_price_cash,
			'selling_price_credit_card' => $selling_price_credit_card,
			'selling_price_credit' => $selling_price_credit,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function update_service($service_id, $description, $selling_price_cash, $selling_price_credit_card, $selling_price_credit) {
		$this->db->where('id', $service_id);
		$this->db->update('services', array(
			'description' => $description,
			'selling_price_cash' => $selling_price_cash,
			'selling_price_credit_card' => $selling_price_credit_card,
			'selling_price_credit' => $selling_price_credit,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function delete_service($service_id) {
		$this->db->delete('services', array('id' => $service_id));
		return $this->db->affected_rows();
	}

	function service_exists($service_id) {
		$query = $this->db->query('SELECT id FROM services WHERE id="' . $service_id . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_service($service_id) {
		$query = $this->db->query('SELECT * FROM services WHERE id="' . $service_id . '"');
		return $query->row();
	}

	function get_all_services() {
		$query = $this->db->query('SELECT * FROM services');
		return $query->result();
	}
}