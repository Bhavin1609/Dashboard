<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email =  $_POST['email'];
$course = $_POST['course'];
$dateofbirth = $_POST['dateofbirth'];
$gender = $_POST['gender'];
$address = $_POST['address'];
$phone = $_POST['phone'];

if (!empty($firstname) || !empty($lastname) || !empty($email) || !empty($course) || !empty($dateofbirth) 
    || !empty($gender) || !empty($address) || !empty($phone)){
    $host = "localhost";
    $dbfirstname = "root";
    $dblastname = "";
    $dbname = "register";

    $conn = new mysqli($host,$dbfirstname,$dblastname,$dbname);


    if(mysqli_connect_error()){
        die('Connect Error('.mysqli_connect_errno().')'. mysqli_connect_error());
    }else{
        $SELECT = "SELECT email from register where email = ? Limit 1";
        $INSERT = "INSERT Into st data(firstname,lastname,email,course,dateofbirth
        ,gender,address,phone) values(?,?,?,?,?,?,?,?)";

        $stmt = $conn->prepare($SELECT);
        $stmt ->$bind_param("s",$email);
        $stmt ->execute();
        $stmt ->bind_result($email);
        $stmt ->store_result();
        $rnum = $stmt ->num_rows;

        if($rnum==0){
            $stmt ->close();

            $stmt = $conn->prepare($INSERT);
            $stmt->$bind_param( "sssssssi", $firstname,$lastname,$email,$course,
            $dateofbirth,$gender,$address,$phone);
            $stmt->execute();
            echo "New record inserted sucessfully";
        }
           $stmt->close();
           $conn->close();
    }

} else{
        echo "All field are required";
        die();
}

?>