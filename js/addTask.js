let checkedContacts = [];
let subtasks = [];
let finalContactData = [];
let contactName = [];
let initials = [];
let circleColors = [];
let taskStates = [];
let tempContacts = [];
let contactIds = [];

document.addEventListener("DOMContentLoaded", function () {
  let low = document.getElementById("low");
  let medium = document.getElementById("medium");
  let urgent = document.getElementById("urgent");
  low.addEventListener("click", handleClick);
  low.addEventListener("click", changeIconColor);
  medium.addEventListener("click", handleClick);
  medium.addEventListener("click", changeIconColor);
  urgent.addEventListener("click", handleClick);
  urgent.addEventListener("click", changeIconColor);
});

function handleClick(event) {
  let priority = event.target.value;

  document.documentElement.style.setProperty(
    "--prio-button-selected",
    getButtonColor(priority)
  );
}

function getButtonColor(priority) {
  if (priority === "low") {
    return "#7AE229";
  } else if (priority === "medium") {
    return "#FFA800";
  } else if (priority === "urgent") {
    return "#FF3D00";
  } else {
    return "white";
  }
}

function changeIconColor(event) {
  let priorityIcon = event.target.value;
  let urgentIcon = document.getElementById("urgent-icon");
  let mediumIcon = document.getElementById("medium-icon");
  let lowIcon = document.getElementById("low-icon");
  let icons = [urgentIcon, mediumIcon, lowIcon];
  icons.forEach((icon) => {
    icon.classList.remove("fill-btn-white");
  });
  if (priorityIcon == "urgent") {
    urgentIcon.classList.add("fill-btn-white");
  } else if (priorityIcon == "medium") {
    mediumIcon.classList.add("fill-btn-white");
  } else if (priorityIcon == "low") {
    lowIcon.classList.add("fill-btn-white");
  }
}

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
  getCheckedContact();
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
      contactDataAsArray: finalContactData,
      contactIds: contactIds,
      status: { inProgress: false, awaitFeedback: false, done: false }, // true oder false werden im Board gesetzt
      taskDescription: taskDescription.value,
      contacts: contactName,
      initials: initials,
      circleColor: circleColors,
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

function getContact() {
  let selectElement = document.getElementById("contact-values");
  selectElement.innerHTML = "";
  let optionsHTML = "";
  tempContacts.forEach((contact, index) => {
    optionsHTML += `
      <div id="contact_${index}" onclick="getClickedContact(${index},${contact.id})" class="contact-list-name-container pointer">
  <div class="contact-list-name-initials">
    <div  class="contact-list-circle-element ${contact.circleColor}">
      <span>${contact.initials}</span>
    </div>
    <div class="contact-list-name-element">
      <span>${contact.name}</span>
      <span>${contact.lastname}</span>
    </div>
  </div>
  <div id="checkboxIcon_${index}" class="contact-list-checkbox-icon">
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.38818"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="#2A3647"
        stroke-width="2"
      />
    </svg>
  </div>
</div>
      `;
  });
  selectElement.innerHTML = optionsHTML;
}

function getClickedContact(index, contactId) {
  let iconToChange = document.getElementById(`checkboxIcon_${index}`);
  let isChecked = checkedContacts.includes(contactId);
  if (isChecked) {
    let contactIndex = checkedContacts.indexOf(contactId);
    if (contactIndex !== -1) {
      checkedContacts.splice(contactIndex, 1);
    }
    iconToChange.innerHTML = `
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4.38818"
          y="4"
          width="16"
          height="16"
          rx="3"
          stroke="#2A3647"
          stroke-width="2"
        />
      </svg>
    `;
  } else {
    checkedContacts.push(contactId);
    iconToChange.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12L12 16L20 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
}

function getCheckedContact() {
  checkedContacts.forEach((contactId) => {
    tempContacts.forEach((contact) => {
      if (contactId === contact.id) {
        contactName.push(contact.name + " " + contact.lastname);
        initials.push(contact.initials);
        circleColors.push(contact.circleColor);
        contactIds.push(contact.id);
        finalContactData.push({
          id: contact.id,
          name: contact.name,
          lastname: contact.lastname,
          initials: contact.initials,
          circleColor: contact.circleColor,
        });
      }
    });
  });
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
