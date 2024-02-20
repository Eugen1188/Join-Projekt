let contacts = [
  {
    id: 1,
    name: "Max",
    lastname: "Mustermann",
    email: "max@example.com",
    phone: "+495689876241",
    initials: "MM",
    circleColor: "user-color-one",
  },
  {
    id: 2,
    name: "Anna",
    lastname: "Musterfrau",
    email: "anna@example.com",
    phone: "+495689876242",
    initials: "AM",
    circleColor: "user-color-two",
  },
  {
    id: 3,
    name: "John",
    lastname: "Doe",
    email: "john@example.com",
    phone: "+495689876243",
    initials: "JD",
    circleColor: "user-color-three",
  },
  {
    id: 4,
    name: "Jane",
    lastname: "Doe",
    email: "jane@example.com",
    phone: "+495689876244",
    initials: "JD",
    circleColor: "user-color-four",
  },
  {
    id: 5,
    name: "Alice",
    lastname: "Smith",
    email: "alice@example.com",
    phone: "+495689876245",
    initials: "AS",
    circleColor: "user-color-five",
  },
  {
    id: 6,
    name: "Bob",
    lastname: "Johnson",
    email: "bob@example.com",
    phone: "+495689876246",
    initials: "BJ",
    circleColor: "user-color-six",
  },
  {
    id: 7,
    name: "Emily",
    lastname: "Davis",
    email: "emily@example.com",
    phone: "+495689876247",
    initials: "ED",
    circleColor: "user-color-seven",
  },
  {
    id: 8,
    name: "Michael",
    lastname: "Brown",
    email: "michael@example.com",
    phone: "+495689876248",
    initials: "MB",
    circleColor: "user-color-eight",
  },
  {
    id: 9,
    name: "Sarah",
    lastname: "Wilson",
    email: "sarah@example.com",
    phone: "+495639826249",
    initials: "SW",
    circleColor: "user-color-nine",
  },
  {
    id: 10,
    name: "David",
    lastname: "Lee",
    email: "david@example.com",
    phone: "+495689876250",
    initials: "DL",
    circleColor: "user-color-ten",
  },
];
let userData = [];
let sortedUsers;
let id = 11;
let lastActivePerson;

async function initContacts() {
  contacts = await getItemContacts("contacts");
  id = await getItemContacts("id");
  renderContacts();
}

/**
 *Updates the data of a person, only updates the data whose field is also filled in
 * @param {number} id - is needed to find the person to be updated
 * @returns {void} - returns nothing
 * */
async function editContact(userId) {
  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const phoneValue = document.getElementById("phone").value.trim();
  console.log(nameValue, emailValue, phoneValue);
  if (nameValue && emailValue && phoneValue) {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === userId) {
        let editName = nameValue.split(" ")
        contacts[i].name = editName[0];
        contacts[i].lastname = editName.slice(1).join(" ");
        contacts[i].email = emailValue;
        contacts[i].phone = phoneValue;
        renderContacts()
        setItem("contacts", contacts)
        break;
      }
    }
  } else {
    return
  }
}

/**If the code is adopted, replace getItem with getItemContacts
 * @param {string} key - is required to find the desired data
 * @returns {array} - returns the contacts array
 */
async function getItemContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const responseData = await response.json();
    return JSON.parse(responseData.data.value);
  } catch (error) {
    console.error(error);
  }
}

/** deletes a contact from the contact list
 * @param {number} id - is required to find the desired user
 */
async function deleteContact(id) {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    renderContacts();
    document.getElementById("single-contact-data-container").innerHTML = "";
    lastActivePerson = 0;
    setItem("contacts", contacts);
  }
}

/**
 * Saves the user in userData array and
 * sets the id to the next number
 * @returns {void} - returns nothing
 */
async function saveNewUserData() {
  const name = document.getElementById("name-reg").value.trim();
  const firstname = name.split(" ");
  const lastname = name.split(" ");
  const email = document.getElementById("email-reg").value.trim();
  const password = document.getElementById("password-reg").value.trim();
  const passwordRep = document.getElementById("rep-password-reg").value.trim();
  if (checkEmailAddress(email, userData) || password != passwordRep) {
    return;
  }
  userData.push({
    id: id,
    name: firstname[0],
    lastname: lastname[lastname.length - 1],
    email: email,
    password: password,
    initials: firstname[0].charAt(0).toUpperCase() + lastname[0].charAt(0),
  });
  id++;
  setItem("id", id);
  setItem("userData", userData);
}

