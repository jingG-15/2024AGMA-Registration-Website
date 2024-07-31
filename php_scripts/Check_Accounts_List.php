<?php
    $con=mysqli_connect("localhost","","","agma_2024");

   if (mysqli_connect_errno($con)) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
   $response = array();
   $temp = array(); 
   $in_Account_Number_Search = $_POST['Search_Account_Number'];
   
   mysqli_set_charset($con,'utf8');
   /*$result = mysqli_query($con,"SELECT Account_Number, Account_Name, Address, Class, Town, Account_Sequence, 
								Membership_Number FROM accounts_list WHERE
								Account_Number='$in_Account_Number_Search'");
   
	$row = mysqli_fetch_array($result);*/



	// $temp["message"] = "Registration closed. Please try again next year.";
	//   array_push($response, $temp);
	//   echo json_encode($response);


	$stmt = $con->prepare("SELECT Account_Number, Account_Name, Address, Class, Town, Account_Sequence, 
								Membership_Number FROM accounts_list WHERE
								Account_Number=?");
	$stmt->bind_param("s", $in_Account_Number_Search);
	$stmt->execute();
	$result = $stmt->get_result();
	$row = mysqli_fetch_array($result);
	  
	if($row){
	  $temp["message"] = "Match Found";
	  $temp["F_Account_Number"] = $row[0];
	  $temp["F_Account_Name"] = $row[1];
	  $temp["F_Address"] = $row[2];
	  $temp["F_Class"] = $row[3];
	  $temp["F_Town"] = $row[4];
	  $temp["F_Sequence"] = $row[5];
	  $temp["F_Mem_Number"] = $row[6];
	  array_push($response, $temp);
	  echo json_encode($response);
	}else{
	  $temp["message"] = "Account number does not exists!";
	  array_push($response, $temp);
	  echo json_encode($response);
	}
   
   
  
	
   mysqli_close($con);
?>
