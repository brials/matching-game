var objArray = []; //We will set local storage into this.
var objArray2 = [];


function checkUsername() {

}
var username = document.getElementById('singIn').addEventListener('click', checkUsername);




function checkPassword() {

}

var password = document.getElementById('password').addEventListener('click', checkPassword);



if(!localStorage.getItem('jennifer')){
  localStorage.setItem('jennifer',JSON.stringify(objArray));
} else {
  var retrievedData = localStorage.getItem('jennifer');
  var objArray2 = JSON.parse(retrievedData);
  localStorage.setItem('jennifer',JSON.stringify(objArray2));
}
