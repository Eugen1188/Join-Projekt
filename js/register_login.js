let menuOn = false;

async function initRegisteredContacts() {

  userData = await getItemContacts('userData');
  // load();
}

function logIn() {

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (element.email == email && element.password == password) {
      if (logedInUser.length == 0) {
        logedInUser.push(element);
        console.log(logedInUser);
        setItem("logedInUser", logedInUser);
        window.location = "summary.html";
      }
    }
    else
      alert('Email Adresse oder Password falsch !')
    break;
  }
}

// login als Gast

function logInAsGuest() {
  guestArray = ({
    name: "Guest",
    email: "guest@guest.org",
    password: "password",
    initials: "G",
  });
  logedInUser.push(guestArray);
  setItem("logedInUser", logedInUser);
}

// Zeige den Sign Up Button sobald die Checkbox aktiviert ist

function showRegisterButton() {
  let btn = document.getElementById('registerBtn');
  if (menuOn == false) {
    btn.classList.remove('d-none');
    menuOn = true;
  }
  else if (menuOn == true) {
    btn.classList.add('d-none');
    menuOn = false;
  }
}


function showRegistrationAnimation() {

  let blackCont = document.getElementById('feedback-black-container');
  let feedback = document.getElementById('feedback-registration');
  blackCont.style.display = 'flex';
  console.log(feedback.style.top);
  feedback.style.top = '50%';
  setTimeout(() => {
    window.location.href = 'index.html';;
  }, 1000);
}


/*
function save() {

  let logedInUsers = JSON.stringify(logedInUser);
  localStorage.setItem('logedInUser', logedInUsers);
}

function load() {

  let logedInUsers = localStorage.getItem('logedInUser');
  if (logedInUsers) {
    logedInUser = JSON.parse(logedInUsers);
  }
}

*/

function logOut() {
  logedInUser = [];
  setItem("logedInUser", logedInUser);
  window.location = "index.html";
}

