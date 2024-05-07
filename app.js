
let currentMusic = 0;

const music = document.querySelector('#audio');
const seekbar = document.querySelector('.song-slider'); // Use the global 'seekbar' variable here
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
});

// setup music
const setMusic = (i) => {
    seekbar.value = 0; // set range slide value to 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekbar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);    
};

setMusic(0);

// formatting time in min and seconds format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
};
music.addEventListener('canplaythrough', () => {
    seekbar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
});

// seek bar
setInterval(() => {
    seekbar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekbar.max)) {
        forwardBtn.click();
    }
}, 500);

seekbar.addEventListener('change', () => {
    console.log('Seekbar value:', seekbar.value);
    console.log('Music duration:', music.duration);
    music.currentTime = seekbar.value;
    console.log('Current Time:', music.currentTime);
});


function playMusic() {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

// forward and backward button
forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});
