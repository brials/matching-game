'use strict';

var cardArray = []; // This will be the array of cards.
var objArray = []; //This will be all of the users that we will pull from local storage.

var backImage = ''; //possible var filepath for back of cardArray

var imagePaths = [];// all of the front image file paths
var tablePlace = document.getElementById('table');
var cardDown = 'images/Face_Down.png';

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

//create images


var names = ['Alki_Beach','Bruce_Brandon','Chess_Player','Chief_Seattle','Elephant_Carwash','Elliot_Bay_bookstore','Fremont_Troll','Great_Wheel','Hiram_Chittenden_Locks','International_District','Ivar_Seafood','Jazz_Alley','Microsoft','Mount_Rainier_National_Park','Museum_of_Flight','Original_Starbucks','Pacifi_Science_Center','Pike_Place_Market','Pioneer_Square','Queen_Ann_Beerhall','Safeco_Field','Science_Center','Seahawks','Seattle_Aquarium','Seattle_Art_Museum','Sleepless_in_Seattle','Space_Needle','University_of_Washington','Washington_Park_Arboretum','Washington_State_Ferries','Waterfront','Woodland_Park_Zoo']

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
  for(var i = 0; i < rows*rows; i++) {
    new CardtoBeMatch(names[i]);
  }
}


// function to render cards
// function renderCards(){
//   cardArray.forEach(renderImage);
// }
//
// // function called.
// function renderImage(element){
// if(!element.removed){
//   if(!element.faceUp){
//     rend('img', '', element.location, element.name, cardDown);
//   } else {
//     rend('img', '', element.location, element.name, element.imgLocation);
//   }
// }
function renderImage(){
  for(var i = 0; i < cardArray.length; i++){
    if(!cardArray[i].removed){
      if(!cardArray[i].faceUp){
        rend('img', '', document.getElementById(cardArray[i].location), cardArray[i].name, cardDown);
      } else {
        rend('img', '', document.getElementById(cardArray[i].location), cardArray[i].name, cardArray[i].imgLocation);
      }
    }
    // removedfilepath
  }
}

//provide random index for array
function random(array) {
  return Math.floor(Math.random(array.length));
}

// function to assign new location to each card
function imageRandom(rows) {
  var array = [];
  for (var i = 0; i < rows; i++) {
    for (var k = 0; k < rows; k++) {
      var temp = i + ',' + k;
      array.push(temp);
    }
  }
  for (var b = 0; b < cardArray.length; b++) {
    var tempTwo = random(array);
    cardArray[b].location = array[tempTwo];
    array.splice(tempTwo, 1);
  }
}


//function call
makeTable(4);
makeCards(4);
imageRandom(4);
renderImage();
