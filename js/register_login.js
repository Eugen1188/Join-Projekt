async function initRegisteredContacts() {

  userData = await getItemContacts('userData');
  renderLogedUser()
}

function logIn() {

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let rmbMe = document.getElementById('rememberMe');

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