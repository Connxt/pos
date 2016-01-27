<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Users extends CI_Controller {
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

		$this->load->model('user_model');
	}

	public function index() {
		$session_data = $this->session->userdata('samson_auth');

		$data['user_id'] = $session_data['user_id'];
		$data['name'] = $session_data['name'];
		$data['user_level'] = $session_data['user_level'];
		$data['path'] = $session_data['path'];
		$data['current_page'] = 'users';

		$this->load->view($data['current_page'] . '/index', $data);
	}

	public function new_user() {
		$this->user_model->new_user(
			$this->input->post('username'),
			$this->input->post('password'),
			$this->input->post('lastName'),
			$this->input->post('firstName'),
			$this->input->post('middleName'),
			$this->input->post('userLevelId')
		);

		echo json_encode($this->user_model->get_user($this->db->insert_id()));
	}

	public function update_user() {
		$user_id = $this->input->post('userId');

		if($this->user_model->user_exists($user_id)) {
			$this->user_model->update_user(
				$user_id,
				$this->input->post('lastName'),
				$this->input->post('firstName'),
				$this->input->post('middleName'),
				$this->input->post('userLevelId')
			);

			echo json_encode($this->user_model->get_user($user_id));
		}
		else {
			echo 0;
		}
	}

	public function delete_user() {
		$user_id = $this->input->post('userId');

		if($this->user_model->user_exists($user_id)) {
			if($this->delivery_model->delivery_exists_via_user_id($user_id)) {
				echo -1;
			}
			else {
				$this->user_model->delete_user($user_id);
				echo 1;
			}
		}
		else {
			echo 0;
		}
	}

	public function user_exists() {
		if($this->user_model->user_exists($this->input->post('userId')))
			echo 1;
		else
			echo 0;
	}

	public function username_exists() {
		if($this->user_model->username_exists($this->input->post('username')))
			echo 1;
		else
			echo 0;
	}

	public function get_user() {
		echo json_encode($this->user_model->get_user($this->input->post('userId')));
	}

	public function get_all_users() {
		echo json_encode($this->user_model->get_all_users());
	}
}