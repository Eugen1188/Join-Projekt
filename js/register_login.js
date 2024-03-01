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

  if (menuOn == false && checkInput() == true) {
    console.log(checkInput());
    btn.classList.remove('d-none');
    menuOn = true;
  }
  else if (menuOn == true) {
    btn.classList.add('d-none');
    menuOn = false;
  }
}


// check input fields not empty

function checkInput() {
  let name = document.getElementById('name-reg').value;
  let email = document.getElementById('email-reg').value;
  let password = document.getElementById('password-reg').value;
  let confirmPassword = document.getElementById('rep-password-reg').value;

  if(name != '' && email != '' && password != '' && confirmPassword != ''){
    return true;
  } else {
    return false;
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
