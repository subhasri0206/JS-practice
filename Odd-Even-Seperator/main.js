function separateOddEven() {
    var input = document.getElementById('numberInput').value;
    var numbers = input.split(',').map(Number); // Split the input by commas and convert each to a number
    var evenNumbers = [];
    var oddNumbers = [];

    // Iterate through numbers and categorize them as odd or even
    numbers.forEach(function(num) {
        if (!isNaN(num)) {
            if (num % 2 === 0) {
                evenNumbers.push(num);
            } else {
                oddNumbers.push(num);
            }
        }
    });

    // Display the results
    document.getElementById('evenNumbers').innerHTML = '<strong>Even Numbers:</strong> ' + (evenNumbers.length > 0 ? evenNumbers.join(', ') : 'None');
    document.getElementById('oddNumbers').innerHTML = '<strong>Odd Numbers:</strong> ' + (oddNumbers.length > 0 ? oddNumbers.join(', ') : 'None');
}
