document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzFpqnK4PjPiaHKWn0iRZ0BJ7k8Io8G9a2EM9C5ikQYHpsG54x_7Z0Hnbg8NyNZIPgrlw/exec', {
                method: 'POST',
                body: new URLSearchParams(formObject)
            });

            if (response.ok) {
                form.reset(); // Reset the form fields
                confirmationMessage.style.display = 'block'; // Show confirmation message
                errorMessage.style.display = 'none'; // Hide error message
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            confirmationMessage.style.display = 'none'; // Hide confirmation message
            errorMessage.style.display = 'block'; // Show error message
        }
    });
});
