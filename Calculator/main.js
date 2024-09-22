function calculate(operator) {
    var num1 = parseFloat(document.getElementById('num1').value);
    var num2 = parseFloat(document.getElementById('num2').value);
    var resultDiv = document.getElementById('result');

    if (!isNaN(num1) && !isNaN(num2)) {
        var result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    resultDiv.innerHTML = 'Error: Division by zero';
                    return;
                }
                break;
            default:
                resultDiv.innerHTML = 'Invalid operation';
                return;
        }
        resultDiv.innerHTML = 'Result: ' + result;
    } else {
        resultDiv.innerHTML = 'Please enter valid numbers.';
    }
}
