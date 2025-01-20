let timer;
let isRunning = false;
let timeLeft = 10; // 60 seconds countdown

function updateTimerDisplay() {
  document.getElementById('timer').textContent = timeLeft + 's';
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
  } else {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('toggleButton').textContent = 'Start';
        timeLeft = 10;
        updateTimerDisplay();
      }
    }, 1000);
  }
  isRunning = !isRunning;
  document.getElementById('toggleButton').textContent = isRunning ? 'Stop' : 'Start';
}

document.getElementById('toggleButton').addEventListener('click', toggleTimer);
updateTimerDisplay();