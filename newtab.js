let timer;
let isRunning = false;
let isPaused = false;
let timeLeft = 10; // 10 seconds countdown
const totalTime = timeLeft;

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateTimerDisplay() {
  document.getElementById('timer').querySelector('span').textContent = formatTime(timeLeft);
  const progress = (1 - timeLeft / totalTime) * 100;
  const circle = document.querySelector('.circle-progress');
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
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