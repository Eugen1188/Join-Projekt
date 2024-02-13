let checkedContacts = [];
let initials = [];
let subtasks = [];
let taskStates = [];
let tempContacts = [];

function getInput() {
  let subtask = document.getElementById("subtask").value;
  return subtask;
}

function pushSubtask() {
  let subtask = getInput();
  let taskState = false;
  subtasks.push(subtask);
  taskStates.push(taskState);
  showSubtasks();
}

function showSubtasks() {
  let showSubtasks = document.getElementById("showSubtasks");
  showSubtasks.innerHTML = "";
  subtasks.forEach((subtask, index) => {
    showSubtasks.innerHTML += `
      <li id="subtask_${index}">${subtask} <a href="#" onclick="deleteSubtask(${index})">X</a> <a href="#" onclick="editSubtask(${index})">edit</a></li>
    `;
  });
}

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  showSubtasks();
}

function editSubtask(index) {
  let subtaskToEdit = document.getElementById(`subtask_${index}`);
  let subtaskText = subtasks[index];
  let inputField = `
  <input id="changedSubtaskValue" type="text" value="${subtaskText}" >`;
  let saveButton = `<a href="#" onclick="saveEditedSubtask(${index})">Save</a>`;
  subtaskToEdit.innerHTML = inputField + saveButton;
  subtaskToEdit.querySelector("input").focus();
}

function saveEditedSubtask(index) {
  let newSubtaskValue = document.getElementById("changedSubtaskValue").value;
  subtasks[index] = newSubtaskValue;
  showSubtasks();
}

//HTML Validierung funktioniert nicht da onsubmit false ist
// getCheckedContact() darf nur einmal ausgeführt werden, da dort auch die Initalien dran hängen
function validateForm() {
  // die if Bedingung ist notwendig, da im Fehlerfall die getCheckedContact() funktion erneut ausgeführt und somit dubletten erzeugt werden
  if (checkedContacts.length == 0) {
    getCheckedContact();
  }
  let submitButton = document.getElementById("submitButton"); // disabled = false // sollte man button deaktivieren wenn die inputs fehlerhaft sind ? ..;
  let lengthCheckedContacts = checkedContacts.length;
  let prioInputs = document.getElementsByName("priority");
  for (let i = 0; i < prioInputs.length; i++) {
    if (prioInputs[i].checked) {
      prio = prioInputs[i].value;
    }
  }
  if (lengthCheckedContacts < 1) {
    alert("select a Contact !");
  } else if (prio !== "low" && prio !== "medium" && prio !== "urgent") {
    alert("select a Prio Value !");
  } else addTask();
}

async function addTask() {
  //getCheckedContact();
  let id = allTasks.length;
  let title = document.getElementById("title");
  let taskDescription = document.getElementById("taskDescription");
  let date = document.getElementById("date");
  let prioInputs = document.getElementsByName("priority");
  let prio;
  // prio wird nicht mit let oder const deklariert, da prio eine globale Varibale sein muss uum außerhalb der schleife verfügbar zu sein. siehe task
  for (let i = 0; i < prioInputs.length; i++) {
    if (prioInputs[i].checked) {
      prio = prioInputs[i].value;
    }
  }
  let category = document.getElementById("category");
  let task = [
    {
      id: id,
      title: title.value,
      status: { inProgress: false, awaitFeedback: false, done: false }, // true oder false werden im Board gesetzt
      taskDescription: taskDescription.value,
      contacts: checkedContacts,
      initials: initials,
      createdAt: new Date().getTime(),
      date: date.value,
      prio: prio,
      category: category.value,
      subtask: { subtask: subtasks, taskstate: taskStates },
    },
  ];
  console.log(task);
  allTasks.push(task);
  //setItem("test_board", allTasks);
  //weiterleitung auf Board nach Taskerstellung
  //window.location.href = "http://127.0.0.1:5500/board.html";
}

async function getItemContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    let response = await fetch(url);
    if (response.ok) {
      const responseData = await response.json();
      return JSON.parse(responseData.data.value);
    }
  } catch (error) {
    console.error(error);
  }
}

async function initContacts() {
  tempContacts = await getItemContacts("contacts");
  getContact();
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
  tempContacts.forEach((contact) => {
    optionsHTML += `
    <div id="contactList" class="checkbox">
     <label for="${contact.name}">${contact.name} ${contact.lastname}</label>
     <input  type="checkbox" name="contacts" value="${
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
    .querySelectorAll('input[name="contacts"]:checked')
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
  let myArray = getItem("test_board");
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
