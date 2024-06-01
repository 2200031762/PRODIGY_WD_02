let timer; // Variable to hold the interval timer
let isRunning = false; // Flag to track if the stopwatch is running
let startTime; // Variable to hold the start time
let elapsedTime = 0; // Variable to hold the elapsed time
let lapTimes = []; // Array to store lap times
let lastLapTime = 0; // Variable to store the last lap time

function startStopwatch() {
    if (!isRunning) {
        if (lapTimes.length === 0) {
            startTime = Date.now() - elapsedTime;
        } else {
            startTime = Date.now() - lastLapTime;
        }
        timer = setInterval(updateTime, 10); // Update time every 10 milliseconds
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        lastLapTime = Date.now() - startTime;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lapTimes = [];
    lastLapTime = 0;
    updateDisplay();
    updateLapTimes(); // Clear lap times on reset
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(formatTime(lapTime));
        updateLapTimes();
        lastLapTime = Date.now() - startTime; // Update last lap time
    } else if (!isRunning && elapsedTime > 0) {
        const lapTime = lastLapTime;
        lapTimes.push(formatTime(lapTime)); // Record lap if stopwatch is stopped and a lap hasn't been recorded yet
        updateLapTimes();
    }
}

function resumeStopwatch() {
    if (!isRunning) {
        startStopwatch();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('digital-clock').textContent = formattedTime;
}

function updateLapTimes() {
    const lapList = document.getElementById('lap-times');
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000 / 10);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}


