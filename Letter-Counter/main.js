document.getElementById('space-count-button').addEventListener('click', function() {
    // Get the text from the textarea
    const text = document.getElementById('space-text-input').value;
    
    // Count the total number of characters including spaces
    const totalCharactersWithSpaces = text.length;
    
    // Display the count in the result paragraph
    document.getElementById('space-result').innerText = `Number of letters (including spaces): ${totalCharactersWithSpaces}`;
});

document.getElementById('nospace-count-button').addEventListener('click', function() {
    // Get the text from the textarea
    const text = document.getElementById('nospace-text-input').value;
    
    // Remove all spaces from the text and then count the remaining characters
    const totalCharactersWithoutSpaces = text.replace(/\s+/g, '').length;
    
    // Display the count in the result paragraph
    document.getElementById('nospace-result').innerText = `Number of letters (excluding spaces): ${totalCharactersWithoutSpaces}`;
});
