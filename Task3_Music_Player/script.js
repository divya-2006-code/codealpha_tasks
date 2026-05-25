let songs = [
  "songs/song1.mp3",
  "songs/song2.mp3",
  "songs/song3.mp3",
  "songs/song4.mp3",
  "songs/song5.mp3"
];

let songNames = [
  "Peaceful Waves 🌊",
  "Energy Beats 🔥",
  "Romantic Mood 💖",
  "Shiva Bhakti 🛕",
  "Midnight Chill 🌙"
];

let covers = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg"
];

let currentSong = 0;

let audio = document.getElementById("audio");
let title = document.getElementById("song-title");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");
let playlist = document.getElementById("playlist");
let cover = document.getElementById("cover");
let playBtn = document.getElementById("playBtn");

let currentTimeEl = document.getElementById("current-time");
let durationEl = document.getElementById("duration");

// Load song (FIXED)
function loadSong() {
  audio.pause();
  audio.currentTime = 0;

  audio.src = songs[currentSong];
  title.innerText = songNames[currentSong];
  cover.src = covers[currentSong];

  highlightSong();
}

loadSong();

// Toggle play/pause (IMPROVED)
function togglePlay() {
  if (audio.paused) {
    audio.play().then(() => {
      playBtn.innerText = "⏸";
    });
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

// Next song (FIXED)
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong();

  setTimeout(() => {
    audio.play();
    playBtn.innerText = "⏸";
  }, 100);
}

// Previous song (FIXED)
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong();

  setTimeout(() => {
    audio.play();
    playBtn.innerText = "⏸";
  }, 100);
}

// Progress update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
  }
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay
audio.addEventListener("ended", nextSong);

// Format time
function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return min + ":" + (sec < 10 ? "0" + sec : sec);
}

// Playlist
songs.forEach((song, index) => {
  let li = document.createElement("li");
  li.innerText = songNames[index];
  li.onclick = () => {
    currentSong = index;
    loadSong();

    setTimeout(() => {
      audio.play();
      playBtn.innerText = "⏸";
    }, 100);
  };
  playlist.appendChild(li);
});

// Highlight active song
function highlightSong() {
  let items = document.querySelectorAll("#playlist li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentSong);
  });
}