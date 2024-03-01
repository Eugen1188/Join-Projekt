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
  logedInUser = await getItemContacts("logedInUser");
  renderContacts();
  renderLogedUser()
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
  if (nameValue && emailValue && phoneValue) {
    let inedOfContact = contacts.findIndex(contact => contact.id === userId);
    if (inedOfContact != -1) {
      let editName = nameValue.split(" ")
      contacts[inedOfContact].name = editName[0];
      contacts[inedOfContact].lastname = editName.slice(1).join(" ");
      contacts[inedOfContact].email = emailValue;
      contacts[inedOfContact].phone = phoneValue;
      renderContacts()
      setItem("contacts", contacts)
    }
  } else {
    return
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
    renderContactListAfterDeleteMobile()
    setItem("contacts", contacts);
  }
}

/**
 * Saves the user in userData array and
 * sets the id to the next number
 * @returns {void} - returns nothing
 */
async function saveNewUserData() {
  id = await getItemContacts("id");
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
    initials: firstname[0].charAt(0).toUpperCase() + lastname[lastname.length - 1].charAt(0),
  });
  id++;
  console.log(id);
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

function mobileSingleContactOverview(id) {
  const singlContactDataContainer = document.getElementById("contact-list");
  setPersonToActive(id);
  singlContactDataContainer.innerHTML = "";
  singlContactDataContainer.innerHTML += contactsWelcomHTML();
  singlContactDataContainer.innerHTML += singleContactOverviewHTML(id);
  singlContactDataContainer.innerHTML += goBackToContactlistHTML();
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
function rightSlideAnimation(id, htmlTemplate) {
  let element = document.getElementById(id);
  element.innerHTML = "";
  element.classList.add("right-slide-animation");
  element.innerHTML += htmlTemplate;
  setTimeout(() => {
    element.classList.remove("right-slide-animation");
  }, 450);
}

/**
 *  Right slide out animation
 * @param {Number} id - id of the element
 * @param {Number} setTimeoutValue - time to wait before the animation starts
 */
function slideBackAnimation(id) {
  let element = document.getElementById(id);
  element.classList.add("slide-back-animation");
  setTimeout(() => {
    element.classList.remove("slide-back-animation");
  }, 550);
}

function addBtnMobileOrDesktop() {
    return renderAddNewContact();
}

const goBackToContactListMobile = () => {
  renderContacts();
  setMobileAddBtnToDefault()
  let element = document.getElementById('renderOrDelete');
  if (element && element.hasChildNodes()) {
    element.innerHTML = '';
  }
}

function setMobileAddBtnToDefault() {
  let addOrEddit = document.getElementById("add-or-eddit");
  addOrEddit.innerHTML = "";
  addOrEddit.innerHTML = addNewContactMobileHTML();
}

/**
 * Sets the gray opacity background color for an element with the id "opasity".
 */
function grayOpasityBackgroundColor() {
  let opasity = document.getElementById("opasity");
  opasity.classList.add("opasity");
}


/**
 * Represents the element with the ID "single-contact-data-container".
 * @type {HTMLElement}
 */
window.addEventListener('resize', function () {
  if (window.innerWidth <= 1022) {
    let checkElement = document.getElementById("single-contact-data-container")
    if (checkElement && checkElement.childNodes.length > 0) {
      checkElement.innerHTML = '';
      renderContacts()
    }
  }
});

function makeBigCircleSmaller() {
  let bigCircle = document.getElementById("big-circle");
  bigCircle.classList.add("mobile-big-circle");
}
