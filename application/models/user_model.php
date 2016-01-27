<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function new_user($username, $password, $last_name, $first_name, $middle_name, $user_level_id) {
		$this->db->insert('users', array(
			'username' => $username,
			'password' => md5($password),
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'user_level_id' => $user_level_id,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function update_user($user_id, $last_name, $first_name, $middle_name, $user_level_id) {
		$this->db->where('id', $user_id);
		$this->db->update('users', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'user_level_id' => $user_level_id,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function delete_user($user_id) {
		$this->db->delete('users', array('id' => $user_id));
		return $this->db->affected_rows();
	}

	function user_exists($user_id) {
		$query = $this->db->query('SELECT id FROM users WHERE id=' . $user_id);
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function username_exists($username) {
		$query = $this->db->query('SELECT id FROM users WHERE username="' . $username . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}

	function get_user($user_id) {
		$query = $this->db->query(
			'SELECT ' .
			'	users.id, users.username, users.last_name, users.first_name, users.middle_name, users.created_at, users.updated_at, users.user_level_id, ' .
			'	user_levels.user_level ' .
			'FROM users ' .
			'	INNER JOIN user_levels ' .
			'	ON users.user_level_id=user_levels.id ' .
			'WHERE users.id=' . $user_id);

		return $query->row();
	}

	function get_user_via_username($username) {
		$query = $this->db->query(
			'SELECT ' .
			'	users.id, users.username, users.last_name, users.first_name, users.middle_name, users.created_at, users.updated_at, users.user_level_id, ' .
			'	user_levels.user_level ' .
			'FROM users ' .
			'	INNER JOIN user_levels ' .
			'	ON users.user_level_id=user_levels.id ' .
			'WHERE username="' . $username . '"');

		return $query->row();
	}

	function get_all_users() {
		$query = $this->db->query(
			'SELECT ' .
			'	users.id, users.username, users.last_name, users.first_name, users.middle_name, users.created_at, users.updated_at, users.user_level_id, ' .
			'	user_levels.user_level ' .
			'FROM users ' .
			'	INNER JOIN user_levels ' .
			'	ON users.user_level_id=user_levels.id');

		return $query->result();
	}

	function is_username_and_password_correct($username, $password) {
		$query = $this->db->query('SELECT id FROM users WHERE username="' . $username . '" AND password="' . md5($password) . '"');
		if($query->num_rows() >= 1)
			return true;
		else
			return false;
	}
}