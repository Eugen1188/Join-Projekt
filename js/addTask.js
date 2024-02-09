let checkedContacts = [];
let initials = [];

async function addTask() {
  getCheckedContact();

  let title = document.getElementById("title");
  let taskDescription = document.getElementById("taskDescription");
  let date = document.getElementById("date");
  let prioInputs = document.getElementsByName("priority");
  for (let i = 0; i < prioInputs.length; i++) {
    if (prioInputs[i].checked) {
      prio = prioInputs[i].value;
    }
  }
  let category = document.getElementById("category");
  let subtask = document.getElementById("subtask");
  let task = [
    {
      title: title.value,
      status: { inProgress: false, awaitFeedback: false, done: false }, // true oder false werden im Board gesetzt
      taskDescription: taskDescription.value,
      contacts: checkedContacts,
      initials: initials,
      createdAt: new Date().getTime(),
      date: date.value,
      prio: prio,
      category: category.value,
      subtask: { subtask: subtask.value },
    },
  ];
  console.log(task);
  await allTasks.push(task);
  setItem("tasks_neu", allTasks); // muss als neues Objekt in das Hauptarray/JSON gepusht werden
}

/**
 * Lädt Kontakte in ein Dropdown-Menü.
 * @function getContact
 * @returns {void}
 */

function getContact() {
  /**
   * Das HTML-Element des Dropdown-Menüs, in das die Kontakte geladen werden sollen.
   * @type {HTMLElement}
   */
  let selectElement = document.getElementById("contact-values");
  selectElement.innerHTML = "";
  /**
   * Der HTML-String, der die Optionen für das Dropdown-Menü enthält.
   * @type {string}
   */
  let optionsHTML = "";
  // Durchläuft jedes Kontaktobjekt und erstellt eine Option für das Dropdown-Menü.
  contacts.forEach((contact) => {
    optionsHTML += `
    <div id="contactList" class="checkbox">
     <label for="${contact.name}">${contact.name} ${contact.lastname}</label>
     <input type="checkbox" name="contacts[]" value="${
       contact.name + " " + contact.lastname
     }" id="${contact.name}">
    </div>
      `;
  });
  // Fügt die erstellten Optionen dem Dropdown-Menü hinzu.
  selectElement.innerHTML = optionsHTML;
}

function getCheckedContact() {
  checkedContacts = [];
  document
    .querySelectorAll('input[name="contacts[]"]:checked')
    .forEach((checkbox) => {
      checkedContacts.push(checkbox.value);
    });
  getInitalias();
}

function showContacts() {
  let id = document.getElementById("contact-values");
  id.classList.toggle("d-none");
}

async function testfunc() {
  let myArray = getItem("tasks_neu");
  await myArray
    .then((result) => {
      allTasks = JSON.parse(result.data.value);
    })
    .catch((error) => {
      console.error("Ein Fehler ist aufgetreten:", error);
    });
}

function getInitalias() {
  checkedContacts.forEach((contact) => {
    // trennt den string bei " " in einzelne strings auf.
    const nameParts = contact.split(" ");
    // zwischenspeicher leerer String
    let initial = "";
    nameParts.forEach((part) => {
      // part[0] ist der erste Buchstabe des strings
      initial += part[0].toUpperCase();
    });
    initials.push(initial);
  });
}
