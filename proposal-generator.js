// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('proposal-form');
    const previewSection = document.getElementById('proposal-preview');
    const proposalContent = document.getElementById('proposal-content');
    const downloadButton = document.getElementById('download-pdf');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateProposal();
    });

    downloadButton.addEventListener('click', downloadPDF);

    function generateProposal() {
        const formData = new FormData(form);
        let proposalHTML = `
            <h1>Project Proposal</h1>
            <h2>Service Provider</h2>
            <p><strong>${formData.get('fullName')}</strong><br>
            ${formData.get('professionalTitle')}<br>
            ${formData.get('businessName') || ''}<br>
            ${formData.get('email')} | ${formData.get('phone')} | ${formData.get('website') || ''}</p>

            <h2>Client</h2>
            <p><strong>${formData.get('clientCompany')}</strong><br>
            ${formData.get('clientContact')}, ${formData.get('clientTitle')}<br>
            ${formData.get('clientEmail')} | ${formData.get('clientPhone')}</p>

            <h2>Project Overview</h2>
            <p><strong>Objective:</strong> ${formData.get('projectObjective')}</p>
            <p><strong>Challenge:</strong> ${formData.get('projectChallenge')}</p>

            <h2>Proposed Solution</h2>
            <p><strong>Services:</strong> ${formData.get('services')}</p>
            <p><strong>Benefits:</strong> ${formData.get('benefits')}</p>

            <h2>Qualifications</h2>
            <p><strong>Experience:</strong> ${formData.get('experience')}</p>
            <p><strong>Case Study:</strong> ${formData.get('casestudy')}</p>

            <h2>Timeline</h2>
            <p><strong>Start Date:</strong> ${formData.get('startDate')}</p>
            <p><strong>End Date:</strong> ${formData.get('endDate')}</p>
            <p><strong>Milestones:</strong> ${formData.get('milestones')}</p>

            <h2>Pricing and Payment</h2>
            <p><strong>Total Cost:</strong> $${formData.get('totalCost')}</p>
            <p><strong>Pricing Structure:</strong> ${formData.get('pricingStructure')}</p>
            <p><strong>Payment Terms:</strong> ${formData.get('paymentTerms')}</p>

            <h2>Process and Communication</h2>
            <p><strong>Update Process:</strong> ${formData.get('updateProcess')}</p>
            <p><strong>Response Time:</strong> ${formData.get('responseTime')}</p>

            <h2>Next Steps</h2>
            <p>${formData.get('nextSteps')}</p>
            <p><strong>Contact:</strong> ${formData.get('contactInfo')}</p>
        `;

        proposalContent.innerHTML = proposalHTML;
        previewSection.style.display = 'block';
        previewSection.scrollIntoView({ behavior: 'smooth' });
    }

    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.html(proposalContent, {
            callback: function(doc) {
                doc.save('project-proposal.pdf');
            },
            x: 15,
            y: 15,
            width: 170,
            windowWidth: 650
        });
    }
});