var objArray = []; //We will set local storage into this.


//people constructor
function People(name, password) {
  this.name = name;
  this.password = password;
  this.score = 0;
  game-status = render state of table from previous session = [];
  userArray.push(this);
  this.active = true;

}

function loginHandler(event) {
  //element objArray
  event.preventDefault();
  var user = event.target.username.value;
  var password = event.target.password.value;
  console.log(user);
  console.log(password);
  for (var i = 0; i< objArray.length;i++) {
    if(objArray[i].name === user && objArray[i].password === password){
      objArray[i].active === true;
      var found = true;
    }
  }
  if(!found){
    return alert('Please re-enter a valid username and password. If you are a new user, please sign up.');
  }
  localStorage.objArray = JSON.stringify(objArray);//update local storage
  window.location.href='matching.html';
}



document.getElementById('loginSubmit').addEventListener('submit', loginHandler);



function signUpHandler(event) {
  event.preventDefault();
  
}

document.getElementById('signUpSubmit').addEventListener('submit', signUpHandler);



if(localStorage.objArray){
  var retrievedData = localStorage.getItem('objArray');
  objArray = JSON.parse(retrievedData);
}//put in objArray
