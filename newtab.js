let timer;
let isRunning = false;
let isPaused = false;
let timeLeft = 10; // 60 seconds countdown

function updateTimerDisplay() {
  document.getElementById('timer').textContent = timeLeft + 's';
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      document.getElementById('startButton').style.display = 'inline-block';
      document.getElementById('pauseButton').style.display = 'none';
      document.getElementById('stopButton').style.display = 'none';
      timeLeft = 10;
      updateTimerDisplay();
    }
  }, 1000);
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    isPaused = true;
    document.getElementById('pauseButton').textContent = 'Resume';
  } else {
    if (isPaused) {
      startTimer();
      isPaused = false;
      document.getElementById('pauseButton').textContent = 'Pause';
    } else {
      startTimer();
    }
    isRunning = true;
  }
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('pauseButton').style.display = 'inline-block';
  document.getElementById('stopButton').style.display = 'inline-block';
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  timeLeft = 10;
  updateTimerDisplay();
  document.getElementById('startButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'none';
}

document.getElementById('startButton').addEventListener('click', toggleTimer);
document.getElementById('pauseButton').addEventListener('click', toggleTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
updateTimerDisplay();