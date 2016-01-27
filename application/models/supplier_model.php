<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Supplier_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_supplier($name, $contact_info) {
		$this->db->insert('suppliers', array(
			'name' => $name,
			'contact_info' => $contact_info,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function update_supplier($supplier_id, $name, $contact_info) {
		$this->db->where('id', $supplier_id);
		$this->db->update('suppliers', array(
			'name' => $name,
			'contact_info' => $contact_info,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function delete_supplier($supplier_id) {
		$this->db->delete('suppliers', array('id' => $supplier_id));
		return $this->db->affected_rows();
	}

	function supplier_exists($supplier_id) {
		$query = $this->db->query('SELECT id FROM suppliers WHERE id=' . $supplier_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_supplier($supplier_id) {
		$supplier = $this->db->query('SELECT * FROM suppliers WHERE id=' . $supplier_id)->row();

		$total_amount_delivered = $this->db->query(
			'SELECT SUM(delivery_items.quantity * delivery_items.actual_price) AS total_amount_delivered ' .
			'FROM deliveries ' .
			'	INNER JOIN delivery_items ' .
			'	ON deliveries.id=delivery_items.delivery_id ' .
			'WHERE deliveries.supplier_id=' . $supplier_id)->row()->total_amount_delivered;

		$supplier->total_amount_delivered = (is_null($total_amount_delivered) ? 0 : $total_amount_delivered);

		return $supplier;
	}

	function get_all_suppliers() {
		$temp_suppliers = $this->db->query('SELECT id FROM suppliers')->result();
		$suppliers = array();

		foreach($temp_suppliers as $supplier) {
			array_push($suppliers, $this->get_supplier($supplier->id));
		}

		return $suppliers;
	}
}