Title: this is "matching-game" schema.

Feature Tasks:

wireframe: 4 pages: user splash page, feature game (themes), About-us, (game-score)


flow charts:

1) user splash page:
   login/sign-up
   A) new user: create new object instance (name, password),
      , navigate to feature game page
name (name, password){
  this.name;
  this.password;
  this.score;
  userArray.push(this);
  this.active = true;
}
eventHandler function (){
  check active status;
  go to another html page;
  localStorage(stuff);
}

B) repeat user: check against existing objects (name, password)
    return alert when validation fails, else navigate to feature game page

    eventHandler function (){
      check active status;
      go to another html page;
      localStorage(stuff);

2) Feature game:

A) instruction (one user)

B) set up two card instances (face up = false, location);

C) set up number of squares, each square with id("x,y")

D) function random generator for card location

E) evenHandler function (click) {
    flip first card,
    flip second card, check if match,
    render table;
    }

  alert(for not clicking card)

F) 





3) About-us:
add team-member bio;