/** adds a new contact to Contactlist and sets the id to the next number
 * @returns {void} - returns nothing
 */
async function addNewContactToContactlist() {
  let name = document.getElementById("name").value.toLowerCase().trim();
  let helper = name.split(" ");
  const firstname = helper[0];
  const lastname = helper[helper.length - 1];
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  if (checkEmailAddress(email, contacts)) {
    return;
  }
  if (name && email && phone) {
    contacts.push({
      id: id,
      name: firstCharToUpperCase(firstname),
      lastname: firstCharToUpperCase(lastname),
      email: email.toLowerCase(),
      phone: formatPhoneNumber(phone),
      initials:
        firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase(),
      circleColor: getRandomColor(),
    });
    renderContacts();
    renderCard("edit-card", "");
    renderAddContactSuccess(id);
    id++;
    setItem("id", id);
    setItem("contacts", contacts);
  }
}

/** sets the item in the local storage  */
function sortArrayByUserName() {
  sortedUsers = contacts.sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return result !== 0 ? result : a.lastname.localeCompare(b.lastname);
  });
}

/**
 * /**
 *Compares the email in the contacts array, if the email exists it returns a value,
  which can be intercepted in an if query to jump out of the function
 * @param {string} email - is required to compare the emails
 * @param {array} array - which array should be searched for the emails
 * @returns {string} - returns a string if the email is already in use
 */
function checkEmailAddress(email, array) {
  for (let i = 0; i < array.length; i++) {
    const existingEmail = array[i].email;
    if (existingEmail === email) {
      return "This email is already in use";
    }
  }
}

/**
 * renders the maps, always makes a capital letter when a new charAt(0) is reached
 */
function renderContacts() {
  sortArrayByUserName();
  const list = document.getElementById("contact-list");
  list.innerHTML = "";
  list.innerHTML += contactDataHTML(0);
  list.innerHTML += contactUserCardHtml(0);
  for (let i = 1; i < contacts.length; i++) {
    if (contacts[i].name.charAt(0) != contacts[i - 1].name.charAt(0)) {
      list.innerHTML += contactDataHTML(i);
      list.innerHTML += contactUserCardHtml(i);
    } else {
      list.innerHTML += contactUserCardHtml(i);
    }
  }
}

/**
 * Render a single person in a more detailed view
 * @param {number} id - is required to find the desired user
 */
function renderSingleContactOverview(id) {
  const singlContactDataContainer = document.getElementById(
    "single-contact-data-container"
  );
  setPersonToActive(id);
  singlContactDataContainer.innerHTML = "";
  const element = document.querySelector('.single-contact-data-container');
  rightSlideAnimation("single-contact-data-container", singleContactOverview(id));
}

/**
 *capitalizes the first letter
 * @param {String} name - User name
 * @returns {String} - returns the name in upper case
 */
function firstCharToUpperCase(name) {
  let toUpper = name.charAt(0).toUpperCase() + name.substring(1);
  return toUpper
}

/**
 *Sets all letters to lower case
 * @param {String} name - User name
 * @returns {String}  - returns the name in lower case
 */
function firstCharToLowerCase(name) {
  let toLower = name.toLowerCase()
  return toLower
}

/**
 *
 * @param {string} x -
 */
function closeRenderContactCardSlide() {
  clearFormValues("contacts-form");
  slideBackAnimation("edit-card", 200);
  setTimeout(() => {
    renderCard("edit-card", "");
  }, 450);
}

function renderCard(id, htmlContent) {
  const card = document.getElementById(id);
  card.innerHTML = "";
  rightSlideAnimation(id, htmlContent);
}

function renderAddNewContact() {
  renderCard("edit-card", contactsCardHTML("Add contact", "Tasks are better with a team!", "addNewContactToContactlist()"));
}

function renderEditContact(id) {
  renderCard("edit-card", contactsCardHTML("Edit contact", "", `editContact(${id})`));
}

/**
 * Sets the clicked card to active and colors it, if another card is clicked, the last card is reset to normal state
 * @param {Number} id - the id of the clicked card
 */
