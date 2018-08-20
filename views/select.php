<?php  

//select.php
 function fetchProducts() {  

  include('database_connection.php');
  $query = "SELECT * FROM products ORDER BY id ASC";
  $statement = $connect->prepare($query);
  if($statement->execute())
  {
    while($row = $statement->fetch(PDO::FETCH_ASSOC))
    {
      $data[] = $row;
    }
    return json_encode($data);
  }
 }

?>