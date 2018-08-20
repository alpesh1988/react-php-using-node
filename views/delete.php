<?php

//delete.php
function deleteProduct($id){
    
    include('database_connection.php');

    $message = '';

    $query = "DELETE FROM products WHERE id = '".$id."'";

    $statement = $connect->prepare($query);
    if($statement->execute())
    {
        $message = 'Data Deleted';
    }

    $output = array(
    'message' => $message
    );

    return json_encode($output);
}
?>