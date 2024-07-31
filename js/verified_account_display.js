window.onload=function(){

    if(localStorage.getItem("Valid_Account_Number") === null){
        window.location.replace("https://bileco36thagma.ddns.net/2024AGMA/account_search.html","_self");
    }

    if(localStorage.getItem("Account_Sequence") !== '1.'){
        document.getElementById('confirm_account').innerHTML  = 'Back';
        

        document.getElementById('header-1').innerHTML = 'Account is not valid';
        document.getElementById('message-1').innerHTML = 'Account number provided is not a primary account. Please enter a new primary account number.';
        document.getElementById("message-1").style.color = '#CA0002';

    }else{
        document.getElementById('confirm_account').innerHTML  = 'Confirm';
       

        document.getElementById('header-1').innerHTML = 'Account is valid';
        document.getElementById('message-1').innerHTML = 'Is this your BILECO Account? Please check if it is the correct account';
        document.getElementById("message-1").style.color = '#333';
    }

    
        
    document.getElementById("account-number").value = localStorage.getItem("Valid_Account_Number");
    document.getElementById("account-name").value = localStorage.getItem("Valid_Account_Name");
    document.getElementById("account-address").value = localStorage.getItem("Valid_Address");
    document.getElementById("mem-number").value = localStorage.getItem("Valid_Mem_Number");
    
    if(localStorage.getItem("Valid_Class") == "RES"){
        document.getElementById("account-type").value = "Residential";
    }else if(localStorage.getItem("Valid_Class") == "COM"){
        document.getElementById("account-type").value = "Commercial";
    }else if(localStorage.getItem("Valid_Class") == "PUB"){
        document.getElementById("account-type").value = "Public Building";
    }else if(localStorage.getItem("Valid_Class") == "CU"){
        document.getElementById("account-type").value = "Coop Use";
    }else if(localStorage.getItem("Valid_Class") == "HV"){
        document.getElementById("account-type").value = "High Voltage";
    }else if(localStorage.getItem("Valid_Class") == "STR"){
        document.getElementById("account-type").value = "Street Light";
    }else{
        document.getElementById("account-type").value = Found_Class;
    }

  


}


document.getElementById('confirm_account').addEventListener('click', function () {

    if(localStorage.getItem("Account_Sequence") !== '1.'){
        
        localStorage.clear();
        window.location.replace("https://bileco36thagma.ddns.net/2024AGMA/account_search.html","_self");
    

    }else{

        window.open("https://bileco36thagma.ddns.net/2024AGMA/signature_input.html","_self");




    }

   


});


