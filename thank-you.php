<?php
    // Connect to database
    $conn = new mysqli("localhost", "root", "123456", "mydba");

    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT max(id)as userID from leadregister";
    $result =$conn->query($sql);
    $data["fname"] = ""; $data["lname"] = ""; $data["email"] = "";
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $userID = $row["userID"];
        }
      } else {
        echo "0 results";
      }

      $sql = "SELECT * from leadregister WHERE id = '$userID'";
      $result =$conn->query($sql);

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $data["fname"] = $row["fname"];
          $data["lname"] = $row["lname"];
          $data["email"] = $row["email"];
        }
      } else {
        echo "0 results";
      }


    //Close database connection
    $conn->close();

    echo json_encode($data);
?>