var objArray = []; //We will set local storage into this.


//people constructor
function People(name, password) {
  this.name = name;
  this.password = password;
  this.score = 0;
  //game-status = render state of table from previous session = [];
  objArray.push(this);
  this.active = true;

}

function loginHandler(event) {
  //Object
  //element objArray
  event.preventDefault();
  var foundUser;
  var user = event.target.username.value;
  var password = event.target.password.value;
  console.log(user);
  console.log(password);
  for (var i = 0; i < objArray.length;i++) {
    if(objArray[i].name === user){
      if(objArray[i].password === password){
        objArray[i].active === true;
        foundUser = true;
      }
    }
  }
  if(!foundUser){
    return alert('Please re-enter a valid username or password. If you are a new user, please sign up.');
  }
  localStorage.objArray = JSON.stringify(objArray);//update local storage
  window.location.href='matching.html';
}



document.getElementById('loginSubmit').addEventListener('click', loginHandler);



function signUpHandler(event) {
  event.preventDefault();
  var user = event.target.username.value;
  var password = event.target.password.value;
  new People(user, password);

}

document.getElementById('signUpSubmit').addEventListener('click', signUpHandler);



if(localStorage.objArray){
  var retrievedData = localStorage.getItem('objArray');
  objArray = JSON.parse(retrievedData);
}//put in objArray
