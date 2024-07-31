window.onload=function(){


    document.getElementById("stub-number").value = localStorage.getItem("Generated_Stub");

    document.getElementById("account-number").value = localStorage.getItem("Valid_Account_Number");
    document.getElementById("account-name").value = localStorage.getItem("Valid_Account_Name");
    document.getElementById("account-address").value = localStorage.getItem("Valid_Address");
    document.getElementById("contact-number").value = localStorage.getItem("Provided_Contact_Number");

    var for_qr_gen = "Online||" + localStorage.getItem("Generated_Stub") + 
                    "||" + localStorage.getItem("Valid_Account_Name") + 
                    "||" + localStorage.getItem("Valid_Account_Number") + 
                    "||" + localStorage.getItem("Valid_Address") + 
                    "||" + localStorage.getItem("Valid_Class");
    
    
    updateQRCode(for_qr_gen);

    

}

function updateQRCode(text) {

    var element = document.getElementById("generated_qr");
    
    var bodyElement = document.body;
    if(element.lastChild){
      element.replaceChild(showQRCode(text), element.lastChild);
    }else{
      element.appendChild(showQRCode(text));
    }

    element.setAttribute("align", "center");
    element.firstElementChild.setAttribute("width", "100%");
  }

  document.getElementById('save_stub').addEventListener('click', function () {

    html2canvas(document.getElementById('scr_here'), {
        onrendered: function (canvas) {
            var url = canvas.toDataURL("image/jpeg");
            downloadURI(url, "stub_" + localStorage.getItem("Generated_Stub") + ".jpg");
            
        }
    });

  });


  document.getElementById('done-reg').addEventListener('click', function () {

    localStorage.clear();
    
    window.location.replace("https://bileco36thagma.ddns.net/2024AGMA/account_search.html","_self");

  


  });

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }