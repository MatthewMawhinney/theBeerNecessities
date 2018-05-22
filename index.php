<?php
require_once 'controllers/getParks.php';
require_once 'views/head.php';
 ?>
 <body>
   <div class="container">
     <img src="imgs/yogi.png" alt="Yogi beer running through the woods with a crate of beer.">
     <form class="" action="lcbo.php" method="post">
       <label for="parks">Select Park</label>
       <select id="parks" name="parks">
         <option value="">Where are you camping?</option>
         <?php foreach($parks as $p) {
           echo "<option value='$p->location/$p->name'>$p->name</option>";
         } ?>
       </select>
       <input type="submit" name="send" value="Find Me The Closest LCBO">
       <p>Hey Boo Boo, let's go get us a cheap-a-beer basket!</p>
     </form>
   </div>
 </body>
 </html>
