const musicContainer = document.querySelector('.music-body');
const audioPlayer = document.getElementById('audioPlayer');
const songNameElement = document.getElementById('songName');
const songs = ["songs/ne_pora.mp3", "songs/red_kalyna.mp3", "songs/varshavyanka.mp3"];
let currentSongIndex = 0;
const songNames = ["Не пора", "Червона калина", "Варшавянка"];
//зміна заставки при зміні пісні
function updateBackgroundImage(songPath) {
    const songName = songPath.split('/').pop().split('.')[0];
    const imagePath = `img/${songName}.jpg`;
    musicContainer.style.backgroundImage = `url('${imagePath}')`;
    localStorage.setItem('lastImagePath', imagePath);
}
//прелоад пісні в заложеності від останньо граючої
function checkImagePathOnLoad() {
    const lastImagePath = localStorage.getItem('lastImagePath');
    if (lastImagePath !== null) {
        musicContainer.style.backgroundImage = `url('${lastImagePath}')`;
    }
}

function updateSongName(songName) { // Функція оновлення назви пісні
    if (songName === undefined) {
        songName = localStorage.getItem('lastSongName');
    }
    songNameElement.textContent = "Song Name: " + songName;
}
//Функція для відтворення попередньої пісні
function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audioPlayer.src = songs[currentSongIndex];
    audioPlayer.play();
    updateSongName();
}
//Функція для відтворення наступної пісні
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audioPlayer.src = songs[currentSongIndex];
    audioPlayer.play();
    updateSongName();
}
// Функція для збереження інформації про останню обрану пісню в localStorage
function saveLastSongInfo(songIndex, songName) {
    localStorage.setItem('lastSongIndex', songIndex);
    localStorage.setItem('lastSongName', songName);
}
// Призначаємо обробник події для відтворення обраної пісні з списку, що випадає
function playSelectedSong(event) {
    const selectedSong = event.target.getAttribute('data-song');
    const songName = event.target.textContent;
    const songIndex = songs.indexOf(selectedSong);
    if (songIndex !== -1) {
        currentSongIndex = songIndex;
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.play();
        updateSongName(songName);
        saveLastSongInfo(currentSongIndex, songName);
    }// Зберігаємо інформацію про останню обрану пісню
}
// Функція для перевірки назви пісні та останньої вибраної пісні під час завантаження сторінки
function checkSongsOnLoad() {
    const lastSongName = localStorage.getItem('lastSongName');
    updateSongName(lastSongName);

    const lastSongIndex = localStorage.getItem('lastSongIndex');
    if (lastSongIndex !== null) {
        currentSongIndex = parseInt(lastSongIndex);
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.play();
        updateSongName(songNames[currentSongIndex]);
    }
}

checkImagePathOnLoad();
checkSongsOnLoad();

audioPlayer.addEventListener('play', function () {
    updateBackgroundImage(audioPlayer.src);
});
// Призначаємо обробник подій кожного елемента списку
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', playSelectedSong);
});
// Призначаємо обробники подій кнопкам і списку, що випадає
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
