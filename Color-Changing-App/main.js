let colorInterval;
let startTime;
let elapsedTime = 0;
let timerInterval;

// Select elements
const colorBox = document.getElementById('colorBox');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');

// Start button
startBtn.addEventListener('click', () => {
    if (!colorInterval && !timerInterval) {
        startTimer();
        startColorChange();
    }
});

// Stop button
stopBtn.addEventListener('click', () => {
    clearInterval(colorInterval);
    clearInterval(timerInterval);
    colorInterval = null;
    timerInterval = null;
});

// Resume button
resumeBtn.addEventListener('click', () => {
    if (!colorInterval && !timerInterval) {
        startTimer();
        startColorChange();
    }
});

// Reset button
resetBtn.addEventListener('click', () => {
    clearInterval(colorInterval);
    clearInterval(timerInterval);
    colorInterval = null;
    timerInterval = null;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    colorBox.style.backgroundColor = 'lightgray';
});

// Start the color change
function startColorChange() {
    colorInterval = setInterval(() => {
        const randomColor = getRandomColor();
        colorBox.style.backgroundColor = randomColor;
    }, 1000); // Change every 1 second
}

// Random color generator
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = timeToString(elapsedTime);
    }, 1000);
}

// Convert time to HH:MM:SS format
function timeToString(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
