var cardArray = []; // This will be the array of cards.
var objArray = []; //This will be all of the users that we will pull from local storage.

var backImage = ''; //possible var filepath for back of cardArray

var imagePaths = [];// all of the front image file paths
var tablePlace = document.getElementById('table');

function rend(el, content, place, id, img){
  var tempEl = document.createElement(el);
  tempEl.textContent = content;
  tempEl.setAttribute('id', id);
  tempEl.setAttribute('src', img);
  place.appendChild(tempEl);
}

function makeRow(id, columns){
  rend('tr', '', tablePlace, id);
  var newPlace = document.getElementById(id);
  for(var i = 0; i < columns; i++){
    rend('td', '', newPlace, i + ',' + id);
  }
}

function makeTable(rows){
  for(var i = rows - 1; i >= 0 ; i--){
    makeRow(i, rows);
  }
}

function renderCards(){
  cardArray.forEach(renderImage)
}

function renderImage(element){
  if(!element.removed){
    if(!element.faceUp){
      rend('img', '', element.location, element.name, element.imgLocation);
    } else {
      rend('img', '', element.location, element.name, cardDown);
    }
  }
}
