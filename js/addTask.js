let checkedContacts = [];
let subtasks = [];
let finalContactData = [];
let contactName = [];
let initials = [];
let circleColors = [];
let taskStates = [];
let tempContacts = [];
let contactIds = [];

/**
 * Retrieves contacts associated with a specified key from a storage endpoint.
 * @async
 * @function getItemContacts
 * @param {string} key - The key associated with the contacts to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of contacts.
 * @throws {Error} Throws an error if there is a problem with the retrieval process.
 */

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

/**
 * Displays a list of contacts in a select element on the DOM.
 * @function displayContacts
 * @param {Array} contacts - An array of contacts to display.
 */

function displayContacts(contacts) {
  checkedContacts = [];
  let selectElement = document.getElementById("contact-values");
  selectElement.innerHTML = "";
  let optionsHTML = "";
  contacts.forEach((contact, index) => {
    optionsHTML += generateContactHTML(contact, index);
  });
  selectElement.innerHTML = optionsHTML;
}

/**
 * Toggles the visibility of a list of contacts.
 * @function showContacts
 */

function showContacts() {
  let arrow = document.getElementById("arrowContactInput");
  let id = document.getElementById("contact-values");
  id.classList.toggle("d-none");
  arrow.classList.toggle("rotate-180");
}

/**
 * Retrieves information about a clicked contact and updates its visual representation.
 * @function getClickedContact
 * @param {number} index - The index of the clicked contact.
 * @param {string} contactId - The ID of the clicked contact.
 */

function getClickedContact(index, contactId) {
  let iconToChange = document.getElementById(`checkboxIcon_${index}`);
  let contactCard = document.getElementById(`contact_${index}`);
  let checkBoxIconColor = document.getElementById(`checkboxIcon_${index}`);
  let isChecked = checkedContacts.includes(contactId);
  checkClickedContact(iconToChange, contactCard, checkBoxIconColor, isChecked, index, contactId);
}

/**
 * Updates the visual representation of a clicked contact based on its current state.
 * @function checkClickedContact
 * @param {HTMLElement} iconToChange - The checkbox icon element to be updated.
 * @param {HTMLElement} contactCard - The contact card element associated with the clicked contact.
 * @param {HTMLElement} checkBoxIconColor - The checkbox icon color element associated with the clicked contact.
 * @param {boolean} isChecked - Indicates whether the clicked contact is already checked.
 * @param {number} index - The index of the clicked contact.
 * @param {string} contactId - The ID of the clicked contact.
 */

