let menuOn = false;

async function initRegisteredContacts() {

  userData = await getItemContacts('userData');

  // load();
}

async function logIn() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (element.email == email.value && element.password == password.value) {
      if (logedInUser.length == 0) {
        logedInUser.push(element);
        console.log(logedInUser);
        await setItem("logedInUser", logedInUser);
        window.location = "summary.html";
      }
      else {
        email.value = '';
        password.value = '';
        alert('Email Adresse oder Password falsch !')
        break;
      }
    }
  }
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
