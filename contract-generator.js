document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contract-form');
    const contractModal = new bootstrap.Modal(document.getElementById('contractModal'));
    const downloadButton = document.getElementById('downloadContract');

    // Add auto-suggestion functionality
    const autocompleteSuggestions = {
        serviceProvider: ['Company A', 'Company B', 'Company C', 'Independent Contractor'],
        clientName: ['Client 1', 'Client 2', 'Client 3', 'ABC Corporation'],
        projectTitle: ['Web Development', 'Mobile App Development', 'Graphic Design', 'Content Writing'],
    };

    const autoCompleteFields = ['serviceProvider', 'clientName', 'projectTitle'];
    autoCompleteFields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', function() {
            showAutocompleteSuggestions(field, this.value);
        });
        input.addEventListener('blur', function() {
            hideAutocompleteSuggestions();
        });
    });

    function showAutocompleteSuggestions(field, value) {
        const suggestions = autocompleteSuggestions[field].filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('autocomplete-suggestions');

        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('autocomplete-suggestion');
            suggestionElement.textContent = suggestion;
            suggestionElement.addEventListener('click', function() {
                const input = document.getElementById(field);
                input.value = suggestion;
                hideAutocompleteSuggestions();
            });
            suggestionsContainer.appendChild(suggestionElement);
        });

        const input = document.getElementById(field);
        input.parentNode.appendChild(suggestionsContainer);
    }

    function hideAutocompleteSuggestions() {
        const suggestions = document.querySelectorAll('.autocomplete-suggestions');
        suggestions.forEach(suggestion => suggestion.remove());
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateContract();
    });

    function generateContract() {
        const serviceProvider = document.getElementById('serviceProvider').value;
        const clientName = document.getElementById('clientName').value;
        const projectTitle = document.getElementById('projectTitle').value;
        const description = document.getElementById('description').value;
        const scopeOfWork = document.getElementById('scopeOfWork').value;
        const paymentTerms = document.getElementById('paymentTerms').value;
        const duration = document.getElementById('duration').value;
        const deliverySchedule = document.getElementById('deliverySchedule').value;
        const termination = document.getElementById('termination').value;
        const clientAddress = document.getElementById('clientAddress').value;

        const contractContent = `
            <h2>Service Provider: ${serviceProvider}</h2>
            <h2>Client: ${clientName}</h2>
            <h3>Project Title: ${projectTitle}</h3>
            <h3>Project Description:</h3>
            <p>${description}</p>
            <h3>Scope of Work:</h3>
            <p>${scopeOfWork}</p>
            <h3>Payment Terms:</h3>
            <p>${paymentTerms}</p>
            <h3>Project Duration:</h3>
            <p>${duration}</p>
            <h3>Delivery Schedule:</h3>
            <p>${deliverySchedule}</p>
            <h3>Termination Clause:</h3>
            <p>${termination}</p>
            <h3>Client Address:</h3>
            <p>${clientAddress}</p>
        `;

        document.getElementById('contractContent').innerHTML = contractContent;
        contractModal.show();
    }

    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        html2canvas(document.getElementById('contractContent'), {
            scale: 2,
            useCORS: true,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            doc.save('contract.pdf');
        });
    });
});