function checkClickedContact(iconToChange, contactCard, checkBoxIconColor, isChecked, index, contactId) {
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

/**
 * Filters and displays contacts based on the input value.
 * @function filterContacts
 */

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

function displayFilteredContacts(filteredContacts) {
  displayContacts(filteredContacts);
}

/**
 * Renders circles representing chosen contacts and displays them in the designated container.
 * @function showChoosenContactsCircle
 */

function showChoosenContactsCircle() {
  let container = document.getElementById("choosenContacts");
  container.innerHTML = "";
  checkedContacts.forEach((checkedContactId) => {
    tempContacts.forEach((contact) => {
      if (checkedContactId === contact.id) {
        container.innerHTML += `
        <div class="initials-circle ${contact.circleColor}">
        ${contact.initials}
        </div>
        
        `;
      }
    });
  });
}

/**
 * Retrieves information about checked contacts and stores it in various arrays.
 * @function getCheckedContact
 */

function getCheckedContact() {
  initials = [];
  contactName = [];
  circleColors = [];
  contactDataAsArray = [];
  contactIds = [];
  finalContactData = [];
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

/**
 * Handles click events and updates the priority button color based on the provided value.
 * @function handleClick
 * @param {string} value - The value representing the priority.
 */

function handleClick(value) {
  let priority = value;
  document.documentElement.style.setProperty("--prio-button-selected", getButtonColor(priority));
}

/**
 * Retrieves the color associated with the specified priority.
 * @function getButtonColor
 * @param {string} priority - The priority value.
 * @returns {string} The color associated with the specified priority.
 */

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

/**
 * Inverts SVG fills based on the provided priority value.
 * @function invertSvgFills
 * @param {string} value - The value representing the priority.
 */

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

/**
 * Retrieves the value of an input field with the ID "subtask".
 * @function getInput
 * @returns {string} The value of the input field.
 */

function getInput() {
  let subtask = document.getElementById("subtask").value;
  return subtask;
}

/**
 * Pushes a subtask into the subtasks array, updates task states, displays subtasks, and renders a plus icon.
 * @function pushSubtask
 */

function pushSubtask() {
  let subTaskSvgContainer = document.getElementById("subTaskSvgContainer");
  let subtask = getInput();
  let taskState = false;
  if (subtask == "") {
    alert("Please enter a value");
  } else {
    subtasks.push(subtask);
    taskStates.push(taskState);
    showSubtasks();
    subTaskSvgContainer.innerHTML = renderSubtaskPlusIcon();
    clearSubtaskInput();
  }
}

/**
 * Displays subtasks in the designated container.
 * @function showSubtasks
 */

function showSubtasks() {
  let showSubtasks = document.getElementById("showSubtasks");
  showSubtasks.innerHTML = "";
  subtasks.forEach((subtask, index) => {
    showSubtasks.innerHTML += renderSubtaskItem(subtask, index);
  });
}

/**
 * Handles mouse hover event to display additional options for a subtask.
 * @function mouseIn
 * @param {number} index - The index of the subtask.
 */

function mouseIn(index) {
  let selectedSubtask = document.getElementById(`subtaskListContainer_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  let getUlElement = document.getElementById(`subTaskItemUl_${index}`);
  selectedSubtask.classList.add("subtask-selected");
  if (iconSection) {
    iconSection.classList.remove("d-none");
  }
}

/**
 * Handles mouse out event to hide additional options for a subtask.
 * @function mouseOut
 * @param {number} index - The index of the subtask.
 */

function mouseOut(index) {
  let selectedSubtask = document.getElementById(`subtaskListContainer_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  selectedSubtask.classList.remove("subtask-selected");
  if (iconSection) {
    iconSection.classList.add("d-none");
  }
}

/**
 * Prepares a subtask for editing by replacing it with an input field.
 * @function editSubtask
 * @param {number} index - The index of the subtask to be edited.
 */

function editSubtask(index) {
  let subtaskToEdit = document.getElementById(`subtask_${index}`);
  let iconSection = document.getElementById(`subtask-icon-section_${index}`);
  let subtaskText = subtasks[index];
  let inputField = ` <input id="changedSubtaskValue" type="text" value="${subtaskText}" >`;
  let getUlElement = document.getElementById(`subTaskItemUl_${index}`);
  iconSection.innerHTML = renderEditSubtaskIcons(index);
  getUlElement.classList.add("edit-subtask-field");
  subtaskToEdit.innerHTML = inputField;
  subtaskToEdit.querySelector("input").focus();
}

/**
 * Saves the edited value of a subtask and updates the display.
 * @function saveEditedSubtask
 * @param {number} index - The index of the subtask being edited.
 */

function saveEditedSubtask(index) {
  let newSubtaskValue = document.getElementById("changedSubtaskValue").value;
  if (newSubtaskValue == "") {
    alert("Please enter a value");
  } else {
    subtasks[index] = newSubtaskValue;
    showSubtasks();
  }
}

/**
 * Clears the input field for entering subtasks.
 * @function clearSubtaskInput
 * @returns {string} An empty string.
 */

function clearSubtaskInput() {
  let subtask = (document.getElementById("subtask").value = "");
  return subtask;
}

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  taskStates.splice(index, 1);
  showSubtasks();
}

function changeSubtaskInputIcons() {
  let subTaskSvgContainer = document.getElementById("subTaskSvgContainer");
  subTaskSvgContainer.innerHTML = renderSubtaskInputIcons();
}

function subtaskPlusIconSetFocus() {
  let input = document.getElementById("subtask");
  input.click();
  input.focus();
}

function checkTitleInputField() {
  let inputTitleFieldValue = document.getElementById("title").value;
  let inputTitleField = document.getElementById("title");
  let inputReqiuredSpanTitle = document.getElementById("inputReqiuredSpanTitle");
  if (inputTitleFieldValue === "") {
    inputTitleField.classList.add("input-focus-required");
    inputReqiuredSpanTitle.classList.remove("d-none");
  } else {
    inputTitleField.classList.remove("input-focus-required");
    inputReqiuredSpanTitle.classList.add("d-none");
  }
}

// Datum Konvertierung
function updateDateFieldValue() {
  let datefieldValue = document.getElementById("dateNormal").value;
  // Das Datum im Format "yyyy-mm-dd" wird in das Format "dd/mm/yyyy" umgewandelt
  let formattedDate = datefieldValue.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3/$2/$1");
  document.getElementById("date").value = formattedDate;
  checkDateInputField();
}

function checkDateInputField() {
  formatDateInput();
  let inputDateFieldValue = document.getElementById("date").value;
  let inputDateField = document.getElementById("date");
  let inputReqiuredSpanDate = document.getElementById("inputReqiuredSpanDate");
  if (inputDateFieldValue === "") {
    inputDateField.classList.add("input-focus-required");
    inputReqiuredSpanDate.classList.remove("d-none");
  } else {
    inputDateField.classList.remove("input-focus-required");
    inputReqiuredSpanDate.classList.add("d-none");
  }
}

function formatDateInput() {
  let input = document.getElementById("date");
  // Entferne alle Zeichen außer Zahlen und Schrägstriche (/)
  let formattedValue = input.value.replace(/[^\d/]/g, "");
  // prüft, ob bereits ein Schrägstrich (/) am dritten Zeichen der Eingabe vorhanden ist. Wenn nicht, wird ein Schrägstrich an der Position eingefügt.
  if (formattedValue.length > 2 && formattedValue.charAt(2) !== "/") {
    formattedValue = formattedValue.substring(0, 2) + "/" + formattedValue.substring(2);
  }
  // prüft, ob bereits ein Schrägstrich (/) am sechsten Zeichen der Eingabe vorhanden ist. Wenn nicht, wird ein Schrägstrich an der Position eingefügt.
  if (formattedValue.length > 5 && formattedValue.charAt(5) !== "/") {
    formattedValue = formattedValue.substring(0, 5) + "/" + formattedValue.substring(5);
  }
  // Setze den neuen formatierten Wert in das Eingabefeld
  input.value = formattedValue;
}

// Datum Konvertierung ENDE

//checken ob die Required Inputs gefüllt sind, wenn nicht alle erforderlichen Felder gefüllt sind, bleibt der submitButton disabled
function getRequiredFormInputs() {
  let titleValue = document.getElementById("title").value;
  let inputDateFieldValue = document.getElementById("date").value;
  let categoryValue = document.getElementById("category").value;
  let submitButton = document.getElementById("submitButton");
  setSubmitButtonStateAndStyle(titleValue, inputDateFieldValue, categoryValue, submitButton);
}

function setSubmitButtonStateAndStyle(titleValue, inputDateFieldValue, categoryValue, submitButton) {
  if (titleValue != "" && inputDateFieldValue != "" && categoryValue != "") {
    submitButton.disabled = false;
    submitButton.classList.add("btn-bg", "btn-color-wht", "pointer");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("btn-bg", "btn-color-wht", "pointer");
  }
}
// check ENDE

function validateForm(index) {
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
  } else addTask(index);
}

/**
 * async function addTask(index) {
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
      status: currentTaskState, // true oder false werden im Board gesetzt
      taskDescription: taskDescription.value,
      contacts: contactName,
      initials: initials,
      circleColor: circleColors,
      createdAt: new Date().getTime(),
      date: date.value,
      prio: prio,
      category: category.value,
      subtask: { subtask: subtasks, taskstate: generateTaskState(index) },
    },
  ];
  subtasks = [];
  if (index !== undefined) {
    let categoryPlaceholder = allTasks[index][0].category;
    let idPlaceholder = allTasks[index][0].id;
    let statusPlaceholder = allTasks[index][0].status;
    allTasks[index] = task;
    allTasks[index][0].id = idPlaceholder;
    allTasks[index][0].status = statusPlaceholder;
    allTasks[index][0].category = categoryPlaceholder;
    await setItem("test_board", allTasks);
    initBoard();
  } else {
    console.log(task);
    allTasks.push(task);
    await setItem("test_board", allTasks);
  }
  clearCurrentTask();
  if (window.location.href == "http://127.0.0.1:5500/board.html" && index == undefined) {
    closeOverlayAddTask(true);
  }
  if (window.location.href == "http://127.0.0.1:5500/add-task.html") {
    translateTaskAddedElementAndRedirect();
  }
}
 * 
 */

async function addTask(index) {
  let id = allTasks.length;
  let title = document.getElementById("title");
  let taskDescription = document.getElementById("taskDescription");
  let date = document.getElementById("date");
  let prio = getPriorityValue();
  let category = document.getElementById("category");
  let task = createTaskObject(id, title.value, taskDescription.value, date.value, prio, category.value, index);
  if (index !== undefined) {
    updateExistingTask(index, task);
  } else {
    addNewTask(task);
  }
  clearCurrentTask();
  handleLocation(index);
}

function getPriorityValue() {
  let prioInputs = document.getElementsByName("priority");
  let prio;
  for (let i = 0; i < prioInputs.length; i++) {
    if (prioInputs[i].checked) {
      prio = prioInputs[i].value;
    }
  }
  return prio;
}

function createTaskObject(id, title, description, date, prio, category, index) {
  return [
    {
      id: id,
      title: title,
      contactDataAsArray: finalContactData,
      contactIds: contactIds,
      status: currentTaskState,
      taskDescription: description,
      contacts: contactName,
      initials: initials,
      circleColor: circleColors,
      createdAt: new Date().getTime(),
      date: date,
      prio: prio,
      category: category,
      subtask: { subtask: subtasks, taskstate: generateTaskState(index) },
    },
  ];
}

async function updateExistingTask(index, task) {
  let categoryPlaceholder = allTasks[index][0].category;
  let idPlaceholder = allTasks[index][0].id;
  let statusPlaceholder = allTasks[index][0].status;
  allTasks[index] = task;
  allTasks[index][0].id = idPlaceholder;
  allTasks[index][0].status = statusPlaceholder;
  allTasks[index][0].category = categoryPlaceholder;
  await setItem("test_board", allTasks);
  initBoard();
}

async function addNewTask(task) {
  allTasks.push(task);
  await setItem("test_board", allTasks);
}

function handleLocation(index) {
  if (window.location.href == "http://127.0.0.1:5500/board.html" && index == undefined) {
    closeOverlayAddTask(true);
  }
  if (window.location.href == "http://127.0.0.1:5500/add-task.html") {
    translateTaskAddedElementAndRedirect();
  }
}

function generateTaskState(index) {
  let taskstateArray = [];
  for (let i = 0; i < subtasks.length; i++) {
    const element = false;
    if (index != undefined) {
      const value = allTasks[index][0].subtask.taskstate[i];
      if (value === true) {
        taskstateArray.push(value);
      } else {
        taskstateArray.push(element);
      }
    } else {
      taskstateArray.push(element);
    }
  }
  return taskstateArray;
}

function clearFieldInputs() {
  location.reload();
}

function translateTaskAddedElementAndRedirect() {
  let element = document.getElementById("taskAdded");
  element.classList.remove("d-none");
  element.style.transform = "translateY(387px)";
  setTimeout(() => {
    window.location.href = "./board.html";
  }, 2000);
}

function renderSubtaskInputIcons() {
  return `
    <div class="changed-input-icons">
  <div class="icon">
    <svg onclick="clearSubtaskInput()" class="pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.14434 8.40005L2.24434 13.3C2.061 13.4834 1.82767 13.575 1.54434 13.575C1.261 13.575 1.02767 13.4834 0.844336 13.3C0.661003 13.1167 0.569336 12.8834 0.569336 12.6C0.569336 12.3167 0.661003 12.0834 0.844336 11.9L5.74434 7.00005L0.844336 2.10005C0.661003 1.91672 0.569336 1.68338 0.569336 1.40005C0.569336 1.11672 0.661003 0.883382 0.844336 0.700049C1.02767 0.516715 1.261 0.425049 1.54434 0.425049C1.82767 0.425049 2.061 0.516715 2.24434 0.700049L7.14434 5.60005L12.0443 0.700049C12.2277 0.516715 12.461 0.425049 12.7443 0.425049C13.0277 0.425049 13.261 0.516715 13.4443 0.700049C13.6277 0.883382 13.7193 1.11672 13.7193 1.40005C13.7193 1.68338 13.6277 1.91672 13.4443 2.10005L8.54434 7.00005L13.4443 11.9C13.6277 12.0834 13.7193 12.3167 13.7193 12.6C13.7193 12.8834 13.6277 13.1167 13.4443 13.3C13.261 13.4834 13.0277 13.575 12.7443 13.575C12.461 13.575 12.2277 13.4834 12.0443 13.3L7.14434 8.40005Z"
        fill="#2A3647"
      />
    </svg>
  </div>
  <div class="divider-2"></div>
  <div class="icon">
    <svg class="pointer" onclick="pushSubtask()" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.69474 9.15L14.1697 0.675C14.3697 0.475 14.6072 0.375 14.8822 0.375C15.1572 0.375 15.3947 0.475 15.5947 0.675C15.7947 0.875 15.8947 1.1125 15.8947 1.3875C15.8947 1.6625 15.7947 1.9 15.5947 2.1L6.39474 11.3C6.19474 11.5 5.96141 11.6 5.69474 11.6C5.42807 11.6 5.19474 11.5 4.99474 11.3L0.694738 7C0.494738 6.8 0.398905 6.5625 0.407238 6.2875C0.415572 6.0125 0.519738 5.775 0.719738 5.575C0.919738 5.375 1.15724 5.275 1.43224 5.275C1.70724 5.275 1.94474 5.375 2.14474 5.575L5.69474 9.15Z"
        fill="#2A3647"
      />
    </svg>
  </div>
</div>
      `;
}

function renderSubtaskPlusIcon() {
  return `
  <svg onclick="subtaskPlusIconSetFocus()" class="svg-plusicon pointer" id="subTaskPlusIcon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_136369_4669" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
    <rect x="0.248535" width="24" height="24" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_136369_4669)">
    <path
      d="M11.2485 13H6.24854C5.9652 13 5.7277 12.9042 5.53604 12.7125C5.34437 12.5208 5.24854 12.2833 5.24854 12C5.24854 11.7167 5.34437 11.4792 5.53604 11.2875C5.7277 11.0958 5.9652 11 6.24854 11H11.2485V6C11.2485 5.71667 11.3444 5.47917 11.536 5.2875C11.7277 5.09583 11.9652 5 12.2485 5C12.5319 5 12.7694 5.09583 12.961 5.2875C13.1527 5.47917 13.2485 5.71667 13.2485 6V11H18.2485C18.5319 11 18.7694 11.0958 18.961 11.2875C19.1527 11.4792 19.2485 11.7167 19.2485 12C19.2485 12.2833 19.1527 12.5208 18.961 12.7125C18.7694 12.9042 18.5319 13 18.2485 13H13.2485V18C13.2485 18.2833 13.1527 18.5208 12.961 18.7125C12.7694 18.9042 12.5319 19 12.2485 19C11.9652 19 11.7277 18.9042 11.536 18.7125C11.3444 18.5208 11.2485 18.2833 11.2485 18V13Z"
      fill="#2A3647"
    />
  </g>
</svg>
  `;
}

function renderSubtaskItem(subtask, index) {
  return `
 <div ondblclick="editSubtask(${index})" id="subtaskListContainer_${index}" class="subtask-list-container">
  <ul id="subTaskItemUl_${index}" onmouseover="mouseIn(${index})" onmouseout="mouseOut(${index})">
    <li id="subtask_${index}" class="subtask-container">${subtask}</li>
    <div id="subtask-icon-section_${index}" class=" icon-section d-none">
      <svg width="19" height="19" onclick="editSubtask(${index})" class="pointer" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.14453 17H3.54453L12.1695 8.375L10.7695 6.975L2.14453 15.6V17ZM16.4445 6.925L12.1945 2.725L13.5945 1.325C13.9779 0.941667 14.4487 0.75 15.007 0.75C15.5654 0.75 16.0362 0.941667 16.4195 1.325L17.8195 2.725C18.2029 3.10833 18.4029 3.57083 18.4195 4.1125C18.4362 4.65417 18.2529 5.11667 17.8695 5.5L16.4445 6.925ZM14.9945 8.4L4.39453 19H0.144531V14.75L10.7445 4.15L14.9945 8.4Z" fill="#2A3647" />
      </svg>
      <div class="divider-2"></div>
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
  </ul>
</div>
      `;
}

function renderEditSubtaskIcons(index) {
  return `
    <div id="subtask-icon-section_${index}" class="d-flex">
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
       <div class="divider-2"></div>
      <svg onclick="saveEditedSubtask(${index})" class="pointer" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_75601_14762" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
          <rect x="0.144531" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_75601_14762)">
          <path
            d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z"
            fill="#2A3647"
          />
        </g>
      </svg>
    </div>
  `;
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
    ${isChecked(contact.id)}
  </div>
</div>
  `;
}

function isChecked(id) {
  if (checkedContacts.includes(id)) {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12L12 16L20 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  } else {
    return `    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2" />
  </svg>
`;
  }
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

function clearCurrentTask() {
  currentTaskState = { inProgress: false, awaitFeedback: false, done: false };
}
