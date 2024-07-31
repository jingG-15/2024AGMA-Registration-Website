<?php
    $con=mysqli_connect("localhost","","","agma_2024");

   if (mysqli_connect_errno($con)) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
   $response = array();
   $temp = array(); 
   $in_Account_Number_Search = $_POST['Search_Account_Number'];
   
   mysqli_set_charset($con,'utf8');


   /*$result = mysqli_query($con,"SELECT Stub_Number, Bil_Account_Number, Bil_Account_Name, 
								Bil_Address, Contact_Number, Bil_Class FROM overall_reg WHERE
								Bil_Account_Number='$in_Account_Number_Search'");
   
	$row = mysqli_fetch_array($result);*/



	$stmt = $con->prepare("SELECT Stub_Number, Bil_Account_Number, Bil_Account_Name, 
						Bil_Address, Contact_Number, Bil_Class FROM overall_reg WHERE
						Bil_Account_Number=?");
	$stmt->bind_param("s", $in_Account_Number_Search);
	$stmt->execute();
	$result = $stmt->get_result();
	$row = mysqli_fetch_array($result);

	if($row){
	  $temp["message"] = "Match Found";
	  $temp["Stub_Number"] = $row[0];
	  $temp["Account_Number"] = $row[1];
	  $temp["Account_Name"] = $row[2];
	  $temp["Address"] = $row[3];
	  $temp["Contact_Number"] = $row[4];
	  $temp["Class"] = $row[5];
	  array_push($response, $temp);
	  echo json_encode($response);
	}else{
	  $temp["message"] = "Account is Valid";
	  array_push($response, $temp);
	  echo json_encode($response);
	}
   
   mysqli_close($con);
?>
