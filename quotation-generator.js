document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quotation-form');
    const addItemButton = document.getElementById('add-item');
    const itemsContainer = document.getElementById('items-container');
    const quotationModal = new bootstrap.Modal(document.getElementById('quotationModal'));
    const downloadButton = document.getElementById('downloadQuotation');

    addItemButton.addEventListener('click', function() {
        const newItem = document.createElement('div');
        newItem.className = 'item-row mb-3';
        newItem.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <input type="text" class="form-control item-name" placeholder="Item Name" required>
                </div>
                <div class="col-md-2">
                    <input type="number" class="form-control item-quantity" placeholder="Quantity" min="1" required>
                </div>
                <div class="col-md-2">
                    <input type="number" class="form-control item-price" placeholder="Price (₹)" min="0" step="0.01" required>
                </div>
                <div class="col-md-2">
                    <input type="number" class="form-control item-discount" placeholder="Discount (%)" min="0" max="100" step="0.1" value="0">
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-danger remove-item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(newItem);

        const removeItemButtons = document.querySelectorAll('.remove-item');
        removeItemButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.item-row').remove();
            });
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateQuotation();
    });

    function generateQuotation() {
        const serviceProvider = document.getElementById('serviceProvider').value;
        const clientName = document.getElementById('clientName').value;
        const projectTitle = document.getElementById('projectTitle').value;
        const description = document.getElementById('description').value;
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
        const clientAddress = document.getElementById('clientAddress').value;

        const items = [];
        const itemRows = document.querySelectorAll('.item-row');
        itemRows.forEach(row => {
            const name = row.querySelector('.item-name').value;
            const quantity = parseInt(row.querySelector('.item-quantity').value);
            const price = parseFloat(row.querySelector('.item-price').value);
            const discount = parseFloat(row.querySelector('.item-discount').value);
            items.push({ name, quantity, price, discount });
        });

        const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price * (1 - item.discount / 100), 0);
        const taxAmount = subtotal * (taxRate / 100);
        const total = subtotal + taxAmount;

        const quotationContent = `
            <h2>Quotation from ${serviceProvider}</h2>
            <p><strong>Client:</strong> ${clientName}</p>
            <p><strong>Project:</strong> ${projectTitle}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Client Address:</strong></p>
            <p>${clientAddress}</p>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price (₹)</th>
                        <th>Discount (%)</th>
                        <th>Total (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>₹${item.price.toFixed(2)}</td>
                            <td>${item.discount}%</td>
                            <td>₹${(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">Subtotal</td>
                        <td>₹${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="4">Tax (${taxRate}%)</td>
                        <td>₹${taxAmount.toFixed(2)}</td>
                    </tr>
                    <tr class="total">
                        <td colspan="4">Total</td>
                        <td>₹${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        `;

        document.getElementById('quotationContent').innerHTML = quotationContent;
        quotationModal.show();
    }

    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        html2canvas(document.getElementById('quotationContent'),{
            scale: 4, //Increase the scale for higher Quality
            useCORS: true, //Enable CORS to handle external Images
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('quotation.pdf');
        });
    });
});