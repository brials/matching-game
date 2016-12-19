'use strict';

var cardArray = []; // This will be the array of cards.
var objArray = []; //This will be all of the users that we will pull from local storage.

var backImage = ''; //possible var filepath for back of cardArray

var imagePaths = [];// all of the front image file paths
var tablePlace = document.getElementById('table');

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



var faceDown.src = img/Face Down.png;

// var names = ['Admir','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',]
//
//
// function CardtoBeMatch(name) {
//   this.
// }

// function to render cards
function renderCards(){
  cardArray.forEach(renderImage)
}

// function called.
function renderImage(element){
  if(!element.removed){
    if(!element.faceUp){
      rend('img', '', element.location, element.name, cardDown);
    } else {
      rend('img', '', element.location, element.name, element.imgLocation);
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
    var tempTwo = random();
    cardArray[b].location = array[tempTwo];
    array.splice(tempTwo, 1);
  }
}
