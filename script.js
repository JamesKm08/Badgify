let playlist = document.getElementById('Badgify');
let dataUrl = 'http://localhost:3000/playlists'
let songForm = document.getElementById('songForm')

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
      <a href="${i.url}"><button class = "play-btn">Play</button></a>
      <button type = "click" class = "del-btn">Delete</button><br><br>
      
    `
    playlist.appendChild(entry)
 
  })

}

//Using the POST request to add playlist and display them
let addPlaylist = (e) => {
  e.preventDefault()
  let author = document.getElementById('author').value
  let genre = document.getElementById('genre').value
  let description = document.getElementById('description').value
  let imageUrl = document.getElementById('image_url').value
  let playlistUrl = document.getElementById('playlist_url').value

  const playObj = {
    author: author,
    genre: genre,
    description: description,
    image: imageUrl,
    url: playlistUrl
  }

  fetch(dataUrl,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(playObj)
  })
  .then(res => res.json())
  .then(data => console.log(data))

}
songForm.addEventListener('submit', addPlaylist)


//Deleting various playlistf from the list
let deletePlaylist = (e) => {
  e.preventDefault()

  fetch(`dataUrl${id}`,{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => console.log(data))

document.querySelector('.del-btn').addEventListener('click', deletePlaylist)

}
