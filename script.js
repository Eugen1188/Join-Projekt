const STORAGE_TOKEN = "B0S7VW5J7TMVF1N3C8G1FX6TF8A9FYUYYTJ8W60E";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let allTasks = [];
let logedInUser = [];

/**
 * Speichert einen Wert im Speicher.
 * @async
 * @function setItem
 * @param {string} key - Der Schlüssel, unter dem der Wert gespeichert werden soll.
 * @param {*} value - Der Wert, der gespeichert werden soll.
 * @returns {Promise<Object>} Ein Promise, das das Ergebnis des Speicherns zurückgibt.
 * @throws {Error} - Ein Fehler tritt auf, wenn das Speichern fehlschlägt.
 */

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return await fetch(STORAGE_URL, {
    method: "POST", // fügt Daten hinzu
    body: JSON.stringify(payload), // definiert was gesendet wird
  }).then((res) => res.json());
}

/**
 * Ruft einen Wert aus dem Speicher ab.
 * @async
 * @function getItem
 * @param {string} key - Der Schlüssel des Werts, der abgerufen werden soll.
 * @returns {Promise<Object>} Ein Promise, das das abgerufene Ergebnis zurückgibt.
 * @throws {Error} - Ein Fehler tritt auf, wenn das Abrufen fehlschlägt.
 */

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return await fetch(url).then((res) => res.json());
}


/* Öffnet Menü, um neuen user zu registrieren */

function regNewUser() {
  let loginmenu = document.getElementById('login-menu');
  let regmenu = document.getElementById('reg-user-menu');
  loginmenu.classList.add('d-none')
  regmenu.classList.remove('d-none')
}

/* Schließe Menü zum Registrieren */

function closeRegMenu() {
  let loginmenu = document.getElementById('login-menu');
  let regmenu = document.getElementById('reg-user-menu');
  loginmenu.classList.remove('d-none')
  regmenu.classList.add('d-none')
}

/* Rendert eingelogten User */

function renderLogedUser() {
  let userInitials = document.getElementById('logedUserInitials');
  let firstName = document.getElementById('logedInName');
  let lastname = document.getElementById('logedInLastname');
  userInitials.innerHTML = logedInUser[0].initials;
  firstName.innerHTML = logedInUser[0].name;
  lastname.innerHTML = logedInUser[0].lastname;
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

