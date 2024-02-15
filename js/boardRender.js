let tasksTodo = [];
let tasksInProgress = [];
let tasksAwaitFeedback = [];
let tasksDone = [];

/**
 * this function clears the whole board and after that it renders the tasks
 * in regard of the task status.
 * 
 * @param {Object} data - JSON with all Tasks data
 */
async function renderCheckState(data) {
    await clearBoard();

    for (let i = 0; i < data.length; i++) {
        const task = data[i][0];

        if (task.status.inProgress == true) {
            tasksInProgress.push(task);
            renderCard(task, 'in-progress');
        } else if (task.status.awaitFeedback == true) {
            tasksAwaitFeedback.push(task);
            renderCard(task, 'await-feedback');
        } else if (task.status.done == true) {
            tasksDone.push(task);
            renderCard(task, 'done');
        } else {
            tasksTodo.push(task);
            renderCard(task, 'todo');
        }
    }
    checkIfTasksAvailable();
}


/**
 * this function clears the board and all board dependant arrays
 */
function clearBoard() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('await-feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    tasksTodo = [];
    tasksInProgress = [];
    tasksAwaitFeedback = [];
    tasksDone = [];
}


/**
 * this function checks if there are tasks in the section, if not the template for noTask
 * will be rendered.
 */
function checkIfTasksAvailable() {
    if (tasksTodo.length == 0) { document.getElementById('todo').innerHTML = templateNoTask() };
    if (tasksInProgress.length == 0) { document.getElementById('in-progress').innerHTML = templateNoTask() };
    if (tasksAwaitFeedback.length == 0) { document.getElementById('await-feedback').innerHTML = templateNoTask() };
    if (tasksDone.length == 0) { document.getElementById('done').innerHTML = templateNoTask() };
}


/**
 * this function renders the card in regard of the given task and section id
 * 
 * @param {Object} task - data of the task
 * @param {string} id - id of the section 
 */
function renderCard(task, id) {
    boardSection = document.getElementById(id);
    boardSection.innerHTML += templateCard(task);
}


/**
 * this function gets the assignees and renders them in the html template
 * 
 * @param {Array} data - provides assignees as an array
 * @returns html template with Assignees
 */
function renderCardAssignee(data) {
    let textHTML = '';
    for (let i = 0; i < data.initials.length; i++) {
        const assignee = data.initials[i];
        const color = data.circleColor[i]
        textHTML += templateCardAssignee(assignee, color);
    }
    return textHTML
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
function renderOverlayAssignee(data) {
    let textHTML = '';
    for (let i = 0; i < data.contacts.length; i++) {
        const assignee = data.initials[i];
        const name = data.contacts[i]
        const color = data.circleColor[i]
        textHTML += templateOverlayAssignee(assignee, name, color);
    }
    return textHTML
}


function renderTaskOverlay(index) {
    let overlay = document.getElementById('overlay-card');
    let taskIndex = allTasks[index][0]
    overlay.innerHTML = '';
    overlay.innerHTML = templateTaskOverlay(taskIndex);
    openOverlay();
}


function renderSubtask(task) {
    let textHTML = '';
    let imgSource = '';

    for (let i = 0; i < task.subtask.subtask.length; i++) {
        const subtask = task.subtask.subtask[i];
        const substate = task.subtask.taskstate[i];

        if (substate == true) {
            imgSource = './assets/img/checkbuttonchecked.png'
        } else if (substate == false) {
            imgSource = './assets/img/checkbuttonempty.png'
        }
        textHTML += templateOverlaySubtask(i, subtask, task, imgSource);
    }
    return textHTML;
}


function renderProgressBar(task) {
    let progressLength = task.subtask.subtask.length;
    let taskState = task.subtask.taskstate;
    let finishedSubtasks = taskState.filter(Boolean).length;
    let width = ((100 / progressLength) * finishedSubtasks);
    if (progressLength > 0) {
        return templateProgressBar(width);
    } else { 
        return ``
    }
}


function renderProgressAmount(task) {
    let progressLength = task.subtask.subtask.length;
    let taskState = task.subtask.taskstate.filter(Boolean).length;

    return `${taskState} / ${progressLength}`;
}
