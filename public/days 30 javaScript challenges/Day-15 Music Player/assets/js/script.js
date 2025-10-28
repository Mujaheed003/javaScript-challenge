let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let title = document.getElementById("song-title");
let artist = document.getElementById("song-artist");
let img = document.getElementById("song-img");
let menu = document.getElementById("menu");
let playlistUI = document.getElementById("playlist");

const songs = [
  {
    title: "Gbagy National Anthem",
    artist: "Amrah Shukulayi Ilaigwudu",
    src: "assets/Gbagy Songs/Gbagy National Anthem.mp4",
    img: "assets/img/img-1.png",
  },
  {
    title: "A.S.B KABULU",
    artist: "A.S.B",
    src: "assets/Gbagy Songs/A.S.B KABULU.MP3",
    img: "assets/img/img-2.png",
  },
  {
    title: "Dr. Aminu Boka",
    artist: "Asb_Aminu",
    src: "assets/Gbagy Songs/Asb_aminu boka 2.mp3",
    img: "assets/img/img-3.png",
  },
  {
    title: "Gbagy National Anthem",
    artist: "Yunusa Yakubu Abdullahi",
    src: "assets/Gbagy Songs/Gbagy National Anthem 2.mp4",
    img: "assets/img/img-4.png",
  },
  {
    title: "FABADABYI SHUGUWU ANA",
    artist: "Aabadabyi ASB",
    src: "assets/Gbagy Songs/FABADABYI ASB.mp3",
    img: "assets/img/img-5.png",
  },
  {
    title: "SHEKONYA FIZAWOIN",
    artist: "ASB Shekonya",
    src: "assets/Gbagy Songs/FIZAWOIN (ASB SHEKONYA).mp3",
    img: "assets/img/img-6.png",
  },
  {
    title: "JAGWA  MASHI ABAGY",
    artist: "Jagwa  Mashi",
    src: "assets/Gbagy Songs/JAGWA  MASHI.mp3",
    img: "assets/img/img-7.png",
  },
  {
    title: "TU SOLAR MIX",
    artist: "Kwali Sammi Ya Madapho Tu Solar Mix",
    src: "assets/Gbagy Songs/KWALI SAMMI YA MADAPHO TU SOLAR MIX.mp3",
    img: "assets/img/img-8.png",
  },
];

let currentSong = 0;

window.onload = () => {
  loadSong(currentSong);
  buildPlaylist();
};

function loadSong(index) {
  const s = songs[index];
  song.src = s.src;
  title.textContent = s.title;
  artist.textContent = s.artist;
  img.src = s.img;

  song.load();
  song.onloadedmetadata = () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
  };
}

function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  } else {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
}

song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
});

progress.onchange = () => {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function playSong() {
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

// function toggleMenu() {
//     menu.style.display = menu.style.display === "block" ? "none" : "block";
// }

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.left === "0px") {
    menu.style.left = "-250px";
  } else {
    menu.style.left = "0px";
  }
}

function buildPlaylist() {
  playlistUI.innerHTML = "";
  songs.forEach((s, i) => {
    let li = document.createElement("li");
    li.textContent = `${s.title} - ${s.artist}`;
    li.onclick = () => {
      currentSong = i;
      loadSong(currentSong);
      playSong();
      toggleMenu();
    };
    playlistUI.appendChild(li);
  });
}
