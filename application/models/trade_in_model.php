<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Trade_In_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_trade_in($payment_id, $trade_ins) {
		foreach($trade_ins as $trade_in) {
			$this->db->insert('trade_ins', array(
				'payment_id' => $payment_id,
				'item_id' => $trade_in['itemId'],
				'quantity' => $trade_in['quantity'],
				'price' => $trade_in['price']
			));
		}
	}

	function get_trade_ins_via_payment_id($payment_id) {
		$trade_ins = $this->db->query(
			'SELECT ' .
			'	trade_ins.id, trade_ins.payment_id, trade_ins.item_id, trade_ins.quantity, trade_ins.price, ' .
			'	items.description ' .
			'FROM trade_ins ' .
			'	INNER JOIN items ' .
			'	ON trade_ins.item_id=items.id ' .
			'WHERE trade_ins.payment_id=' . $payment_id)->result();

		return $trade_ins;
	}
}