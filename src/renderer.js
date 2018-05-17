// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let timeTextInput = "0000";

const timeEl = document.querySelector(".time");
const pausePlayImageEl = document.querySelector(".pause-play-button img");

const editInputHandler = evt => {
  const key = event.which || event.keyCode;
  // We're only interested in numbers.
  if (key < 48 || key > 57) {
    return;
  }
  const numberPressed = key - 48;
  timeTextInput += numberPressed;
  timeTextInput = timeTextInput.substring(1);
  renderTime(
    Number(timeTextInput.substring(0, 2)),
    Number(timeTextInput.substring(2, 4))
  );
};

const renderTime = (minutes, seconds) => {
  const timeFormatted =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  timeEl.innerHTML = timeFormatted;
};

document.querySelector(".edit-button").addEventListener("click", evt => {
  clearInterval(timerLoopIntervalId);
  playing = false;
  pausePlayImageEl.src = "controls-play.svg";
  document.body.addEventListener("keypress", editInputHandler);
});

let timerLoopIntervalId = undefined;

const timerLoop = () => {
  if (time.seconds > 0) {
    if (time.minutes == 0) {
      console.log("times up");
      clearInterval(timerLoopIntervalId);
    }
    time.seconds -= 1;
  } else {
    if (time.minutes > 0) {
      time.minutes -= 1;
      time.seconds = 59;
    }
  }
  renderTime(time.minutes, time.seconds);
};

let playing = false;
document.querySelector(".pause-play-button").addEventListener("click", evt => {
  clearInterval(timerLoopIntervalId);
  if (playing) {
    playing = false;
    pausePlayImageEl.src = "controls-play.svg";
    return;
  }
  playing = true;
  pausePlayImageEl.src = "controls-pause.svg";
  document.body.removeEventListener("keypress", editInputHandler);
  time.minutes = Number(timeTextInput.substring(0, 2));
  time.seconds = Number(timeTextInput.substring(2, 4));
  timerLoopIntervalId = setInterval(timerLoop, 1000);
});

let time = {
  minutes: 0,
  seconds: 0
};