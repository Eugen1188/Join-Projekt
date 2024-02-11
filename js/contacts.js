let contacts = [
  {
    id: 1,
    name: "Werner Müller",
    email: "werner@irgendwas.com",
    phone: "0461669548",
  },
  {
    id: 2,
    name: "Peter Hansen",
    email: "perter@gmx.de",
    phone: "016215415742",
  },
  {
    id: 3,
    name: "Sabine Schmidt",
    email: "sabine@example.com",
    phone: "03012345678",
  },
  {
    id: 4,
    name: "Michael Meier",
    email: "michael@example.com",
    phone: "017612345678",
  },
  {
    id: 5,
    name: "Lisa Müller",
    email: "lisa@example.com",
    phone: "049157865432",
  },
  {
    id: 6,
    name: "Thomas Schulz",
    email: "thomas@example.com",
    phone: "071123456789",
  },
  {
    id: 7,
    name: "Anna Fischer",
    email: "anna@example.com",
    phone: "020112345678",
  },
  {
    id: 8,
    name: "Stefan Wagner",
    email: "stefan@example.com",
    phone: "091123456789",
  },
  {
    id: 9,
    name: "Julia Klein",
    email: "julia@example.com",
    phone: "022156789012",
  },
  {
    id: 10,
    name: "Andreas Schneider",
    email: "andreas@example.com",
    phone: "015112345678",
  }
];

let id = 10;

// currently sorted by first name only, will be changed soon
function sortArrayByFirstname() {
  contacts.sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return result;
  })
}


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


async function deleteContact(index) {

}

function renderContacts() {

}

function checkValues(name, email, phone) {

}

/**
 * Saves the user in the current contacts array and sorts them by first name
 */
async function saveNewUserData() {
  id++
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  contacts.push({ id: id, name: name, email: email, phone: phone })
  sortArrayByFirstname()

}
