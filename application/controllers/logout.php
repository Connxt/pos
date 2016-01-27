<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
session_start();
class Logout extends CI_Controller {
	public function __construct() {
		parent::__construct();

		if(!$this->session->userdata('samson_auth')) {
			redirect('login', 'refresh');
		}
	}

	public function index() {
		$this->session->unset_userdata('samson_auth');
		session_destroy();
		redirect('login', 'refresh');
	}
}