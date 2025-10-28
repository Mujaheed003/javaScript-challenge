var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");

function validateName() {
    var name = document.getElementById("contact-name").value;

    if (name.length == 0) {
        nameError.innerHTML = "name is required";
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "write full name";
        return false;
    }
    nameError.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
    return true;
    
};

function validatePhone() {
    var phone = document.getElementById("contact-phone").value;

    if (phone.length == 0) {
        phoneError.innerHTML = "phone number is required";
        return false;
    }
    if (phone.length !== 10) {
        phoneError.innerHTML = "Phone Number should be 10 degits";
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = "only digits please.";
        return false;
    }
    phoneError.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
    return true;
};

function validateEmail() {
    var email = document.getElementById("contact-email").value;

    if (email.length == 0) {
        emailError.innerHTML = "email is required";
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = "Invalid Email";
        return false;
    }
    emailError.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
    return true;
};

function validateMessage() {
    var message = document.getElementById("contact-message").value;
    var required = 30;
    var left = required - message.length;

    if (left > 0) {
        messageError.innerHTML = left + " more characters required";
        return false;
    }
    messageError.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
    return true;
};

function validateForm() {
    if (!validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
        submitError.style.display = "block";
        submitError.innerHTML = "please fix error to submit";
        setTimeout(function() {
            submitError.style.display = "none";
        }, 3000);
        return false;
    }
    submitError.innerHTML = alert("Login Successful!");
    return true;
};