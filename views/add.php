<?php  

//insert.php
function addProduct($productData) { 
    include('database_connection.php');

    $message = '';

    $data = array(
    ':name'  => $productData['name'],
    ':description'  => $productData['description'],
    ':price'  => $productData['price']
    );

    $query = "
    INSERT INTO products 
    (name, description, price) VALUES 
    (:name, :description, :price)
    ";

    $statement = $connect->prepare($query);

    if($statement->execute($data))
    {
    $message = 'Data Inserted';
    }

    $output = array(
    'message' => $message
    );

    return json_encode($output);
}

?>