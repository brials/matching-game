var objArray = []; //We will set local storage into this.


//people constructor
function People(name, password) {
  this.name = name;
  this.password = password;
  this.score2 = 0;
  this.score4 = 0;
  this.score6 = 0;
  this.score8 = 0;
  objArray.push(this);
  this.active = true;

}

function loginHandler(event) {
  event.preventDefault();
  var foundUser = false;
  var user = event.target.username.value.toLowerCase();
  var password = event.target.password.value;
  console.log(user);
  console.log(password);
  for (var i = 0; i < objArray.length; i++) {
    objArray[i].active = false;
    if(objArray[i].name === user && objArray[i].password === password) {
      objArray[i].active = true;
      foundUser = true;
    }
  }
  if(!foundUser){
    return alert('Please re-enter a valid username or password. If you are a new user, please sign up.');
  }
  localStorage.objArray = JSON.stringify(objArray);//update local storage
  window.location.href='matching.html';
}
document.getElementById('loginSubmit').addEventListener('submit', loginHandler);

function signUpHandler(event) {
  event.preventDefault();
  var user = document.getElementsByClassName('return_name')[0].value.toLowerCase();
  var password = document.getElementsByClassName('return_password')[0].value;
  if(user === '' || password === ''){
    return alert('Please enter a value for both username and password');
  }
  for (var i = 0; i < objArray.length; i++){
    if(objArray[i].name === user) {
      return alert('Username already in use. Please choose another username');
    }
  }
  if (user.includes(' ')) {
    return alert('Please choose a "single word" username');
  }

  for(var j = 0; j < objArray.length; j++){
    objArray[j].active = false;
  }
  new People(user, password);
  localStorage.setItem('objArray', JSON.stringify(objArray));
  window.location.href='matching.html';
}
document.getElementsByClassName('signUpButton')[0].addEventListener('click', signUpHandler);

if(localStorage.objArray){
  var retrievedData = localStorage.getItem('objArray');
  objArray = JSON.parse(retrievedData);
}
