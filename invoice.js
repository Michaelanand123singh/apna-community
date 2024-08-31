document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('invoice-form');
    const itemsTable = document.getElementById('items-body');
    const addItemBtn = document.getElementById('add-item-btn');
    const totalAmount = document.getElementById('total-amount');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    
    // Function to calculate total for each item and overall total
    function calculateTotal() {
        let total = 0;

        itemsTable.querySelectorAll('tr').forEach(row => {
            const quantity = parseFloat(row.querySelector('input[name="quantity"]').value);
            const unitPrice = parseFloat(row.querySelector('input[name="unit-price"]').value);
            const itemTotal = quantity * unitPrice;
            row.querySelector('.item-total').textContent = itemTotal.toFixed(2);
            total += itemTotal;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    // Function to add a new row to the items table
    function addItem() {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="px-6 py-4"><input type="text" name="description" class="w-full border-gray-300 rounded-md" required></td>
            <td class="px-6 py-4"><input type="number" name="quantity" min="1" value="1" class="w-full border-gray-300 rounded-md" required></td>
            <td class="px-6 py-4"><input type="number" name="unit-price" min="0" step="0.01" value="0.00" class="w-full border-gray-300 rounded-md" required></td>
            <td class="px-6 py-4 item-total">0.00</td>
            <td class="px-6 py-4"><button type="button" class="remove-item-btn text-red-600">&times;</button></td>
        `;

        itemsTable.appendChild(row);

        // Add event listener to the remove button
        row.querySelector('.remove-item-btn').addEventListener('click', () => {
            row.remove();
            calculateTotal();
        });

        // Add event listeners to calculate total when quantity or price is changed
        row.querySelector('input[name="quantity"]').addEventListener('input', calculateTotal);
        row.querySelector('input[name="unit-price"]').addEventListener('input', calculateTotal);

        calculateTotal();
    }

    // Add initial item row
    addItem();

    // Event listener for adding new items
    addItemBtn.addEventListener('click', addItem);

    // Handle form submission to generate invoice
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Invoice Generated! You can implement additional saving functionality here.');
    });

    // Function to generate PDF
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text('Invoice', 105, 15, null, null, 'center');
        
        doc.setFontSize(12);
        doc.text(`Invoice Number: ${document.getElementById('invoice-number').value}`, 20, 30);
        doc.text(`Date: ${document.getElementById('invoice-date').value}`, 20, 40);
        doc.text(`Due Date: ${document.getElementById('due-date').value}`, 20, 50);
        
        doc.text('Bill To:', 20, 65);
        doc.text(`${document.getElementById('client-name').value}`, 20, 75);
        doc.text(`${document.getElementById('client-email').value}`, 20, 85);
        doc.text(`${document.getElementById('client-address').value}`, 20, 95);

        // Table header
        let yPos = 115;
        doc.setFillColor(220, 220, 220);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.text('Description', 25, yPos + 7);
        doc.text('Quantity', 85, yPos + 7);
        doc.text('Unit Price', 115, yPos + 7);
        doc.text('Total', 160, yPos + 7);

        // Table content
        yPos += 15;
        itemsTable.querySelectorAll('tr').forEach(row => {
            doc.text(row.querySelector('input[name="description"]').value, 25, yPos);
            doc.text(row.querySelector('input[name="quantity"]').value, 90, yPos);
            doc.text(row.querySelector('input[name="unit-price"]').value, 120, yPos);
            doc.text(row.querySelector('.item-total').textContent, 160, yPos);
            yPos += 10;
        });

        // Total
        yPos += 10;
        doc.setFontStyle('bold');
        doc.text(`Total Amount: ₹${totalAmount.textContent}`, 130, yPos);

        doc.save('invoice.pdf');
    }

    // Event listener for downloading PDF
    downloadPdfBtn.addEventListener('click', generatePDF);
});