const { default: Axios } = require("axios");
import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/TrevorBeadle').then(response => {
  cardMaker(response.data);
});



/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
const followersArray = ['https://api.github.com/users/tetondan',
  'https://api.github.com/users/dustinmyers',
  'https://api.github.com/users/justsml',
  'https://api.github.com/users/luishrd',
  'https://api.github.com/users/bigknell',
]

followersArray.forEach(item => {
  axios.get(item).then(response => {
    cardMaker(response.data);
  })
})

axios.get(followersArray[0])
  .then(response => {
    axios.get(response.data["followers_url"])
      .then(response => {
        response.data.forEach(item => {
          axios.get(item["url"])
            .then(response => {
              cardMaker(response.data);
            })
        })
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      })
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMaker(object) {
  // creating all elements needed
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = object.avatar_url;
  img.alt = `${object.name}'s Avatar`

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = object.name;

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = (object.login);

  const location = document.createElement('p');
  location.textContent = `Location: ${object.location}`;

  const profile = document.createElement('p');
  const address = document.createElement('a');
  address.href = object.html_url;
  address.textContent = object.html_url;

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${object.followers}`;

  const following = document.createElement('p');
  following.textContent = `Following: ${object.following}`;

  const bio = document.createElement('p');
  bio.textContent = `Bio: ${object.bio}`;

  // adding elements together in the format above
  card.append(img);
  card.append(cardInfo);
  cardInfo.append(name);
  cardInfo.append(username);
  cardInfo.append(location);
  cardInfo.append(profile);
  profile.append(address);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);

  const cards = document.querySelector('.cards');
  cards.append(card);
  return cards;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