function setPersonToActive(id) {
  let activPerson = document.getElementById(`contact-data-${id}`)
  activPerson.classList.add("pointerEvents")
  if (lastActivePerson >= 0) {
    let lastPersconActive = document.getElementById(`contact-data-${lastActivePerson}`)
    lastPersconActive.classList.remove("set-contact-to-active")
    lastPersconActive.classList.remove("pointerEvents")

  }
  activPerson.classList.add("set-contact-to-active")
  lastActivePerson = id
}

function getRandomColor() {
  let number = Math.floor(Math.random() * 15) + 1;
  switch (number) {
    case 1:
      return "user-color-one";
    case 2:
      return "user-color-two";
    case 3:
      return "user-color-three";
    case 4:
      return "user-color-four";
    case 5:
      return "user-color-five";
    case 6:
      return "user-color-six";
    case 7:
      return "user-color-seven";
    case 8:
      return "user-color-eight";
    case 9:
      return "user-color-nine";
    case 10:
      return "user-color-ten";
    case 11:
      return "user-color-eleven";
    case 12:
      return "user-color-twelve";
    case 13:
      return "user-color-thirteen";
    case 14:
      return "user-color-fourteen";
    case 15:
      return "user-color-fifteen";
    default:
      return "user-color-one";
  }
}

/**
 * Sets the first letter of the name to upper case
 * @param {String} name - User name
 * @returns {void} - returns nothing
 */
function firstCharToUpperCase(name) {
  let toUpper = name.charAt(0).toUpperCase() + name.substring(1);
  return toUpper;
}

/**
 * Sets all letters to lower case
 * @param {String} name - User name
 * @returns {void} - returns nothing
 */
function firstCharToLowerCase(name) {
  let toLowerCase = name.toLowerCase();
  return toLowerCase;
}

/**
 * Sets the clicked card to active and colors it, if another card is clicked, the last card is reset to normal state
 * @param {Number} id - the id of the clicked card
 */
function setPersonToActive(id) {
  let activPerson = document.getElementById(`contact-data-${id}`);
  activPerson.classList.add("pointerEvents");
  if (lastActivePerson >= 0) {
    let lastPersconActive = document.getElementById(
      `contact-data-${lastActivePerson}`
    );
    lastPersconActive.classList.remove("set-contact-to-active");
    lastPersconActive.classList.remove("pointerEvents");
  }
  activPerson.classList.add("set-contact-to-active");
  lastActivePerson = id;
}

/**
 * Formats a phone number by removing any non-numeric characters and adding a country code if missing.
 * @param {string} phone - The phone number to format.
 * @returns {string} - The formatted phone number.
 */
function formatPhoneNumber(phoneNumber) {
  let cleaned = ('' + phoneNumber).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{2})(\d{4})(\d{3})(\d{2})(\d{1})$/);
  if (match) {
    let countryCode = match[1] === '0' ? '+49' : '+' + match[1];
    return countryCode + ' ' + match[2] + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];
  }
  return phoneNumber;
}

/**
 *  Clears the form values
 * @param {String} formId - id of the form
 */
function clearFormValues(formId) {
  const form = document.getElementById(formId);
  form.reset();
}

/**
 * Right slide in animation
 * @param {String} id - id of the element
 * @param {HTMLElement} htmlTemplate -  html template
 */
function rightSlideAnimation(id, htmlTemplate, setTimeoutValue = 200) {
  let element = document.getElementById(id);
  element.innerHTML = "";
  element.style.marginLeft = '1000px';
  element.style.transition = 'margin-left .4s ease';
  setTimeout(() => {
    element.innerHTML += htmlTemplate;
    element.style.marginLeft = "0";
  }, setTimeoutValue);
}

function slideBackAnimation(id, setTimeoutValue) {
  let element = document.getElementById(id);
  element.style.transition = 'margin-left .4s ease';
  setTimeout(() => {
    element.style.marginLeft = '2000px';
  }, setTimeoutValue);
}

function renderAddContactSuccess(id) {
  let container = document.getElementById("single-contact-data-container")
  let indexOfId = contacts.findIndex(contact => contact.id === id);
  container.innerHTML = ""
  container.innerHTML += singleContactOverview(indexOfId)
  let succesfully = document.getElementById("contact-success");
  rightSlideAnimation("contact-success", addContactSuccessHTML(), 600);
  slideBackAnimation("contact-success",1500);
  succesfully.innerHTML = "";
}
