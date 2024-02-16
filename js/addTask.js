let checkedContacts = [];
let subtasks = [];
let finalContactData = [];
let contactName = [];
let initials = [];
let circleColors = [];
let taskStates = [];
let tempContacts = [];
let contactIds = [];

function handleClick(value) {
  let priority = value;
  document.documentElement.style.setProperty("--prio-button-selected", getButtonColor(priority));
}

function invertSvgFills(value) {
  let priorityIcon = value;
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
    <div>
  <li onmouseover="mouseIn(${index})" onmouseout="mouseOut(${index})" id="subtask_${index}" class="subtask-container">
    ${subtask}
    <div id="subtask-icon-section_${index}" class="d-none">
      <svg width="19" height="19" onclick="editSubtask(${index})" class="pointer" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.14453 17H3.54453L12.1695 8.375L10.7695 6.975L2.14453 15.6V17ZM16.4445 6.925L12.1945 2.725L13.5945 1.325C13.9779 0.941667 14.4487 0.75 15.007 0.75C15.5654 0.75 16.0362 0.941667 16.4195 1.325L17.8195 2.725C18.2029 3.10833 18.4029 3.57083 18.4195 4.1125C18.4362 4.65417 18.2529 5.11667 17.8695 5.5L16.4445 6.925ZM14.9945 8.4L4.39453 19H0.144531V14.75L10.7445 4.15L14.9945 8.4Z" fill="#2A3647" />
      </svg>
      <svg onclick="deleteSubtask(${index})" class="pointer" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_75601_14777" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
          <rect x="0.144531" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_75601_14777)">
          <path
            d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z"
            fill="#2A3647"
          />
        </g>
      </svg>
    </div>
  </li>
</div>
      `;
  });
}

function mouseIn(index) {
  let selectedSubtask = document.getElementById(`subtask_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  selectedSubtask.classList.add("subtask-selected");
  if (iconSection) {
    iconSection.classList.remove("d-none");
  }
}

function mouseOut(index) {
  let selectedSubtask = document.getElementById(`subtask_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  selectedSubtask.classList.remove("subtask-selected");
  if (iconSection) {
    iconSection.classList.add("d-none");
  }
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
  setItem("test_board", allTasks);
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
  getAllContacts();
}

function getAllContacts() {
  displayContacts(tempContacts);
}

function displayContacts(contacts) {
  let selectElement = document.getElementById("contact-values");
  selectElement.innerHTML = "";
  let optionsHTML = "";
  contacts.forEach((contact, index) => {
    optionsHTML += generateContactHTML(contact, index);
  });
  selectElement.innerHTML = optionsHTML;
}

function displayFilteredContacts(filteredContacts) {
  displayContacts(filteredContacts);
}

function getClickedContact(index, contactId) {
  let iconToChange = document.getElementById(`checkboxIcon_${index}`);
  let contactCard = document.getElementById(`contact_${index}`);
  let checkBoxIconColor = document.getElementById(`checkboxIcon_${index}`);
  let isChecked = checkedContacts.includes(contactId);
  if (isChecked) {
    let contactIndex = checkedContacts.indexOf(contactId);
    if (contactIndex !== -1) {
      checkedContacts.splice(contactIndex, 1);
    }
    iconToChange.innerHTML = renderBoxIcon();
    contactCard.classList.remove("active");
    checkBoxIconColor.classList.remove("stroke-wht");
  } else {
    checkedContacts.push(contactId);
    iconToChange.innerHTML = renderCheckedIcon();
    contactCard.classList.add("active");
    checkBoxIconColor.classList.add("stroke-wht");
  }
}

function filterContacts() {
  // Input-Wert abrufen
  let filterValue = document.getElementById("contactAssignInput").value.trim().toUpperCase();
  // Wenn das Eingabefeld leer ist, getAllContacts aufrufen, um alle Kontakte anzuzeigen
  if (filterValue === "") {
    getAllContacts();
    return;
  }
  // Neue Liste für gefilterte Kontakte erstellen
  let filteredContacts = tempContacts.filter((contact) => {
    // Den Filter auf Namen anwenden
    let fullName = `${contact.name.toUpperCase()}`;
    return fullName.includes(filterValue);
  });
  // Neue Kontakte als Liste anzeigen
  displayFilteredContacts(filteredContacts);
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
  let arrow = document.getElementById("arrowContactInput");
  let id = document.getElementById("contact-values");
  id.classList.toggle("d-none");
  arrow.classList.toggle("rotate-180");
}

function renderBoxIcon() {
  return `
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2" />
</svg>
    `;
}

function renderCheckedIcon() {
  return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12L12 16L20 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
}

function generateContactHTML(contact, index) {
  return `
  <div id="contact_${index}" onclick="getClickedContact(${index},${contact.id})" class="contact-list-name-container pointer">
  <div class="contact-list-name-initials">
    <div class="initials-circle ${contact.circleColor}">
      <span>${contact.initials}</span>
    </div>
    <div class="contact-list-name-element">
      <span>${contact.name}</span>
      <span>${contact.lastname}</span>
    </div>
  </div>
  <div id="checkboxIcon_${index}" class="contact-list-checkbox-icon">
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2" />
    </svg>
  </div>
</div>
  `;
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
