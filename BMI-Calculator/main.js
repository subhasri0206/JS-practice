document.getElementById('bmiForm').onsubmit = function(event) {
    event.preventDefault();

    var weight = parseFloat(document.getElementById('weight').value);
    var heightCm = parseFloat(document.getElementById('height').value);
    var heightM = heightCm / 100; // Convert cm to meters
    var resultDiv = document.getElementById('result');

    if (weight > 0 && heightCm > 0) {
        var bmi = (weight / (heightM * heightM)).toFixed(2);
        var status = '';

        if (bmi < 18.5) {
            status = 'Underweight';
        } else if (bmi < 24.9) {
            status = 'Normal weight';
        } else if (bmi < 29.9) {
            status = 'Overweight';
        } else {
            status = 'Obesity';
        }

        resultDiv.innerHTML = 'Your BMI is: ' + bmi + ' - ' + status;
    } else {
        resultDiv.innerHTML = 'Please enter valid values.';
    }
};
