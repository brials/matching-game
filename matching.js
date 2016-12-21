'use strict';

var cardArray = []; // This will be the array of cards.
var objArray = []; //This will be all of the users that we will pull from local storage.
var cardArrayPause = [];
var backImage = ''; //possible var filepath for back of cardArray

var imagePaths = [];// all of the front image file paths
var tablePlace = document.getElementById('table');
var scorePlace = document.getElementById('scores');
var username = document.getElementById('username');
var cardDown = 'images/Face_Down.png';
var clickCount = 1;
var userRows = 4;
var startTime;
var endTime;
var click1 = '';
var click2 = '';

// function to update username message
function updateUserHeader() {
  for(var i = 0; i < objArray.length; i++) {
    if(objArray[i].active) {
      var usernameKey = objArray[i].name;
    }
  }
  var message = 'Welcome ' + usernameKey.charAt(0).toUpperCase() + usernameKey.slice(1) + '!!';
  rend('h1', message, username);
}

// function to render to page
function rend(el, content, place, id, img){
  var tempEl = document.createElement(el);
  tempEl.textContent = content;
  tempEl.setAttribute('id', id);
  tempEl.setAttribute('src', img);
  place.appendChild(tempEl);
}

// function to make row
function makeRow(id, columns){
  rend('tr', '', tablePlace, id);
  var newPlace = document.getElementById(id);
  for(var i = 0; i < columns; i++){
    rend('td', '', newPlace, i + ',' + id);
  }
}

// function to add a table.
function makeTable(rows){
  for(var i = rows - 1; i >= 0 ; i--){
    makeRow(i, rows);
  }
}

//create images_ophelia
var names = ['Alki_Beach','Bruce_Brandon','Chess_Player','Chief_Seattle','Elephant_Carwash','Elliot_Bay_bookstore','Fremont_Troll','Great_Wheel','Hiram_Chittenden_Locks','International_District','Ivar_Seafood','Jazz_Alley','Microsoft','Mount_Rainer_National_Park','Museum_of_Flight','Original_Starbucks','Pacific_Science_Center','Pike_Place_Market','Pioneer_Square','Queen_Ann_Beerhall','Safeco_Field','Science_Center','Seahawks','Seattle_Aquarium','Seattle_Art_Museum','Sleepless_in_Seattle','Space_Needle','University_of_Washington','Washington_Park_Arboretum','Washington_State_Ferries','Waterfront','Woodland_Park_Zoo']

//create object_ophelia
function CardtoBeMatch(name) {
  this.name = name;
  this.imgLocation = 'images/'+name+'.png';
  this.faceUp = false;
  this.removed = false;
  this.location = '';
  this.pauseTime = 0;
  cardArray.push(this);
}

//new instances_ophelia
function makeCards(rows){
  cardArray = [];
  for(var i = 0; i < rows * (rows / 2); i++) {
    new CardtoBeMatch(names[i]);
    new CardtoBeMatch(names[i]);
  }
}

// New Game button_ophelia
document.getElementById('New Game').addEventListener('click', function(){
  scorePlace.innerHTML = '';
  alert('How to Play\nCards are laid out in a grid face down. Click on a card to flip it over, then click on a second card. If the two cards match, they are removed from the game. If the cards are not a match, they are turned back over again. The game continues in this fashion until all the cards are played.\n Good Luck!');
  userRows = parseInt(prompt('Enter your level: 2 or 4 or 6 or 8'));
  if(userRows != 2 && userRows != 4 && userRows != 6 && userRows != 8){
    return alert('Sorry, the answer must be either 2 or 4 or 6 or 8');
  }
  makeCards(userRows);
  imageRandom(userRows);
  renderImage();
  startTime = Date.now();
});

// track game time_ophelia
var gameTime = function () {
  endTime = Date.now();
  return endTime - startTime;
}

