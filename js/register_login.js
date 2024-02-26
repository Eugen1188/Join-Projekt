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
      // logedInUser.push(userData[i]);
      // console.log(logedInUser);
      // setItem("logedInUser", logedInUser);
      if (logedInUser.length == 0) {
        console.log(logedInUser.length);
        logedInUser.push(element);
        window.location = "summary.html";
        save();
        break;
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
  if (logedInUser.length == 0) {
    logedInUser.push(guestArray);
  }
  save();
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

function logOut() {
  logedInUser = [];
  save();
  window.location = "index.html";
}