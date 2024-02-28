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
 * @author Dragan
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

/**
 * Initializes the contacts by retrieving them from storage and populating the temporary contacts array.
 * @async
 * @function initContacts
 * @author Dragan
 */

async function initContacts() {
  tempContacts = await getItemContacts("contacts");
  getAllContacts();
}

/**
 * Retrieves all contacts and displays them.
 * @function getAllContacts
 * @author Christian Förster
 */

function getAllContacts() {
  displayContacts(tempContacts);
}

/**
 * Displays a list of contacts in a select element on the DOM.
 * @function displayContacts
 * @param {Array} contacts - An array of contacts to display.
 * @author Christian Förster
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
 * @author Christian Förster
 */

function showContacts() {
  let arrow = document.getElementById("arrowContactInput");
  let id = document.getElementById("contact-values");
  let input = document.getElementById("contactAssignInput");
  input.placeholder = "Select contacts to assign";
  id.classList.toggle("d-none");
  arrow.classList.toggle("rotate-180");
  if (!id.classList.contains("d-none")) {
    closeContactValueOnDifferentClickTarget();
  }
}

/**
 * Closes the contact values dropdown when clicking outside this specific element and its components.
 * @function closeContactValueOnDifferentClickTarget
 * @param {number} index - The index of the contact.
 */

function closeContactValueOnDifferentClickTarget(index) {
  document.onclick = function (event) {
    const contactValues = document.getElementById("contact-values");
    const assignToInput = document.getElementById("contactAssignInput");
    const arrow = document.getElementById("arrowContactInput");
    const contactCard = document.getElementById(`contact_${index}`);
    const checkboxIcon = document.getElementById(`checkboxIcon_${index}`);
    const clickedElement = event.target;
    // Überprüfen, ob das geklickte Element ein SVG oder ein Span ist
    const isSVGOrSpan = clickedElement.tagName === "svg" || clickedElement.tagName === "SPAN";
    // Wenn das geklickte Element nicht eines der spezifizierten Elemente ist wird ein d-none gesetzt
    if (!isSVGOrSpan && clickedElement !== contactValues && clickedElement !== assignToInput && clickedElement !== arrow && clickedElement !== contactCard && clickedElement !== checkboxIcon) {
      contactValues.classList.add("d-none");
    }
  };
}

/**
 * Retrieves information about a clicked contact and updates its visual representation.
 * @function getClickedContact
 * @param {number} index - The index of the clicked contact.
 * @param {string} contactId - The ID of the clicked contact.
 * @author Christian Förster
 */

function getClickedContact(index, contactId) {
  let input = document.getElementById("contactAssignInput");
  let iconToChange = document.getElementById(`checkboxIcon_${index}`);
  let contactCard = document.getElementById(`contact_${index}`);
  let checkBoxIconColor = document.getElementById(`checkboxIcon_${index}`);
  let isChecked = checkedContacts.includes(contactId);
  input.placeholder = "An ";
  checkClickedContact(iconToChange, contactCard, checkBoxIconColor, isChecked, index, contactId);
  closeContactValueOnDifferentClickTarget(index);
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
 * @author Christian Förster
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
  showChoosenContactsCircle();
}

/**
 * Filters and displays contacts based on the input value.
 * @function filterContacts
 * @author Christian Förster
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

/**
 * Displays filtered contacts by passing them to the function responsible for displaying contacts.
 * @function displayFilteredContacts
 * @param {array} filteredContacts - The array of filtered contacts to be displayed.
 * @author Christian Förster
 */

function displayFilteredContacts(filteredContacts) {
  displayContacts(filteredContacts);
}

/**
 * Renders circles representing chosen contacts and displays them in the designated container.
 * @function showChoosenContactsCircle
 * @author Christian Förster
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
 * @author Christian Förster & Kevin Müller
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
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
 */

function getInput() {
  let subtask = document.getElementById("subtask").value;
  return subtask;
}

/**
 * Pushes a subtask into the subtasks array, updates task states, displays subtasks, and renders a plus icon.
 * @function pushSubtask
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
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
 * @author Christian Förster
 */

function clearSubtaskInput() {
  let subtask = (document.getElementById("subtask").value = "");
  return subtask;
}

/**
 * Removes a subtask and its corresponding task state from the task's subtasks and taskStates arrays respectively.
 * Calls the showSubtasks function to update the UI.
 * @function deleteSubtask
 * @param {number} index - The index of the subtask to be deleted.
 * @author Christian Förster
 */

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  taskStates.splice(index, 1);
  showSubtasks();
}

/**
 * Updates the icons for subtask inputs by replacing the content of the container with new SVG icons.
 * Retrieves the container element by its ID "subTaskSvgContainer" and updates its innerHTML with the rendered SVG icons.
 * @function changeSubtaskInputIcons
 * @author Christian Förster
 */

function changeSubtaskInputIcons() {
  let subTaskSvgContainer = document.getElementById("subTaskSvgContainer");
  subTaskSvgContainer.innerHTML = renderSubtaskInputIcons();
}

/**
 * Sets focus to the input field for adding subtasks by programmatically clicking on it and then focusing on it.
 * Retrieves the input element by its ID "subtask" and programmatically simulates a click event followed by focusing on the input field.
 * @function subtaskPlusIconSetFocus
 * @author Christian Förster
 */

function subtaskPlusIconSetFocus() {
  let input = document.getElementById("subtask");
  input.click();
  input.focus();
}

