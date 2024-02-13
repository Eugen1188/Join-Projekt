let tasksTodo = [];
let tasksInProgress = [];
let tasksAwaitFeedback = [];
let tasksDone = [];


function renderCheckState(data) {
    clearBoard();

    for (let i = 0; i < data.length; i++) {
        const task = data[i][0];

        if (task.status.inProgress == true) {
            tasksInProgress.push(task);
            renderCardInProgress(task);
        } else if (task.status.awaitFeedback == true) {
            tasksAwaitFeedback.push(task);
            renderCardAwaitFeedback(task);
        } else if (task.status.done == true) {
            tasksDone.push(task);
            renderCardDone(task);
        } else {
            tasksTodo.push(task);
            renderCardTodo(task);
        }
    }
    checkIfTasksAvailable();
}


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


function checkIfTasksAvailable() {
    if (tasksTodo.length == 0) { document.getElementById('todo').innerHTML = templateNoTask() };
    if (tasksInProgress.length == 0) { document.getElementById('in-progress').innerHTML = templateNoTask() };
    if (tasksAwaitFeedback.length == 0) { document.getElementById('await-feedback').innerHTML = templateNoTask() };
    if (tasksDone.length == 0) { document.getElementById('done').innerHTML = templateNoTask() };
}


function renderCardTodo(task) {
    boardSection = document.getElementById('todo');
    boardSection.innerHTML += templateCard(task);
}


function renderCardInProgress(task) {
    boardSection = document.getElementById('in-progress');
    boardSection.innerHTML += templateCard(task);
}


function renderCardAwaitFeedback(task) {
    boardSection = document.getElementById('await-feedback');
    boardSection.innerHTML += templateCard(task);
}


function renderCardDone(task) {
    boardSection = document.getElementById('done');
    boardSection.innerHTML += templateCard(task);
}


function renderCardAssignee(data) {
    let textHTML = '';
    for (let i = 0; i < data.length; i++) {
        const assignee = data[i];
        textHTML += templateCardAssignee(assignee);
    }
    return textHTML
}

// parameter für namen hinzufügen
function renderOverlayAssignee(data) {
    let textHTML = '';
    for (let i = 0; i < data.contacts.length; i++) {
        const assignee = data.initials[i];
        const name = data.contacts[i]
        textHTML += templateOverlayAssignee(assignee, name);
    }
    return textHTML
}

function renderTaskOverlay(index) {
    let overlay = document.getElementById('overlay-card');
    let taskIndex = allTasks[index][0]
    console.log(taskIndex)
    overlay.innerHTML = '';
    overlay.innerHTML = templateTaskOverlay(taskIndex);
    openOverlay();
}


function renderSubtask(task) {
    let textHTML = '';
    let imgSource = '';

    console.log(task)
    for (let i = 0; i < task.subtask.subtask.length; i++) {
        const subtask = task.subtask.subtask[i];
        const substate = task.subtask.taskstate[i];

        if (substate == true) {
            imgSource = './assets/img/checkbuttonchecked.png'
        }else if(substate == false){
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
    let width = ((100/progressLength)*finishedSubtasks);

    return templateProgressBar(width);
}

function renderProgressAmount(task){
    let progressLength = task.subtask.subtask.length;
    let taskState = task.subtask.taskstate;
    let finishedSubtasks = taskState.filter(Boolean).length;

    return `${finishedSubtasks} / ${progressLength}`;
}
