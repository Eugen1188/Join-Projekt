let contacts = [{
  id: 1,
  name: "Max",
  lastname: "Mustermann",
  email: "max@example.com",
  phone: "123-456-7890",
  initials: "MM",
},
{
  id: 2,
  name: "Anna",
  lastname: "Musterfrau",
  email: "anna@example.com",
  phone: "987-654-3210",
  initials: "AM",
},
{
  id: 3,
  name: "John",
  lastname: "Doe",
  email: "john@example.com",
  phone: "555-123-4567",
  initials: "JD",
},
{
  id: 4,
  name: "Jane",
  lastname: "Doe",
  email: "jane@example.com",
  phone: "555-987-6543",
  initials: "JD",
},
{
  id: 5,
  name: "Alice",
  lastname: "Smith",
  email: "alice@example.com",
  phone: "321-654-9870",
  initials: "AS",
},
{
  id: 6,
  name: "Bob",
  lastname: "Johnson",
  email: "bob@example.com",
  phone: "888-222-3333",
  initials: "BJ",
},
{
  id: 7,
  name: "Emily",
  lastname: "Davis",
  email: "emily@example.com",
  phone: "777-777-7777",
  initials: "ED",
},
{
  id: 8,
  name: "Michael",
  lastname: "Brown",
  email: "michael@example.com",
  phone: "666-666-6666",
  initials: "MB",
},
{
  id: 9,
  name: "Sarah",
  lastname: "Wilson",
  email: "sarah@example.com",
  phone: "444-444-4444",
  initials: "SW",
},
{
  id: 10,
  name: "David",
  lastname: "Lee",
  email: "david@example.com",
  phone: "222-888-9999",
  initials: "DL",
  }
];

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
        renderContacts()
        setItem("contacts", contacts)
        break;
      } else {
        return;
      }
    }
  }
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
    if (userId === contacts[i].id) {
      contacts.splice(1, i)
      renderContacts()
      setItem("contacts", contacts)
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
    id--
    return
  }
  userData.push({
    id: id,
    name: firstname[0],
    lastname: lastname[(lastname.length - 1)],
    email: email,
    phone: phone,
    password: password,
    initials: firstname.charAt(0) + lastname.charAt(0)
  })
  setItem("id", id)
  setItem("userData", userData)

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
    id--
    return
  }
  contacts.push({
    id: id,
    name: firstname[0],
    lastname: lastname[(lastname.length - 1)],
    email: email,
    phone: phone,
    initials: firstname.charAt(0) + lastname.charAt(0),
  })
  renderContacts()
  setItem("id", id)
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


function renderSingleContactOverview(id) {
  const singlContactDataContainer = document.getElementById("single-contact-data-container")
  singlContactDataContainer.innerHTML = "";
  singlContactDataContainer.innerHTML += singleContactOverview(id)
}

