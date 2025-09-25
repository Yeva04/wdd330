let countdownTime = 10; // Default starting time (seconds)
let intervalId = null; // Store setInterval ID
let isPaused = false; // Track pause/resume state

// Get DOM elements
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseResumeButton = document.getElementById("pauseResumeButton");
const timeInput = document.getElementById("timeInput");

// Update display
function updateDisplay(time) {
  countdownDisplay.textContent = time >= 0 ? time : "Time's up!";
}

// Start countdown
function startCountdown() {
  // Get custom time from input, fallback to default
  const inputTime = parseInt(timeInput.value, 10);
  countdownTime = inputTime > 0 ? inputTime : 10;

  // Reset state
  updateDisplay(countdownTime);
  startButton.disabled = true;
  pauseResumeButton.disabled = false;
  pauseResumeButton.textContent = "Pause";
  isPaused = false;

  // Clear any existing interval
  if (intervalId) clearInterval(intervalId);

  // Start setInterval to decrement every second
  intervalId = setInterval(() => {
    if (!isPaused) {
      countdownTime--;
      updateDisplay(countdownTime);

      // Stop at 0 using setTimeout
      if (countdownTime <= 0) {
        clearInterval(intervalId);
        setTimeout(() => {
          updateDisplay(-1); // Display "Time's up!"
          startButton.disabled = false;
          pauseResumeButton.disabled = true;
        }, 1000); // Delay to show 0 before "Time's up!"
      }
    }
  }, 1000);
}

// Pause or resume countdown
function togglePauseResume() {
  isPaused = !isPaused;
  pauseResumeButton.textContent = isPaused ? "Resume" : "Pause";
}

// Event listeners
startButton.addEventListener("click", startCountdown);
pauseResumeButton.addEventListener("click", togglePauseResume);
