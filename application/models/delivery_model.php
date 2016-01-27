<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Delivery_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_delivery(array $items, $supplier_id, $user_id) {
		$this->db->insert('deliveries', array(
			'supplier_id' => $supplier_id,
			'user_id' => $user_id,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));

		$delivery_id = $this->db->insert_id();

		foreach($items as $item) {
			$this->db->insert('delivery_items', array(
				'delivery_id' => $delivery_id,
				'item_id' => $item['itemId'],
				'actual_price' => $item['actualPrice'],
				'quantity' => $item['quantity']
			));
		}
	}

	function delivery_exists($delivery_id) {
		$query = $this->db->query('SELECT id FROM deliveries WHERE id=' . $delivery_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_delivery($delivery_id) {
		$temp_delivery = $this->db->query(
			'SELECT ' .
			'	deliveries.id, deliveries.supplier_id, deliveries.user_id, deliveries.created_at, ' .
			'	suppliers.name AS supplier_name, suppliers.contact_info, ' .
			'	users.last_name AS user_last_name, users.first_name AS user_first_name, users.middle_name AS user_middle_name ' .
			'FROM deliveries ' .
			'	INNER JOIN suppliers ' .
			'	ON deliveries.supplier_id=suppliers.id ' .
			'		INNER JOIN users ' .
			'		ON deliveries.user_id=users.id ' .
			'WHERE deliveries.id=' . $delivery_id)->row();

		$total_amount = $this->db->query('SELECT SUM(quantity * actual_price) AS total_amount FROM delivery_items WHERE delivery_id=' . $delivery_id)->row()->total_amount;

		$delivery_items = $this->db->query(
			'SELECT ' .
			'	delivery_items.id AS delivery_item_id, delivery_items.item_id, delivery_items.actual_price, delivery_items.quantity, ' .
			'	items.description ' .
			'FROM delivery_items ' .
			'	INNER JOIN items ' .
			'	ON delivery_items.item_id=items.id ' .
			'WHERE delivery_items.delivery_id=' . $delivery_id)->result();

		$delivery = array(
			'id' => $temp_delivery->id,
			'supplier_id' => $temp_delivery->supplier_id,
			'user_id' => $temp_delivery->user_id,
			'created_at' => $temp_delivery->created_at,
			'supplier_name' => $temp_delivery->supplier_name,
			'contact_info' => $temp_delivery->contact_info,
			'user_last_name' => $temp_delivery->user_last_name,
			'user_first_name' => $temp_delivery->user_first_name,
			'user_middle_name' => $temp_delivery->user_middle_name,
			'total_amount' => $total_amount,
			'delivery_items' => $delivery_items
		);

		return $delivery;
	}

	function get_all_deliveries() {
		$temp_deliveries = $this->db->query('SELECT id FROM deliveries')->result();

		$deliveries = array();
		foreach($temp_deliveries as $temp_delivery) {
			array_push($deliveries, $this->get_delivery($temp_delivery->id));
		}

		return $deliveries;
	}

	function get_deliveries_via_supplier_id($supplier_id) {
		$temp_deliveries = $this->db->query('SELECT id FROM deliveries WHERE supplier_id=' . $supplier_id)->result();

		$deliveries = array();
		foreach($temp_deliveries as $temp_delivery) {
			array_push($deliveries, $this->get_delivery($temp_delivery->id));
		}

		return $deliveries;
	}

	function delivery_exists_via_supplier_id($supplier_id) {
		$query = $this->db->query('SELECT id FROM deliveries WHERE supplier_id=' . $supplier_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function delivery_item_exists_via_item_id($item_id) {
		$query = $this->db->query('SELECT id FROM delivery_items WHERE item_id="' . $item_id . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}
}