<?php
    $con=mysqli_connect("localhost","jingG_15","haPPymeals","agma_2024");
	
	
	if (mysqli_connect_errno($con)) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$response = array();
	$temp = array(); 
	
   
	$in_Account_Number = $_POST['P_Account_Number'];
	$in_Account_Name = $_POST['P_Account_Name'];
	$in_Address = $_POST['P_Billing_Address'];
	$in_Class = $_POST['P_Class'];
	$in_Contact_Number = $_POST['P_Contact_Number'];
	$in_Town = $_POST['P_Town'];
	$in_Photo_ID = base64_decode($_POST['P_Photo_ID']);
	$in_Photo_Signature = base64_decode($_POST['P_Photo_Signature']);
	$in_Username = $_POST['P_Username'];
	date_default_timezone_set('Asia/Manila');
	$date = date('Y-m-d H:i:s');
	
	$rand_Stub_Number = "";
	
	if(empty($in_Account_Number) || empty($in_Account_Name) || empty($in_Class) ||
			empty($in_Town) || empty($in_Photo_ID) || empty($in_Photo_Signature) || 
			empty($in_Username) || empty($in_Address)){
				
			$temp["message"] = "Error in Data Transmission. Please try again.";
			array_push($response, $temp);
			echo json_encode($response);
			mysqli_close($con);
			
	}else{
		
		
		$exit_while = 0;
	
		while($exit_while == 0){
			
			$length = 6;
			$characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$charactersLength = strlen($characters);
			$randomString = '';
			for ($i = 0; $i < $length; $i++) {
				$randomString .= $characters[rand(0, $charactersLength - 1)];
			}

			
			$rand_Stub_Number = $randomString;
			
			
			$result = mysqli_query($con,"SELECT Stub_Number FROM overall_reg WHERE
										Stub_Number='$rand_Stub_Number'");
		   
			$row = mysqli_fetch_array($result);


			if($row){
				$exit_while = 0;
			}else{
				$exit_while = 1;
			}

		
		}
		
		
		
		mysqli_set_charset($con,'utf8');
		$Sql_Query = "INSERT INTO mco_reg (Bil_Account_Number, Bil_Account_Name, Bil_Address, Username_Reg,  
								Bil_Class, Stub_Number, Signature, Photo_ID, Contact_Number, Date_Registered) VALUES ('$in_Account_Number',
								'$in_Account_Name', '$in_Address', '$in_Username', '$in_Class', '$rand_Stub_Number', 
								? , ?, '$in_Contact_Number', '$date')";
		$stmt = mysqli_prepare($con, $Sql_Query);
		mysqli_stmt_bind_param($stmt, "ss", $in_Photo_Signature, $in_Photo_ID);
		
		
		
		mysqli_set_charset($con,'utf8');
		$Sql_Query_Copy = "INSERT INTO overall_reg (Bil_Account_Number, Bil_Account_Name, Bil_Address, Username_Reg,  
						Bil_Class, Stub_Number, Town, Signature, Contact_Number, Date_Registered) VALUES ('$in_Account_Number',
						'$in_Account_Name', '$in_Address', '$in_Username', '$in_Class', '$rand_Stub_Number', 
						'$in_Town', ? , '$in_Contact_Number', '$date')";
		$stmt_Copy = mysqli_prepare($con, $Sql_Query_Copy);
		mysqli_stmt_bind_param($stmt_Copy, "s", $in_Photo_Signature);
		
		
		
		
		
		if($stmt->execute() && $stmt_Copy->execute()){
			
			$temp["message"] = "Data Submit Successfully";
			$temp["result_stub"] = $rand_Stub_Number;
			array_push($response, $temp);
			echo json_encode($response);
			mysqli_close($con);
			
		}else{
			
			$temp["message"] = "Try Again Err: 10". $con->error;
			array_push($response, $temp);
			echo json_encode($response);
			mysqli_close($con);

		}
		
		
	}
	
	
	
	

?>
