window.onload=function(){
  signaturePad.clear();
  if(localStorage.getItem("Valid_Account_Number") === null){
      window.location.replace("https://bileco36thagma.ddns.net/2024AGMA/account_search.html","_self");
  }

}


var canvas = document.getElementById('signature-pad');

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

// document.getElementById('save-png').addEventListener('click', function () {
//   if (signaturePad.isEmpty()) {
//     return alert("Please provide a signature first.");
//   }
  
//   var data = signaturePad.toDataURL('image/png');
//   console.log(data);
//   window.open(data);
// });

// document.getElementById('save-jpeg').addEventListener('click', function () {
//   if (signaturePad.isEmpty()) {
//     return alert("Please provide a signature first.");
//   }

//   var data = signaturePad.toDataURL('image/jpeg');
//   console.log(data);
//   window.open(data);
// });

// document.getElementById('save-svg').addEventListener('click', function () {
//   if (signaturePad.isEmpty()) {
//     return alert("Please provide a signature first.");
//   }

//   var data = signaturePad.toDataURL('image/svg+xml');
//   console.log(data);
//   console.log(atob(data.split(',')[1]));
//   window.open(data);
// });

document.getElementById('clr_sign').addEventListener('click', function () {
  signaturePad.clear();
});

// document.getElementById('draw').addEventListener('click', function () {
//   var ctx = canvas.getContext('2d');
//   console.log(ctx.globalCompositeOperation);
//   ctx.globalCompositeOperation = 'source-over'; // default value
// });

// document.getElementById('erase').addEventListener('click', function () {
//   var ctx = canvas.getContext('2d');
//   ctx.globalCompositeOperation = 'destination-out';
// });


document.getElementById('next_process').addEventListener('click', function () {
  if (signaturePad.isEmpty()) {
    return alert("Please provide a signature first.");
  }else{
    const base64Canvas = signaturePad.toDataURL('image/jpeg').split(';base64,')[1];
    
    localStorage.setItem("Provided_Signature", base64Canvas);

    window.open("https://bileco36thagma.ddns.net/2024AGMA/browse_valid_id.html","_self");



  }



});


