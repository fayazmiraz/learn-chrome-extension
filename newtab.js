let timer;
let isRunning = false;
let isPaused = false;
let isWorkTime = true;
let workTimeStart = 300; // 5 minutes
let restTimeStart = 60; // 1 minute
let timeLeft = workTimeStart;
let totalTime = timeLeft;

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

  const timerContainer = document.getElementById('timer');
  if (timeLeft > totalTime * 0.5) {
    timerContainer.style.color = '#4caf50'; // Green
    circle.style.stroke = '#4caf50';
  } else if (timeLeft > totalTime * 0.2) {
    timerContainer.style.color = '#ffb74d'; // Orange
    circle.style.stroke = '#ffb74d';
  } else {
    timerContainer.style.color = '#e57373'; // Red
    circle.style.stroke = '#e57373';
  }
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      if (isWorkTime) {
        isWorkTime = false;
        timeLeft = restTimeStart;
        totalTime = restTimeStart;
        startTimer();
      } else {
        isWorkTime = true;
        document.getElementById('startButton').style.display = 'inline-block';
        document.getElementById('pauseButton').style.display = 'none';
        document.getElementById('stopButton').style.display = 'none';
        document.getElementById('workTimeSlider').disabled = false;
        document.getElementById('restTimeSlider').disabled = false;
        timeLeft = workTimeStart;
        totalTime = workTimeStart;
        isRunning = false;
        updateTimerDisplay();
      }
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
  document.getElementById('workTimeSlider').disabled = true;
  document.getElementById('restTimeSlider').disabled = true;
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  isWorkTime = true;
  timeLeft = workTimeStart;
  totalTime = workTimeStart;
  updateTimerDisplay();
  document.getElementById('startButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'none';
  document.getElementById('workTimeSlider').disabled = false;
  document.getElementById('restTimeSlider').disabled = false;
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const iconEl = document.getElementById('themeToggle').querySelector('.icon');
  iconEl.textContent = isDark ? String.fromCodePoint(0x1F319) : String.fromCodePoint(0x2600);
}

function updateWorkTime() {
  workTimeStart = parseInt(document.getElementById('workTimeSlider').value, 10);
  if (!isRunning && !isPaused && isWorkTime) {
    timeLeft = workTimeStart;
    totalTime = workTimeStart;
    updateTimerDisplay();
  }
  document.getElementById('workTimeLabel').textContent = `Work Time: ${formatTime(workTimeStart)}`;
}

function updateRestTime() {
  restTimeStart = parseInt(document.getElementById('restTimeSlider').value, 10);
  if (!isRunning && !isPaused && !isWorkTime) {
    timeLeft = restTimeStart;
    totalTime = restTimeStart;
    updateTimerDisplay();
  }
  document.getElementById('restTimeLabel').textContent = `Rest Time: ${formatTime(restTimeStart)}`;
}

document.getElementById('startButton').addEventListener('click', toggleTimer);
document.getElementById('pauseButton').addEventListener('click', toggleTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('workTimeSlider').addEventListener('input', updateWorkTime);
document.getElementById('restTimeSlider').addEventListener('input', updateRestTime);

if (
  localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.body.classList.add('dark');
  document.getElementById('themeToggle').querySelector('.icon').textContent = String.fromCodePoint(0x1F319);
} else {
  document.getElementById('themeToggle').querySelector('.icon').textContent = String.fromCodePoint(0x2600);
}

updateTimerDisplay();