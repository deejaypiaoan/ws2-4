function pizzaboy() {
    let pizzaflavor = document.getElementsByName("pizzaflavor");
    let pizzasize = document.getElementsByName("pizzasize");
    let selectedflavor = 0;
    let selectedsize = 0;
    let grandtotal = 0;

    // Get selected pizza flavor
    for (var i = 0; i < pizzaflavor.length; i++) {
        if (pizzaflavor[i].checked) {
            selectedflavor = pizzaflavor[i].value;
            break;
        }
    }
    // Get selected pizza size
    for (var i = 0; i < pizzasize.length; i++) {
        if (pizzasize[i].checked) {
            selectedsize = pizzasize[i].value;
            break;
        }
    }

    // Calculate grand total
    grandtotal = Number(selectedflavor) + Number(selectedsize);
    document.getElementById("grandtotal").innerHTML = "Php " + grandtotal;

    updateGrandTotal();
}


function updateQuantity(toppingId, increase) {
    let toppingInput = document.getElementById(toppingId);
    let value = parseInt(toppingInput.value);

    if (increase) {
        value += 1;
    } else {
        if (value > 0) {
            value -= 1;
        }
    }

    toppingInput.value = value;
    updateGrandTotal();
}
function updateGrandTotal() {
    let pizzaflavor = document.getElementsByName("pizzaflavor");
    let pizzasize = document.getElementsByName("pizzasize");

    let toppingQuantities = [
        { id: 'topping1', name: 'Egg', price: 10 },
        { id: 'topping2', name: 'Longganisa', price: 15 },
        { id: 'topping3', name: 'Beef Meat', price: 30 },
        { id: 'topping4', name: 'Vegetables', price: 10 },
        { id: 'topping5', name: 'Crunchy Bagnet Bits', price: 20 },
        { id: 'topping6', name: 'Sisig Meat', price: 35 }
    ];

    let pizzaTotal = 0;
    let sizeTotal = 0;
    let toppingsTotal = 0;
    let selectedFlavorName = "";
    let selectedSizeName = "";
    let toppingsDetails = "";

    // Get selected pizza flavor
    for (let flavor of pizzaflavor) {
        if (flavor.checked) {
            pizzaTotal = parseFloat(flavor.value);
            selectedFlavorName = flavor.getAttribute('data-name');
            break;
        }
    }

    // Get selected pizza size
    for (let size of pizzasize) {
        if (size.checked) {
            sizeTotal = parseFloat(size.value);
            selectedSizeName = size.nextElementSibling.querySelector('.desc b').textContent;
            break;
        }
    }

    // Calculate toppings total and details
    toppingQuantities.forEach(topping => {
        let quantity = parseInt(document.getElementById(topping.id).value);
        if (quantity > 0) {
            toppingsTotal += quantity * topping.price;
            toppingsDetails += `(${quantity} pc/s) ${topping.name} : ₱${(quantity * topping.price).toFixed(2)}<br>`;
        }
    });

    // Update the grand total
    let grandTotal = pizzaTotal + sizeTotal + toppingsTotal;

    // Update display with pizza details and grand total
    document.getElementById("pizza-details").innerHTML = `
        <strong>Flavor:</strong> ${selectedFlavorName.charAt(0).toUpperCase() + selectedFlavorName.slice(1)} Empanada <br>
        <strong>Size:</strong> ${selectedSizeName}<br>
        <strong>Toppings:</strong><br>${toppingsDetails || "None"} `;

    // Update the grand total display at the bottom
    document.getElementById("grandtotal").textContent = `₱ ${grandTotal.toFixed(2)}`;
}

function updatePizzaDetails() {
    let pizzaflavor = document.querySelector('input[name="pizzaflavor"]:checked');
    let pizzasize = document.querySelector('input[name="pizzasize"]:checked');

    let toppingQuantities = [
        { id: 'topping1', name: 'Egg', price: 10 },
        { id: 'topping2', name: 'Longganisa', price: 15 },
        { id: 'topping3', name: 'Beef Meat', price: 30 },
        { id: 'topping4', name: 'Vegetables', price: 10 },
        { id: 'topping5', name: 'Crunchy Bagnet Bits', price: 20 },
        { id: 'topping6', name: 'Sisig Meat', price: 35 }
    ];

    let toppingsDisplay = "";
    toppingQuantities.forEach(topping => {
        let quantity = document.getElementById(topping.id).value;
        if (quantity > 0) {
            toppingsDisplay += `${topping.name}: ${quantity}pc/s = ₱ ${(quantity * topping.price).toFixed(2)}<br>`;
        }
    });

    let details = `
        Pizza Flavor: ${pizzaflavor ? pizzaflavor.getAttribute('data-name') : 'N/A'}<br>
        Size: ${pizzasize ? pizzasize.getAttribute('data-name') : 'N/A'}<br>
        Toppings:<br>${toppingsDisplay}
    `;

    document.getElementById("pizza-details").innerHTML = details;
}


function submitorder() {

    // Show the form after submitting the pizza order
    document.getElementById("popupForm").style.display = "block";
}

// Close the form when the "x" is clicked
document.querySelector('.close').onclick = function () {
    document.getElementById("popupForm").style.display = "none";
}

// Close the form if user clicks outside the modal
window.onclick = function (event) {
    let modal = document.getElementById("popupForm");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById('deliveryForm').onsubmit = function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get name and address from the form
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;

    if (name && address) {
        alert(`Order Submitted!\nName: ${name}\nAddress: ${address}`);
        // Close the modal after submission
        document.getElementById("popupForm").style.display = "none";
    } else {
        alert('Please fill in all details!');
    }
}









