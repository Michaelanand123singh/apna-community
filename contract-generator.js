document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });

    const form = document.getElementById('contract-form');
    const preview = document.getElementById('contract-preview');
    const content = document.getElementById('contract-content');
    const downloadBtn = document.getElementById('download-pdf');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const clientName = document.getElementById('client-name').value;
        const projectDescription = document.getElementById('project-description').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const paymentAmount = document.getElementById('payment-amount').value;
        const paymentTerms = document.getElementById('payment-terms').value;

        const contractHTML = `
            <h2>Freelance Contract</h2>
            <p><strong>Client:</strong> ${clientName}</p>
            <p><strong>Project Description:</strong> ${projectDescription}</p>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>End Date:</strong> ${endDate}</p>
            <p><strong>Payment Amount:</strong> $${paymentAmount}</p>
            <p><strong>Payment Terms:</strong> ${paymentTerms}</p>
        `;

        content.innerHTML = contractHTML;
        preview.style.display = 'block';
    });

    downloadBtn.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.html(content, {
            callback: function(doc) {
                doc.save('freelance_contract.pdf');
            },
            x: 15,
            y: 15,
            width: 170,
            windowWidth: 650
        });
    });
});