let googleUser;
const personalButton = document.querySelector("#personalButton");
console.log(personalButton);
const workButton = document.querySelector("#workButton");
console.log(workButton);
const randomButton = document.querySelector("#randomButton");
console.log(randomButton);
let categoryChoice = "";

const welcomeText = document.querySelector("#welcomeText");

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      welcomeText.innerHTML = "Welcome, " + user.displayName;
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};



personalButton.addEventListener("click", (e) => {
    console.log("personal clicked");
    categoryChoice = "Personal";
});

console.log("hello are you dumb");

workButton.addEventListener("click", (e) => {
    console.log("work clicked");
    categoryChoice = "Work";
});

randomButton.addEventListener("click", (e) => {
    console.log("random clicked");
    categoryChoice = "Random";
});


const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    category: categoryChoice
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    category = "";
  });
}