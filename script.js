let playlist = document.getElementById('playlists');
let dataUrl = 'http://localhost:3000/playlists'

// send GET request to the local server
fetch(dataUrl)
  .then(res => res.json())
  .then(data => displayScreen(data))


//Append the required details to the browser
let displayScreen = (data) => {
  data.map(i =>  {
    let entry = document.createElement('songDiv');
    entry.innerHTML = `
      <img src = ${i.image} alt = 'image for playlist' width="120" height="120">
      <h3>By: ${i.author}</h3>
      <h3>Genre: ${i.genre}</h3>
      <h3>${i.description}</h3>
      <a href="${i.url}"><button>Go To Playlist </button></a>
      <button class="play-btn" data-id="${i.id}">Play Playlist </button>
    `
    playlist.appendChild(entry)
 
  })
}