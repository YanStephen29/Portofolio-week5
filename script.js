document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("nameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("phoneError").textContent = "";
        document.getElementById("messageError").textContent = "";
        document.getElementById("genderError").textContent = "";
        document.getElementById("interestError").textContent = "";
        document.getElementById("educationLevelError").textContent = "";

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const message = document.getElementById("message").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const interests = document.querySelectorAll('input[name="interest"]:checked');
        const educationLevel = document.querySelector('input[name="educationLevel"]:checked');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10,15}$/;

        let valid = true;

        if (fullname === "") {
            document.getElementById("nameError").textContent = "Name is required.";
            valid = false;
        }

        if (!emailPattern.test(email)) {
            document.getElementById("emailError").textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (!phonePattern.test(phoneNumber)) {
            document.getElementById("phoneError").textContent = "Please enter a valid phone number (10-15 digits).";
            valid = false;
        }

        if (message === "") {
            document.getElementById("messageError").textContent = "Message is required.";
            valid = false;
        }

        if (!gender) {
            document.getElementById("genderError").textContent = "Please select a gender.";
            valid = false;
        }

        if (interests.length === 0) {
            document.getElementById("interestError").textContent = "Please select at least one interest (Programming or Design).";
            valid = false;
        }

        if (!educationLevel) {
            document.getElementById("educationLevelError").textContent = "Please select an education level.";
            valid = false;
        }

        if (valid) {
            const interestText = Array.from(interests).map(i => i.value).join(", ");
            const educationValue = educationLevel ? educationLevel.value : "";
            const whatsappMessage = `
Name: ${fullname}
Email: ${email}
Phone: ${phoneNumber}
Gender: ${gender.value}
Interest: ${interestText}
Education Level: ${educationValue}
Message: ${message}
`;
            const whatsappUrl = `https://wa.me/6281291468340?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappUrl, '_blank');
        }
    });
});