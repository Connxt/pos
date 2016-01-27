<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Login extends CI_Controller {
	/**
	 * [$is_dev description]
	 * @var boolean
	 * true = when the app is in a local server
	 * false = when the app is in a subdomain or a website
	 */
	private $is_dev = false;

	public function __construct() {
		parent::__construct();

		$session_data = $this->session->userdata('samson_auth');

		if($this->session->userdata('samson_auth')) {
			if($session_data['user_level'] == 'Administrator')
				redirect('cashiering', 'refresh');
			else
				redirect('cashiering', 'refresh');
		}

		$this->load->model('user_model');
	}

	public function index() {
		$data['path'] = ($this->is_dev == false) ? '/../_shared/' : $_SERVER['DOCUMENT_ROOT'] . '/application/views/_shared/';
		$data['current_page'] = 'login';
		$this->load->view('login/index', $data);
	}

	public function login_user() {
		$username = $this->input->post('username');
		$password = $this->input->post('password');

		if($this->user_model->is_username_and_password_correct($username, $password)) {
			$user = $this->user_model->get_user_via_username($username);

			$this->session->set_userdata('samson_auth', array(
				'user_id' => $user->id,
				'name' => $user->first_name . ' ' . $user->last_name,
				'user_level' => $user->user_level,
				'path' => ($this->is_dev == false) ? '/../_shared/' : $_SERVER['DOCUMENT_ROOT'] . '/application/views/_shared/'
			));

			echo 1;
		}
		else
			echo 0;
	}
}