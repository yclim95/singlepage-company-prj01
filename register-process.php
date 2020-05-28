<?php
if(isset($_POST['fname']) && isset( $_POST['lname']) && isset( $_POST['phone']) &&
isset( $_POST['email']) && isset( $_POST['password']) && isset( $_POST['fcourse']))
{
    $conn = new mysqli("localhost", "root", "123456", "mydba");
    $sql = "INSERT INTO leadregister(fname,lname,phone,email,password,fcourse) values('" .
    $_POST["fname"] . "','" . $_POST["lname"] . "', '" . $_POST["phone"] . "' , 
    '" . $_POST["email"] . "', '" . $_POST["password"] . "', '" . $_POST["fcourse"] . "')";
    $conn->query($sql);
    $conn->close();
}
?>