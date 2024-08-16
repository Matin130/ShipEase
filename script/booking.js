function calculateCharge() {
    const weight = parseFloat(document.getElementById('wht').value);
    const standardPrice = 50;
    const weightLimit = 10;
    const excessPrice = 75;

    let totalCharge;

    if (weight <= weightLimit) {
        totalCharge = weight * standardPrice;
    } else {
        const excessWeight = weight - weightLimit;
        totalCharge = (weightLimit * standardPrice) + (excessWeight * excessPrice);
    }

    document.getElementById('charge-result').innerText = `Your Cargo Charge: $${totalCharge}`;
}

const pymt = document.getElementsByClassName('payment-section')[0];
const book = document.getElementsByClassName('booking-cont')[0];
const notif = document.getElementById('notif-section');

const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

document.getElementById('booking-form').addEventListener('submit', function (e) {debugger
    e.preventDefault();

    book.style.display = 'none';
    pymt.style.display = 'block';
    calculateCharge();
    
});

document.getElementById('pay-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    document.body.innerHTML = '';
    document.body.appendChild(book);
    document.body.appendChild(notif);

    document.getElementById('booking-form').reset();
    book.style.display = 'block';
    document.body.appendChild(pymt)
    document.getElementById('pay-form').reset()
    pymt.style.display = 'none';

    notif.style.display = 'block';
});

document.getElementById('cancel').addEventListener('click', function () {
    notif.style.display = 'none';
});


// Function to disable the next 12 days
function disableNext12Days(selectedDate) {
    const dateInput = document.getElementById('date');
    const selected = new Date(selectedDate);

    // Disable the next 12 days
    const disabledDays = [];
    for (let i = 1; i <= 12; i++) {
        const nextDay = new Date(selected);
        nextDay.setDate(selected.getDate() + i);
        disabledDays.push(nextDay.toISOString().split('T')[0]);
    }

    // Handle user trying to select one of these dates
    dateInput.addEventListener('input', function () {
        if (disabledDays.includes(this.value)) {
            alert("This date is unavailable. Please select another date.");
            this.value = ''; // Clear the input
        }
    });
}

// Event listener for when a date is selected
document.getElementById('date').addEventListener('change', function () {
    const selectedDate = this.value;
    disableNext12Days(selectedDate);
});

