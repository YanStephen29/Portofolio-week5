document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;

        const nameInput = document.getElementById('name');
        console.log("Nama Input:", nameInput.value.trim());
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Nama harus diisi');
            isValid = false;
        }

        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log("Email Input:", emailInput.value.trim());
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, 'Email tidak valid');
            isValid = false;
        }

        const phoneInput = document.getElementById('phone');
        const phonePattern = /^\d{10,}$/; 
        if (!phoneInput.value.trim() || !phonePattern.test(phoneInput.value.trim())) {
            showError(phoneInput, 'Nomor HP tidak valid (minimal 10 digit)');
            isValid = false;
        }

        const ageInput = document.getElementById('age');
        if (!ageInput.value.trim() || ageInput.value < 17) {
            showError(ageInput, 'Umur harus minimal 17');
            isValid = false;
        }

        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const genderChecked = Array.from(genderInputs).some(input => input.checked);
        if (!genderChecked) {
            showError(genderInputs[0], 'Jenis kelamin harus dipilih');
            isValid = false;
        }

        const interestInputs = document.querySelectorAll('input[name="interest"]');
        const interestChecked = Array.from(interestInputs).some(input => input.checked);
        if (!interestChecked) {
            showError(interestInputs[0], 'Minimal satu minat harus dipilih');
            isValid = false;
        }

        const educationInput = document.getElementById('education');
        if (!educationInput.value) {
            showError(educationInput, 'Tingkat pendidikan harus dipilih');
            isValid = false;
        }

        const feedbackInput = document.getElementById('feedback');
        if (!feedbackInput.value.trim()) {
            showError(feedbackInput, 'Saran dan masukkan harus diisi');
            isValid = false;
        }

        if (isValid) {
            sendToWhatsApp({
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                age: ageInput.value,
                gender: Array.from(genderInputs).find(input => input.checked).value,
                interests: Array.from(interestInputs).filter(input => input.checked).map(input => input.value).join(', '),
                education: educationInput.value,
                feedback: feedbackInput.value
            });
        }
    });

    function sendToWhatsApp(document) {
        const phoneNumber = '6281291468340';
        const message = `Nama: ${data.name}%0A` +
                        `Email: ${data.email}%0A` +
                        `Nomor HP: ${data.phone}%0A` +
                        `Umur: ${data.age}%0A` +
                        `Jenis Kelamin: ${data.gender}%0A` +
                        `Minat: ${data.interests}%0A` +
                        `Tingkat Pendidikan: ${data.education}%0A` +
                        `Saran: ${data.feedback}`;
        
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    function showError(input, message) {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'MessageError';
        errorMessage.innerText = message;
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.MessageError');
        errorMessages.forEach(error => error.remove());
    }
});