// Save button_ophelia
document.getElementById('Save').addEventListener('click', function(){
  localStorage.removeItem('cardArrayPause');
  for(var i = 0; i < userRows*userRows; i++) {
    // cardArray[i] = cardArrayPause[i];
    cardArray[i].pauseTime = gameTime();
  }
  localStorage.setItem('cardArrayPause',JSON.stringify(cardArray));
});
console.log(localStorage[cardArrayPause]);
// Resume button_ophelia
document.getElementById('Resume').addEventListener('click', function(){
  cardArray = JSON.parse(localStorage.getItem('cardArrayPause'));
  renderImage();
  startTime = Date.now();
});

function renderImage(){
  tablePlace.innerHTML = '';
  makeTable(userRows);
  for(var i = 0; i < cardArray.length; i++){
    if(!cardArray[i].removed){
      if(!cardArray[i].faceUp){
        rend('img', '', document.getElementById(cardArray[i].location), cardArray[i].location, cardDown);
      } else {
        rend('img', '', document.getElementById(cardArray[i].location), cardArray[i].location, cardArray[i].imgLocation);
      }
    }
    // removedfilepath
  }
}

//provide random index for array
function random(num) {
  var number = Math.floor(Math.random() * num);
  return number;
}

// function to assign new location to each card
function imageRandom(rows) {
  var arr = [];
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < rows; y++) {
      var temp = x + ',' + y;
      arr.push(temp);
    }
  }
  for (var b = 0; b < cardArray.length; b++) {
    var tempTwo = random(arr.length);
    cardArray[b].location = arr[tempTwo];
    arr.splice(tempTwo, 1);
  }
}

function checkIfFinished(){
  var complete = true;
  for(var i = 0; i < cardArray.length; i++){
    if(!cardArray[i].removed){
      complete = false;
    }
  }
  if(complete){
    var time = gameTime();
    var difficulty = 'score' + userRows;
    for(var j = 0; j < objArray.length; j++){
      if(objArray[j].active){
        objArray[j][difficulty] = time;
      }
    }
    localStorage.setItem('objArray', JSON.stringify(objArray))
    renderScores();
  }
}

function renderScores(){
  var difficulty = 'score' + userRows;
  var msg = 'User Time Difficulty ' + userRows;
  rend('tr', 'User', scorePlace, 'head')
  rend('th', msg, document.getElementById('head'));
  for(var i = 0; i < objArray.length; i++){
    var newId = i + 'scores'
    rend('tr', '', scorePlace, newId);
    rend('td', objArray[i].name, document.getElementById(newId));
    rend('td', objArray[i][difficulty], document.getElementById(newId));
  }
}

function tableHandler(event){
  event.preventDefault();
  var eventId = event.target.id;
  for(var c = 0; c < cardArray.length; c++){
    if(eventId === cardArray[c].location){
      var clickId = cardArray[c].name;
    }
  }
  console.log(eventId);
  console.log(clickId);
  if(clickId === '' || clickId === 'table'){
    return alert('Please click on an a remaining card.');
  }
  if(clickCount === 1){
    for(var i = 0; i < cardArray.length; i++){
      if(cardArray[i].location === eventId){
        cardArray[i].faceUp = true;
        click1 = cardArray[i].name;
        renderImage();
      }
    }
  }
  if(clickCount === 2){
    for(var j = 0; j < cardArray.length; j++){
      if(cardArray[j].location === eventId){
        cardArray[j].faceUp = true;
        click2 = cardArray[j].name;
        renderImage();
      }
    }
    if(click1 === click2){
      for(var b = 0; b < cardArray.length; b++){
        if(cardArray[b].name === click1){
          cardArray[b].removed = true;
        }
      }
    }
    for(var e = 0; e < cardArray.length; e++){
      cardArray[e].faceUp = false;
    }
  }
  setTimeout(function(){renderImage()}, 2000);
  checkIfFinished();
  if(clickCount === 1){
    clickCount += 1;
  } else {
    clickCount = 1;
  }
}


//function call
// makeCards(userRows);
// imageRandom(userRows);
// renderImage();

// Part of localStorage
if(localStorage.objArray){
  objArray = JSON.parse(localStorage.objArray);
}
updateUserHeader();

tablePlace.addEventListener('click', tableHandler);
