let timer;
let isRunning = false;
let isPaused = false;
const timeStart = 300; // 5 minutes
let timeLeft = timeStart;
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

  const timerSpan = document.getElementById('timer').querySelector('span');
  timerSpan.style.opacity = 0;
  timerSpan.style.transform = 'scale(1.2)';
  requestAnimationFrame(() => {
    timerSpan.style.opacity = 1;
    timerSpan.addEventListener('transitionend', () => {
      timerSpan.style.transform = 'scale(1)';
    }, { once: true });
  });
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
      timeLeft = timeStart;
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
  timeLeft = timeStart;
  updateTimerDisplay();
  document.getElementById('startButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'none';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const iconEl = document.getElementById('themeToggle').querySelector('.icon');
  iconEl.textContent = isDark ? String.fromCodePoint(0x1F319) : String.fromCodePoint(0x2600);
}

document.getElementById('startButton').addEventListener('click', toggleTimer);
document.getElementById('pauseButton').addEventListener('click', toggleTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

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