/**
 * @function checkTitleInputField
 * Checks the title input field and applies styling based on its value.
 * @author Christian Förster
 */

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

/**
 * @function updateDateFieldValue
 * Updates the value of the date field to a different format and checks its validity.
 * @author Christian Förster
 */

function updateDateFieldValue() {
  let datefieldValue = document.getElementById("dateNormal").value;
  // Das Datum im Format "yyyy-mm-dd" wird in das Format "dd/mm/yyyy" umgewandelt
  let formattedDate = datefieldValue.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3/$2/$1");
  document.getElementById("date").value = formattedDate;
  checkDateInputField();
}

/**
 * @function checkDateInputField
 * Checks the date input field and applies styling based on its value.
 * @author Christian Förster
 */

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
/**
 * Formats the date input field value by removing non-numeric characters and inserting slashes (/) at appropriate positions.
 * @function formatDateInput
 * @author Christian Förster
 */

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

/**
 * Retrieves the values of required form inputs and sets the state and style of the submit button accordingly.
 * @function getRequiredFormInputs
 * @author Christian Förster
 */

function getRequiredFormInputs() {
  let titleValue = document.getElementById("title").value;
  let inputDateFieldValue = document.getElementById("date").value;
  let categoryValue = document.getElementById("category").value;
  let submitButton = document.getElementById("submitButton");
  setSubmitButtonStateAndStyle(titleValue, inputDateFieldValue, categoryValue, submitButton);
}

/**
 * Sets the state and style of the submit button based on the provided values of required form inputs.
 * @function setSubmitButtonStateAndStyle
 * @param {string} titleValue - The value of the title input field.
 * @param {string} inputDateFieldValue - The value of the date input field.
 * @param {string} categoryValue - The value of the category input field.
 * @param {HTMLElement} submitButton - The submit button element.
 * @author Christian Förster
 */

function setSubmitButtonStateAndStyle(titleValue, inputDateFieldValue, categoryValue, submitButton) {
  if (titleValue != "" && inputDateFieldValue != "" && categoryValue != "") {
    submitButton.disabled = false;
    submitButton.classList.add("btn-bg", "btn-color-wht", "pointer");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("btn-bg", "btn-color-wht", "pointer");
  }
}

/**
 * Validates the form inputs for adding a task based on the selected contact and priority.
 * @function validateForm
 * @param {number} index - The index of the task to be added.
 * @author Christian Förster
 */

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
 * Asynchronously adds a task based on the provided index.
 * @async
 * @function addTask
 * @param {number} index - The index of the task to be added.
 * @returns {Promise<void>}
 * @author Christian Förster & Kevin Müller
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

/**
 * Retrieves the priority value from the selected priority input.
 * @function getPriorityValue
 * @returns {string} The priority value.
 * @author Christian Förster
 */

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

/**
 * Creates a task object with the provided details.
 * @function createTaskObject
 * @param {number} id - The ID of the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The date of the task.
 * @param {string} prio - The priority of the task.
 * @param {string} category - The category of the task.
 * @param {number} index - The index of the task.
 * @returns {object[]} An array containing the task object.
 * @author Christian Förster
 */

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

/**
 * Asynchronously updates an existing task with the provided index and task object.
 * @async
 * @function updateExistingTask
 * @param {number} index - The index of the task to be updated.
 * @param {object[]} task - The updated task object.
 * @returns {Promise<void>}
 * @author Kevin Müller
 */

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

/**
 * Asynchronously adds a new task to the tasks array and updates the storage.
 * @async
 * @function addNewTask
 * @param {object[]} task - The new task object to be added.
 * @author Christian Förster
 */

async function addNewTask(task) {
  allTasks.push(task);
  await setItem("test_board", allTasks);
}

/**
 * Handles the location based on the current URL and task index.
 * @function handleLocation
 * @param {number} index - The index of the task.
 * @author Christian Förster
 */

function handleLocation(index) {
  if (window.location.href == "http://127.0.0.1:5500/board.html" && index == undefined) {
    closeOverlayAddTask(true);
  }
  if (window.location.href == "http://127.0.0.1:5500/add-task.html") {
    translateTaskAddedElementAndRedirect();
  }
}

/**
 * Generates the task state array based on the provided task index.
 * @function generateTaskState
 * @param {number} index - The index of the task.
 * @returns {boolean[]} The generated task state array.
 * @author Kevin Müller
 */

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

/**
 * Clears all field inputs by reloading the page.
 * @function clearFieldInputs
 * @author Christian Förster
 */

function clearFieldInputs() {
  location.reload();
}

/**
 * Translates and transforms the task added element and redirects to the board page after a delay.
 * @function translateTaskAddedElementAndRedirect
 * @author Christian Förster
 */

function translateTaskAddedElementAndRedirect() {
  let element = document.getElementById("taskAdded");
  element.classList.remove("d-none");
  element.style.transition = "transform 0.5s ease";
  element.style.transform = "translateY(0)";
  element.style.top = "50%";
  element.style.left = "50%";
  element.style.transform = "translate(-50%, -50%)";
  setTimeout(() => {
    window.location.href = "./board.html";
  }, 2000);
}

/**
 * Asynchronously retrieves and parses the task data from storage to populate the tasks array.
 * @async
 * @function testfunc
 * @author Kevin Müller
 */

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

/**
 * Clears the current task state by resetting it to its initial values.
 * @function clearCurrentTask
 * @author Kevin Müller
 */

function clearCurrentTask() {
  currentTaskState = { inProgress: false, awaitFeedback: false, done: false };
}
