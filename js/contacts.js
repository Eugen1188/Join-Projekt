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

function editContact(id) {
  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const phoneValue = document.getElementById("phone").value;
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
