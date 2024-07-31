window.onload=function(){

    if(localStorage.getItem("Valid_Account_Number") === null){
        window.location.replace("https://bileco36thagma.ddns.net/2024AGMA/account_search.html","_self");
    }

    document.getElementById('overlay').style.visibility = "hidden";
    document.getElementById('ring-loading').style.visibility = "hidden";

}



document.getElementById('check_id').addEventListener('click', function () {

    if( document.getElementById("btn_browse").files.length == 0 ){
        alert("Please select an image first.");
    }else{

        document.getElementById('overlay').style.visibility = "visible";
        document.getElementById('ring-loading').style.visibility = "visible";

      


        usrmmm = 'Guest';
        urrrl = 'https://bileco36thagma.ddns.net/2024AGMA/php_scripts/InsertNewPreReg.php';
        

        var Ps_Account_Number = localStorage.getItem("Valid_Account_Number");
        var Ps_Account_Name = localStorage.getItem("Valid_Account_Name");
        var Ps_Billing_Address = localStorage.getItem("Valid_Address");
        var Ps_Class = localStorage.getItem("Valid_Class");
        var Ps_Town = localStorage.getItem("Valid_Town");
        var Ps_Photo_ID = localStorage.getItem("Provided_ID");
        var Ps_Photo_Signature = localStorage.getItem("Provided_Signature");
        var Ps_Username = usrmmm;
        var Ps_Contact_Number = localStorage.getItem("Provided_Contact_Number");
        
        jQuery.ajax({
            type: "POST",
            url: urrrl,
            data:{P_Account_Number: Ps_Account_Number,
                P_Account_Name: Ps_Account_Name,
                P_Billing_Address: Ps_Billing_Address, 
                P_Class: Ps_Class, 
                P_Contact_Number: Ps_Contact_Number, 
                P_Town: Ps_Town, 
                P_Photo_ID: Ps_Photo_ID, 
                P_Photo_Signature: Ps_Photo_Signature, 
                P_Username: Ps_Username},  
            dataType:"html",  
            success: function (response) {
                var jsonData = JSON.parse(response);
                var msg = jsonData[0].message;
                var stub = jsonData[0].result_stub;
                if(msg == "Data Submit Successfully"){
                    
                    localStorage.setItem("Generated_Stub", stub);

                    window.open("https://bileco36thagma.ddns.net/2024AGMA/qr_display_stub.html","_self");

        
                }else if(msg == "Try Again Err: 10"){

                    alert("Internal Server error has occured. Please try again.");

                }
            
            },
             error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
             }
        });
        






    }

});


document.getElementById('btn_browse').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // convert file to base64 String
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      // store file
      localStorage.setItem('Provided_ID', base64String);
      // display image
      //document.body.style.background = `url(data:image/png;base64,${base64String})`;
    };
    reader.readAsDataURL(file);
  });



function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = $("#file-w").val();
    canvas.height = $("#file-h").val();

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/jpeg").split(';base64,')[1];;

    return dataURL;
}


function makeid(length) {
    var result           = '';
    var characters       = '01';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}