const songs = [];
let currentSongIndex = 0;
let isRandom = false;

const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const albumName = document.getElementById('album-name');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const randomButton = document.getElementById('random');
const selectButton = document.getElementById('select');
const playlistElement = document.getElementById('playlist');
const fileInput = document.getElementById('file-input');

function loadSong(song) {
    songTitle.textContent = song.title;
    artistName.textContent = song.artist || "Desconocido";
    albumName.textContent = song.album || "Desconocido";
    audioSource.src = song.src;
    audio.load();
}

function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playNext() {
    if (isRandom) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function populatePlaylist() {
    playlistElement.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist || "Desconocido"}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
        });
        playlistElement.appendChild(li);
    });
}

selectButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            songs.push({
                title: file.name,
                src: e.target.result
            });
            populatePlaylist();
        };
        reader.readAsDataURL(file);
    });
});

playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);
randomButton.addEventListener('click', () => {
    isRandom = !isRandom;
    randomButton.classList.toggle('active', isRandom);
});
audio.addEventListener('ended', playNext);

// Cargar la primera canción si hay canciones
if (songs.length > 0) {
    loadSong(songs[currentSongIndex]);
}
