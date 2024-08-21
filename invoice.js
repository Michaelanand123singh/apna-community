document.addEventListener('DOMContentLoaded', () => {
    const itemsTable = document.getElementById('items-body');
    const addItemBtn = document.getElementById('add-item-btn');
    const totalAmount = document.getElementById('total-amount');
    
    // Function to calculate total for each item and overall total
    function calculateTotal() {
        let total = 0;

        itemsTable.querySelectorAll('tr').forEach(row => {
            const quantity = row.querySelector('input[name="quantity"]').value;
            const unitPrice = row.querySelector('input[name="unit-price"]').value;
            const itemTotal = parseFloat(quantity) * parseFloat(unitPrice);
            row.querySelector('.item-total').textContent = itemTotal.toFixed(2);
            total += itemTotal;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    // Function to add a new row to the items table
    function addItem() {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="text" name="description" placeholder="Description" required></td>
            <td><input type="number" name="quantity" min="1" value="1" required></td>
            <td><input type="number" name="unit-price" min="0" step="0.01" value="0.00" required></td>
            <td class="item-total">0.00</td>
            <td><button type="button" class="remove-item-btn">&times;</button></td>
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
    }

    // Add initial item row
    calculateTotal();

    // Event listener for adding new items
    addItemBtn.addEventListener('click', addItem);

    // Event listeners for the initial row
    itemsTable.querySelector('input[name="quantity"]').addEventListener('input', calculateTotal);
    itemsTable.querySelector('input[name="unit-price"]').addEventListener('input', calculateTotal);

    // Handle form submission to generate invoice
    document.getElementById('invoice-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Invoice Generated! You can implement the saving or PDF generation functionality here.');
    });
});
