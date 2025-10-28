let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let errorMessage = document.getElementById("errorMessage");

function generateQR() {
    if (qrText.value.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
        imgBox.classList.add("show-img");
        errorMessage.style.display = "none";
    }
    else {
        qrText.classList.add("error");
        errorMessage.style.display = "block";
        setTimeout(()=>{
            qrText.classList.remove("error");
        },1000);
    }
};