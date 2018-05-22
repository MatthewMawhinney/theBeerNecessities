<?php

$url = 'js/parks.json';
$result = file_get_contents($url);
$parks = json_decode($result);

 ?>
