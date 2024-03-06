/**
 * Variables used to store various data related to contacts and tasks.
 *
 * @type {Array<string>} checkedContacts - Array to store checked contact names.
 * @type {Array<any>} subtasks - Array to store subtask data.
 * @type {Array<any>} finalContactData - Array to store final contact data.
 * @type {Array<string>} contactName - Array to store contact names.
 * @type {Array<string>} initials - Array to store initials of contacts.
 * @type {Array<string>} circleColors - Array to store colors for circles representing contacts.
 * @type {Array<string>} taskStates - Array to store states of tasks.
 * @type {Array<any>} tempContacts - Array to store temporary contact data.
 * @type {Array<string>} contactIds - Array to store contact IDs.
 */

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
 * Initializes the application by fetching logged-in user data, rendering the logged-in user,
 * setting priority to medium for SVG fills, handling click events with medium priority,
 * initializing contacts, and retrieving all tasks data.
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 * @function init()
 * @author Christian Förster & Kevin Müller
 */

async function init() {
  logedInUser = await getItemContacts("logedInUser");
  renderLogedUser();
  // invertSvgFills("medium") & handleClick("medium") setzen die Prio standardmäßig auf medium. Im HTML muss  der input den Wert checked bekommen
  invertSvgFills("medium");
  handleClick("medium");
  initContacts();
  getAllTasksData();
}

/**
 * Asynchronously fetches the logged-in user's contacts and renders the logged-in user.
 *
 * This function performs the following steps:
 * 1. Retrieves the logged-in user's contacts by awaiting the result of the `getItemContacts` function with the key "logedInUser".
 * 2. Renders the logged-in user by calling the `renderLogedUser` function.
 * @function contacts()
 * @returns {Promise<void>} A promise that resolves when the contacts are fetched and the logged-in user is rendered.
 * @author Dragan Saric & Kevin Müller
 */

async function contacts() {
  logedInUser = await getItemContacts("logedInUser");
  if (logedInUser.length == 0) {
    navigateToIndex();
  }
  renderLogedUser();
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

/**
 * function validateForm(index) {
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
 */

/**
 *Clears field inputs and resets form state.
 *This function clears various field inputs within a form and resets its state.
 *It resets the form using the reset() method, clears specific input values,
 *inner HTML content, resets certain variables, and triggers additional functions.
 * @function clearFieldInputs
 * @author Christian Förster
 */

function clearFieldInputs() {
  document.getElementById("form").reset();
  document.getElementById("title").value = "";
  document.getElementById("choosenContacts").innerHTML = "";
  document.getElementById("subtask").value = "";
  document.getElementById("showSubtasks").innerHTML = "";
  invertSvgFills("medium");
  handleClick("medium");
  checkedContacts = [];
  subtasks = [];
  getRequiredFormInputs();
}

/**
 * Prevents the default form submission behavior when the Enter key is pressed.
 * @function preventFormSubmit
 * @param {KeyboardEvent} event - The event object representing the key press event.
 * @author Christian Förster
 */

function preventFormSubmit(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}

/**
 * Clears the current task state by resetting it to its initial values.
 * @function clearCurrentTask
 * @author Kevin Müller
 */

function clearCurrentTask() {
  currentTaskState = { inProgress: false, awaitFeedback: false, done: false };
}
