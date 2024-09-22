function checkOddOrEven() {
    var number = parseInt(document.getElementById('numberInput').value);
    var resultDiv = document.getElementById('result');

    if (!isNaN(number)) {
        if (number % 2 === 0) {
            resultDiv.innerHTML = number + " is Even";
        } else {
            resultDiv.innerHTML = number + " is Odd";
        }
    } else {
        resultDiv.innerHTML = "Please enter a valid number.";
    }
}
