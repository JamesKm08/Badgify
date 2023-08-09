document.addEventListener('DOMContentLoaded', (e) => {
  //Declaring the variables
  e.preventDefault();
  let playlist = document.getElementById('Badgify');
  let dataUrl = 'http://localhost:3000/playlists'
  let songs = document.getElementById('songForm')
  
  // send GET request to the local server
  fetch(dataUrl)
    .then(res => res.json())
    .then(data => displayScreen(data))
  
  // Append the required details to the browser
  let displayScreen = (data) => {
    data.map(i =>  {
      let entry = document.createElement('div');
      entry.classList.add('songDiv'); // Add a class for styling purposes
      entry.innerHTML = `
        <img src="${i.image}" alt="image for playlist" width="120" height="120">
        <h3>By: ${i.author}</h3>
        <h3>Genre: ${i.genre}</h3>
        <h3>${i.description}</h3>
        <a href="${i.url}"><button class="play-btn">Play</button></a>
        <button class="del-btn">Delete</button><br><br>
      `;
      playlist.appendChild(entry);
  
      // Use a class selector to add event listener to each delete button
      entry.querySelector('.del-btn').addEventListener('click', () => {
        let deleteUrl  = `http://localhost:3000/playlists/${i.id}`;
        fetch(deleteUrl, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        })
        .then((res) => {
          if (res.ok) {
            const indexToDelete = data.findIndex(item => item.id === i.id);
            if (indexToDelete !== -1) {
              data.splice(indexToDelete, 1);
            }
            // Remove from DOM
            entry.remove();
          } else {
            alert('Failed to delete!');
          }
        })
        .catch(error => {
          alert('An error occurred while deleting: ' + error.message);
        });
      });
    });
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
    location.reload()
  
  }
  if(songs){songs.addEventListener('submit', addPlaylist)}
    else{
      console.log('error')
    }
  
  }
  )
  
  