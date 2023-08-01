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
      <img src = ${i.image} alt = 'image for playlist' width="200" height="200">
      <h3>Genre: ${i.genre}</h3>
      <h3>${i.description}</h3>
      <
    `
    playlist.appendChild(entry)
 
  })
}