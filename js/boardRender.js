tasksTodo = [];
tasksInProgress = [];
tasksAwaitFeedback = [];
tasksDone = [];

function renderCard() {

    for (let i = 0; i < 4; i++) {
        const id = document.getElementById(`${i}`);
        id.innerHTML = '';

        if (i == 0) {
            for (let j = 0; j <= 4; j++) {
                const id = document.getElementById(`${i}`);
                id.innerHTML += templateCard();
            }
        } else {
            id.innerHTML = templateCard();
        }
    }
}

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

function renderCardInProgress(task){
    boardSection = document.getElementById('in-progress');
    boardSection.innerHTML += templateCard(task);
}

function renderCardAwaitFeedback(task){
    boardSection = document.getElementById('await-feedback');
    boardSection.innerHTML += templateCard(task);
}

function renderCardDone(task){
    boardSection = document.getElementById('done');
    boardSection.innerHTML += templateCard(task);
}

function renderCardAssignee(data){
    let textHTML = '';
    for (let i = 0; i < data.length; i++) {
        const assignee = data[i];

        textHTML += templateCardAssignee(assignee);
    }

    return textHTML
}