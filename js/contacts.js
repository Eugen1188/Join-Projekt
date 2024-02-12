let contacts = [];
let userData = [];
let sortedUsers;
let id;

/**
 *Updates the data of a person, only updates the data whose field is also filled in
 * @param {number} id - is needed to find the person to be updated
 * @returns - if nothing has been filled in, the function terminates and does not return a value
 */
function editContact(id) {
  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const phoneValue = document.getElementById("phone").value.trim();
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      if (nameValue || emailValue || phoneValue) {
        if (nameValue) {
          contacts[i].name = nameValue;
        }
        if (emailValue) {
          contacts[i].email = emailValue;
        }
        if (phoneValue) {
          contacts[i].phone = phoneValue;
        }
        break;
      } else {
        return;
      }
    }
  }
}

async function testfuncContacts(key, array) {
  let myArray = getItem(key);
  await myArray
    .then((result) => {
      array = JSON.parse(result.data.value);
      console.log(array);
    })
    .catch((error) => {
      console.error("Ein Fehler ist aufgetreten:", error);
    });
}


/**If the code is adopted, replace getItem with getItemContacts */
async function getItemContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    let response = await fetch(url)
    if (response.ok) {
      const responseData = await response.json()
      return JSON.parse(responseData.data.value)
    }
  } catch (error) {
    console.error(error);
  }
}

async function initContacts() {
  contacts = await getItemContacts("contacts")
  id = await getItemContacts("id")
  renderContacts()
}

/**
 * löscht den user aus dem array
 * @param {number} id - is required to find the desired user to be deleted
 */
async function deleteContact(id) {
  const userId = id;
  for (let i = 0; i < contacts.length; i++) {
    const userId = contacts[i].id;
    if (userId === userId) {
      contacts.splice(1, i)
      break;
    }
  }
}

/**
 * Saves the user in userData array and
 */
async function saveNewUserData() {
  id++
  const name = document.getElementById("name").value.trim()
  const firstname = name.split(' ');
  const lastname = name.split(' ');
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const password = document.getElementById("password").value.trim()
  if (checkEmailAddress(email, userData)) {
    return
  }
  userData.push({ id: id, name: firstname[0], lastname: lastname[(lastname.length - 1)], email: email, phone: phone, password: password })
  await setItem("userData", userData)

}

/** adds a new contact to Contactlist */
async function addNewContactToContactlist() {
  id++
  let name = document.getElementById("name").value.trim()
  const firstname = name.split(' ');
  const lastname = name.split(' ');
  let email = document.getElementById("email").value.trim()
  let phone = document.getElementById("phone").value.trim()
  if (checkEmailAddress(email, contacts)) {
    return
  }
  contacts.push({ id: id, name: firstname[0], lastname: lastname[(lastname.length - 1)], email: email, phone: phone })
  renderContacts()
  await setItem("id", id)
  setItem("contacts", contacts)
}

/**
 * Sorts contacts array by first an lastname
 */
function sortArrayByUserName() {
  sortedUsers = contacts.sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return result !== 0 ? result : a.lastname.localeCompare(b.lastname);
  })
}

/**
 * /**
 *Compares the email in the contacts array, if the email exists it returns a value,
  which can be intercepted in an if query to jump out of the function
 * @param {string} email - is required to compare the emails
 * @param {array} array - which array should be searched for the emails
 * @returns
 */
function checkEmailAddress(email, array) {
  for (let i = 0; i < array.length; i++) {
    const existingEmail = array[i].email;
    if (existingEmail === email) {
      return "This email is already in use"
    }
  }
}

/**
 * renders the maps, always makes a capital letter when a new charAt(0) is reached
 */
function renderContacts() {
  sortArrayByUserName()
  const list = document.getElementById("contact-list");
  list.innerHTML = ""
  list.innerHTML += contactDataHTML(0)
  list.innerHTML += contactUserCardHtml(0)
  for (let i = 1; i < contacts.length - 1; i++) {
    if (contacts[i].name.charAt(0) != contacts[i - 1].name.charAt(0)) {
      list.innerHTML += contactDataHTML(i)
      list.innerHTML += contactUserCardHtml(i)
    } else {
      list.innerHTML += contactUserCardHtml(i)
    }
  }
}
/* neuen User anlegen */

function addNewUser() {
  let name = document.getElementById('name-reg');
  let email = document.getElementById('email-reg');
  let password = document.getElementById('password-reg');
  let confirm_password = document.getElementById('rep-password-reg');
  contacts.push({ name: name.value, email: email.value, password: password.value });
  console.log(contacts);
}
