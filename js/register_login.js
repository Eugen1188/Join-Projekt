async function initRegisteredContacts() {
  userData = await getItemContacts('userData');
}


async function logIn() {
  event.preventDefault(); // Kein Standardverhalten des Formulars
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let loggedIn = false;
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    if (element.email === email && element.password === password) {
      loggedIn = true;
      logedInUser.push(element);
      await setItem("logedInUser", logedInUser);
      window.location.href = "summary.html";
      saveRememberMe();
      return;
    }
  }
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  alert('Email Adresse oder Passwort falsch !');
}


// remember me funktion zum einlogen, speichert eingegebene email und password im local storage

function saveRememberMe() {
  let rememberMe = document.getElementById('rememberMe').checked;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (rememberMe) {
    localStorage.setItem('rememberedEmail', email);
    localStorage.setItem('rememberedPassword', password);
  } else {
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
  }
}


// Ruft die gespeicherten Daten aus dem Lokal Store und für email und password ins input Feld

function loadRememberMe() {
  let rememberedEmail = localStorage.getItem('rememberedEmail');
  let rememberedPassword = localStorage.getItem('rememberedPassword');
  if (rememberedEmail && rememberedPassword) {
    document.getElementById("email").value = rememberedEmail;
    document.getElementById("password").value = rememberedPassword;
  }
}


// Zeige den Sign Up Button sobald die Checkbox aktiviert ist

function showRegisterButton() {
  let checkedBox = document.getElementById('registerCheckbox').checked;
  let name = document.getElementById('name-reg').value;
  let email = document.getElementById('email-reg').value;
  let password = document.getElementById('password-reg').value;
  let btn = document.getElementById('registerBtn');
  let confirmPassword = document.getElementById('rep-password-reg').value;
  if (!name || !email || !password || !confirmPassword || !checkedBox) {
    btn.disabled = true;
    return
  }
  btn.disabled = false;

}



function showRegistrationAnimation() {

  let blackCont = document.getElementById('feedback-black-container');
  let feedback = document.getElementById('feedback-registration');
  blackCont.style.display = 'flex';
  feedback.style.top = '50%';
  setTimeout(() => {
    window.location.href = 'index.html';;
  }, 1000);
}
