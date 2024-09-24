let shoppingList = [];

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    // Input validation
    if (!itemName || itemPrice <= 0 || isNaN(itemPrice)) {
        alert("Please enter a valid item name and price.");
        return;
    }

    // Add item to the shopping list
    shoppingList.push({ name: itemName, price: itemPrice });

    // Clear input fields
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';

    displayList();
}

function removeItem(index) {
    shoppingList.splice(index, 1);
    displayList();
}

function displayList() {
    const listElement = document.getElementById('shoppingList');
    const emptyMessage = document.getElementById('emptyMessage');
    const totalPriceElement = document.getElementById('totalPrice');

    // Clear current list
    listElement.innerHTML = '';

    if (shoppingList.length === 0) {
        emptyMessage.style.display = 'block';
        totalPriceElement.textContent = '0.00';
        return;
    } else {
        emptyMessage.style.display = 'none';
    }

    let totalPrice = 0;

    // Loop through the shopping list array and display each item
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price.toFixed(2)} <button onclick="removeItem(${index})">Remove</button>`;
        listElement.appendChild(li);

        totalPrice += item.price;
    });

    // Update total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}


function sortByNameAsc() {
    shoppingList.sort((a, b) => a.name.localeCompare(b.name));
    displayList();
}

function sortByNameDesc() {
    shoppingList.sort((a, b) => b.name.localeCompare(a.name));
    displayList();
}

function sortByPriceAsc() {
    shoppingList.sort((a, b) => a.price - b.price);
    displayList();
}

function sortByPriceDesc() {
    shoppingList.sort((a, b) => b.price - a.price);
    displayList();
}
