'use strict';

var cardArray = []; // This will be the array of cards.
var objArray = []; //This will be all of the users that we will pull from local storage.
var tablePlace = document.getElementById('table');
var scorePlace = document.getElementById('scores');
var cardDown = 'images/Face_Down.png';
var clickCount = 1;
var userRows = 4;
var startTime = new Date;
var click1 = '';
var click2 = '';

// function to render to page
function rend(el, content, place, id, img, newClass){
  var tempEl = document.createElement(el);
  tempEl.textContent = content;
  tempEl.setAttribute('id', id);
  tempEl.setAttribute('src', img);
  tempEl.setAttribute('class', newClass)
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

//create images
var names = ['Alki_Beach','Bruce_Brandon','Chess_Player','Chief_Seattle','Elephant_Carwash','Elliot_Bay_bookstore','Fremont_Troll','Great_Wheel','Hiram_Chittenden_Locks','International_District','Ivar_Seafood','Jazz_Alley','Microsoft','Mount_Rainer_National_Park','Museum_of_Flight','Original_Starbucks','Pacific_Science_Center','Pike_Place_Market','Pioneer_Square','Queen_Ann_Beerhall','Safeco_Field','Science_Center','Seahawks','Seattle_Aquarium','Seattle_Art_Museum','Sleepless_in_Seattle','Space_Needle','University_of_Washington','Washington_Park_Arboretum','Washington_State_Ferries','Waterfront','Woodland_Park_Zoo']

//create object_ophelia
function CardtoBeMatch(name) {
  this.name = name;
  this.imgLocation = 'images/'+name+'.png';
  this.faceUp = false;
  this.removed = false;
  this.location = '';
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

// Resume button_ophelia
document.getElementById('NewGame').addEventListener('click', function(){
  scorePlace.innerHTML = '';
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
  var total = Date.now() - startTime;
  var minutes = Math.floor(total / 60000);
  var seconds = Math.floor((total % 60000) / 1000);
  var msg = minutes + ' Minutes, ' + seconds + ' Seconds';
  return msg;
}

//render images to the table and create the table.
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

//do this at end of game.
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
    setTimeout(function(){renderScores()}, 2100);
  }
}

//render scores.
function renderScores(){
  tablePlace.innerHTML = '';
  var difficulty = 'score' + userRows;
  var msg = 'User Time Difficulty ' + userRows;
  rend('tr', '', scorePlace, 'head')
  rend('th', 'User', document.getElementById('head'), '', '', 'tableHead');
  rend('th', msg, document.getElementById('head'), '', '', 'tableHead');
  for(var i = 0; i < objArray.length; i++){
    var newId = i + 'scores'
    rend('tr', '', scorePlace, newId);
    rend('td', objArray[i].name, document.getElementById(newId), '', '', 'tableUser');
    rend('td', objArray[i][difficulty], document.getElementById(newId), '', '', 'tableTime');
  }
}

//playing the game.
function tableHandler(event){
  event.preventDefault();
  var eventId = event.target.id;
  for(var c = 0; c < cardArray.length; c++){
    if(eventId === cardArray[c].location){
      var clickId = cardArray[c].name;
    }
  }
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

// Part of localStorage
if(localStorage.objArray){
  objArray = JSON.parse(localStorage.objArray);
}

tablePlace.addEventListener('click', tableHandler);
