<?php  

//edit.php
function editProduct($editedData) { 

    include('database_connection.php');

    $message = '';
    
    $data = array(
        ':id'    => $editedData['id'],
        ':name'  => $editedData['name'],
        ':description'  => $editedData['description'],
        ':price'  => $editedData['price']
    );

    $query = "
    UPDATE products 
    SET name = :name, description = :description, price = :price 
    WHERE id = :id
    ";

    $statement = $connect->prepare($query);
    if($statement->execute($data))
    {
        $message = 'Data Edited';
    }

    $output = array(
        'message' => $message
    );

    return json_encode($output);
}
?>