let timerInterval;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
    const startStopBtn = document.getElementById('startStop');
    if (startStopBtn.textContent === 'Start') {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('stopButton');
        document.getElementById('reset').disabled = false;
        document.getElementById('lap').disabled = false;
        // Add event listener to pause the stopwatch with the spacebar
        document.addEventListener('keydown', spaceBarListener);
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stopButton');
        document.getElementById('reset').disabled = false;
        document.getElementById('lap').disabled = true;
        // Remove the spacebar event listener when stopping
        document.removeEventListener('keydown', spaceBarListener);
    }
}

function spaceBarListener(event) {
    if (event.code === 'Space') {
        startStop();
    }
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const milliseconds = String(time % 1000).slice(0, 2).padStart(2, '0');
    time = Math.floor(time / 1000);
    const seconds = String(time % 60).padStart(2, '0');
    time = Math.floor(time / 60);
    const minutes = String(time % 60).padStart(2, '0');
    time = Math.floor(time / 60);
    const hours = String(time).padStart(2, '0');

    const display = document.getElementById('display');
    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function reset() {
    // Ask for confirmation before resetting
    const confirmation = confirm("Are you sure you want to reset the stopwatch?");
    if (confirmation) {
        elapsedTime = 0;
        laps = [];
        displayTime(elapsedTime);
        document.getElementById('lapTimes').innerHTML = '';
        document.getElementById('startStop').textContent = 'Start';
        document.getElementById('reset').disabled = true;
        document.getElementById('lap').disabled = true;
        clearInterval(timerInterval); // Added to stop the timer if it's running
    }
}

function lap() {
    const lapTime = elapsedTime;
    laps.push(lapTime);

    const lapTimesList = document.getElementById('lapTimes');
    const lapNumber = laps.length;

    const li = document.createElement('li');
    li.textContent = `Lap ${lapNumber}: ${formatLapTime(lapTime)}`;
    // Add a class to the first lap's <li> element
    if (lapNumber === 1) {
        li.classList.add('firstLap');
    }

    lapTimesList.appendChild(li);
}

function formatLapTime(time) {
    const milliseconds = String(time % 1000).slice(0, 2).padStart(2, '0');
    time = Math.floor(time / 1000);
    const seconds = String(time % 60).padStart(2, '0');
    time = Math.floor(time / 60);
    const minutes = String(time % 60).padStart(2, '0');
    time = Math.floor(time / 60);
    const hours = String(time).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Additional functionality: Pause the stopwatch by pressing the spacebar
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        startStop();
    }
});
