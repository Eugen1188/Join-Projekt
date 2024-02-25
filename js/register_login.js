let menuOn = false;

async function initRegisteredContacts() {

  userData = await getItemContacts('userData');
}

function logIn() {

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (element.email == email && element.password == password) {
      logedInUser.push(userData[i]);
      console.log(logedInUser);
      setItem("logedInUser", logedInUser);
      window.location = "summary.html";
    }
    else
      alert('Email Adresse oder Password falsch !')
  }
}

// Zeige den Sign Up Button sobald die Checkbox aktiviert ist

function showRegisterButton() {
  const name = document.getElementById("name-reg").value;
  const email = document.getElementById("email-reg").value;
  const password = document.getElementById("password-reg").value;
  const passwordRep = document.getElementById("rep-password-reg").value;

  let btn = document.getElementById('registerBtn');
  if (menuOn == false) {
    btn.classList.remove('d-none');
    menuOn = true;
  }
  else if(menuOn == true){
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