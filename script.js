let startTime = 0;
let updatedTime = 0;
let isRunning = false;
let interval;
let laps = [];
let lapCounter = 1;

const timeDisplay = document.getElementById("time-display");
const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps-list");

startStopButton.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - updatedTime;
        interval = setInterval(updateDisplay, 10);
        startStopButton.textContent = "Pause";
    }
    isRunning = !isRunning;
});

resetButton.addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
    updatedTime = 0;
    lapCounter = 1;
    laps = [];
    startStopButton.textContent = "Start";
    timeDisplay.textContent = "00:00:00.000";
    lapsList.innerHTML = "";
});

lapButton.addEventListener("click", () => {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapItem.classList.add("lap-item");
        lapsList.appendChild(lapItem);
    }
});

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor((time / 3600000));

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}
