<?php

  if(isset($_POST['send'])) {
    $info = $_POST['parks'];
  }

  if($info == ""){
    header('Location: index.php');
  }

  $locationName = explode('/', $info);

  function get_string_between($string, $start, $end){
      $string = ' ' . $string;
      $ini = strpos($string, $start);
      if ($ini == 0) return '';
      $ini += strlen($start);
      $len = strpos($string, $end, $ini) - $ini;
      return substr($string, $ini, $len);
  }

  $lat = get_string_between($locationName[0], '=', '&');
  $long = explode('=', $locationName[0]);

  $url = 'https://lcboapi.com/stores?access_key=MDozMDVlMThmMC00NzJkLTExZTgtOWIwMi1lM2YyZWJiYzQ1YWM6VjM2NUEzZFA0QU5zM1BPWkNnUWtEOHlGaGN3S0NVd01aeE5R&'. $locationName[0] . '&per_page=10';

  $result = file_get_contents($url);
  $stores = json_decode($result);

 ?>
