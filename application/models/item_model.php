<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Item_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_item($item_id, $description, $actual_price, $selling_price_cash, $selling_price_credit_card, $selling_price_credit) {
		$this->db->insert('items', array(
			'id' => $item_id,
			'description' => $description,
			'quantity' => 0,
			'actual_price' => $actual_price,
			'selling_price_cash' => $selling_price_cash,
			'selling_price_credit_card' => $selling_price_credit_card,
			'selling_price_credit' => $selling_price_credit,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function update_item($item_id, $description, $actual_price, $selling_price_cash, $selling_price_credit_card, $selling_price_credit) {
		$this->db->where('id', $item_id);
		$this->db->update('items', array(
			'description' => $description,
			'actual_price' => $actual_price,
			'selling_price_cash' => $selling_price_cash,
			'selling_price_credit_card' => $selling_price_credit_card,
			'selling_price_credit' => $selling_price_credit,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function add_quantity_to_item($item_id, $quantity) {
		$item = $this->get_item($item_id);

		$this->db->where('id', $item_id);
		$this->db->update('items', array(
			'quantity' => $item->quantity + $quantity,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function deduct_quantity_to_item($item_id, $quantity) {
		$item = $this->get_item($item_id);

		$this->db->where('id', $item_id);
		$this->db->update('items', array(
			'quantity' => $item->quantity - $quantity,
			'updated_at' => date('Y-m-d H:i:s')
		));	
	}

	function delete_item($item_id) {
		$this->db->delete('items', array('id' => $item_id));
		return $this->db->affected_rows();
	}

	function item_exists($item_id) {
		$query = $this->db->query('SELECT id FROM items WHERE id="' . $item_id . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_item($item_id) {
		$query = $this->db->query('SELECT * FROM items WHERE id="' . $item_id . '"');
		return $query->row();
	}

	function get_all_items() {
		$query = $this->db->query('SELECT * FROM items');
		return $query->result();
	}
}