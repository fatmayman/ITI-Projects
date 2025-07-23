    let currentTime = 0;
    let isPlaying = false;
    let isMuted = false;
    let playbackSpeed = 1;
    let interval;

    function formatTime(seconds) {
      let minutes = Math.floor(seconds / 60);
      let secs = Math.floor(seconds % 60);
      return minutes + ":" + (secs < 10 ? "0" + secs : secs);
    }

    function updateDisplay() {
      document.getElementById("progress").value = Math.floor(currentTime / 10);
      document.getElementById("timeDisplay").textContent = formatTime(currentTime) + " / 4:00";
    }

    function updateTime() {
      currentTime = document.getElementById("progress").value * 10;
      updateDisplay();
    }

    function play() {
      if (!isPlaying) {
        isPlaying = true;
        interval = setInterval(function () {
          currentTime += playbackSpeed;
          if (currentTime >= 240) {
            currentTime = 240;
            stop();
            return;
          }
          updateDisplay();
        }, 1000);
      }
    }

    function stop() {
      isPlaying = false;
      if (interval) clearInterval(interval);
      updateDisplay();
    }

    function rewind10() {
      currentTime = Math.max(0, currentTime - 10);
      updateDisplay();
    }

    function rewind5() {
      currentTime = Math.max(0, currentTime - 5);
      updateDisplay();
    }

    function forward5() {
      currentTime = Math.min(240, currentTime + 5);
      updateDisplay();
    }

    function forward10() {
      currentTime = Math.min(240, currentTime + 10);
      updateDisplay();
    }

    function updateVolume() {
      let volumeValue = document.getElementById("volume").value;
      document.getElementById("volumeDisplay").textContent = volumeValue;
      if (volumeValue == 0 && !isMuted) {
        isMuted = true;
        document.getElementById("muteBtn").textContent = "Unmute";
      } else if (volumeValue > 0 && isMuted) {
        isMuted = false;
        document.getElementById("muteBtn").textContent = "Mute";
      }
    }

    function toggleMute() {
      isMuted = !isMuted;
      document.getElementById("muteBtn").textContent = isMuted ? "Unmute" : "Mute";
      if (isMuted) {
        document.getElementById("volume").value = 0;
        document.getElementById("volumeDisplay").textContent = "0";
      } else {
        document.getElementById("volume").value = 100;
        document.getElementById("volumeDisplay").textContent = "100";
      }
    }

    function changeSpeed() {
      let speedValue = document.getElementById("speed").value;
      let speeds = [0.25, 0.5, 1, 2];
      playbackSpeed = speeds[speedValue];
      document.getElementById("speedDisplay").textContent = playbackSpeed + "x";
    }