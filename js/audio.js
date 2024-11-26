var audio = document.getElementById('myAudio');
var playPauseButton = document.getElementById('play-pause-text');
var timeSlider = document.getElementById('time-slider');
var volumeSlider = document.getElementById('volume-slider');
var currentTimeDisplay = document.getElementById('current-time');

window.onload = function() {
  // Set the checkboxes for Magnitude and Depth sliders to be checked
  document.getElementById('setting1').checked = true; // Magnitude Slider
  document.getElementById('setting2').checked = true; // Depth Slider

  // Set initial text on the play/pause button
  playPauseButton.innerHTML = "<b>Play</b>";
};

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = "<b>Pause</b>";
  } else {
    audio.pause();
    playPauseButton.innerHTML = "<b>Play</b>";
  }
}

audio.ontimeupdate = function() {
  var currentTime = audio.currentTime;
  var duration = audio.duration;
  var minutes = Math.floor(currentTime / 60);
  var seconds = Math.floor(currentTime % 60);
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  currentTimeDisplay.innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
  timeSlider.value = currentTime / duration;
};

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function updateTime(value) {
  var duration = audio.duration;
  audio.currentTime = value * duration;
}

function updateVolume(value) {
  audio.volume = value;
}
