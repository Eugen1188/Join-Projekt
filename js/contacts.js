let contacts = [
  {
    id: 1,
    name: "Werner",
    lastname: "Müller",
    email: "werner@irgendwas.com",
    phone: "0461669548",
  },
  {
    id: 2,
    name: "Peter",
    lastname: "Hansen",
    email: "perter@gmx.de",
    phone: "016215415742",
  },
  {
    id: 3,
    name: "Sabine",
    lastname: "Schmidt",
    email: "sabine@example.com",
    phone: "03012345678",
  },
  {
    id: 4,
    name: "Michael",
    lastname: "Meier",
    email: "michael@example.com",
    phone: "017612345678",
  },
  {
    id: 5,
    name: "Lisa",
    lastname: "Müller",
    email: "lisa@example.com",
    phone: "049157865432",
  },
  {
    id: 6,
    name: "Thomas",
    lastname: "Schulz",
    email: "thomas@example.com",
    phone: "071123456789",
  },
  {
    id: 7,
    name: "Anna",
    lastname: "Fischer",
    email: "anna@example.com",
    phone: "020112345678",
  },
  {
    id: 8,
    name: "Stefan",
    lastname: "Wagner",
    email: "stefan@example.com",
    phone: "091123456789",
  },
  {
    id: 9,
    name: "Julia",
    lastname: "Klein",
    email: "julia@example.com",
    phone: "022156789012",
  },
  {
    id: 10,
    name: "Andreas",
    lastname: "Schneider",
    email: "andreas@example.com",
    phone: "015112345678",
  }
];
let sortedUsers;
let id = 10;

// currently sorted by first name only, will be changed soon
// function sortArrayByFirstname() {
//   contacts.sort((a, b) => {
//     const result = a.name.localeCompare(b.name);
//     return result;
//   })
// }

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

function initContacts() {
  renderContacts()
}


/**
 * löscht den user aus dem array
 * @param {number} id - is required to find the desired user to be deleted
 */
async function deleteContact(id) {
  const userId = id;
  for (let i  = 0; i < contacts.length; i++) {
    const userId = contacts[i].id;
    if (userId === userId) {
      contacts.splice(1, i)
      break;
    }
  }
}

function renderContacts() {
  renderContacts()
}

function checkValues(name, email, phone) {

}

/**
 * Saves the user in the current contacts array and sorts them by first name
 */
async function saveNewUserData() {
  id++
  const name = document.getElementById("name").value.trim()
  const firstname = name.split(' ');
  const lastname = name.split(' ');
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const password = document.getElementById("password").value.trim()
  if (checkEmailAddress(email)) {
    return
  }
  contacts.push({ id: id, name: firstname[0], lastname: lastname[(lastname.length - 1)], email: email, phone: phone, password: password})
  renderContacts()
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
 *Compares the email in the contacts array, if the email exists it returns a value,
  which can be intercepted in an if query to jump out of the function
 * @param {string} email - is required to compare the emails
 * @returns
 */
function checkEmailAddress(email) {
  for (let i = 0; i < contacts.length; i++) {
    const existingEmail = contacts[i].email;
    if (existingEmail === email) {
      return "This email is already in use"
    }
  }
}

function renderContacts() {
  sortArrayByUserName()
  const list = document.getElementById("contact-list");
  list.innerHTML = ""
  list.innerHTML += contactDataHTML(0)
  list.innerHTML += contactUserCardHtml(0)
  for (let i = 1; i < contacts.length - 1 ; i++) {
    if (contacts[i].name.charAt(0) != contacts[i -1].name.charAt(0)) {
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
  contacts.push({name: name.value, email: email.value, password: password.value});
  console.log(contacts);
}
