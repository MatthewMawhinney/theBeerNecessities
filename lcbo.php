<?php
require_once 'controllers/process.php';
require_once 'views/head.php';
?>
<body>
  <div class="locations">
    <a href="index.php"><img src="imgs/yogi.png" alt="The beer necessities logo"></a>
    <p>The closest beer is here!</p>
    <?php
      $counter = 0;
      foreach($stores->result as $s) {
      $distance = $s->distance_in_meters / 1000;
      echo "<div class='store'><a href='#' onclick='clickStoreTag($counter);'>
              <h3> $s->name </h3>
              <p> $s->address_line_1, $s->city </p>
              <p> $s->telephone </p>
              <p> $distance KM </p>
            </a></div>";
      $counter++;
    } ?>
  </div>
  <div class="map" id="map"></div>
  <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
  <script type="text/javascript">
      var lcbo = <?php echo $result ?>;
      var mapLat = <?php echo $lat ?>;
      var mapLong = <?php echo $long[2] ?>;
      var locName = '<?php echo $locationName[1] ?>';
  </script>
  <script type="text/javascript" src="js/script.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsAINUcSrEX8ey0tW2v8YmQ4aLhGf62Ss&callback=initMap" async defer></script>
</body>
</html>
