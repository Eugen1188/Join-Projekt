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
            // render logic for in progress
        } else if (task.status.awaitFeedback == true) {
            //render logic for await feedback
        } else if (task.status.done == true) {
            //render logic for done
        } else {
            tasksTodo.push(task);
            renderCardDone(task);
        }
    }

    if (tasksTodo.length == 0) { document.getElementById('todo').innerHTML = templateNoTask() };
    if (tasksInProgress.length == 0) { document.getElementById('in-progress').innerHTML = templateNoTask() };
    if (tasksAwaitFeedback.length == 0) { document.getElementById('await-feedback').innerHTML = templateNoTask() };
    if (tasksDone.length == 0) { document.getElementById('done').innerHTML = templateNoTask() };
}

function clearBoard(){
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('await-feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


function renderCardDone(task) {
    boardSection = document.getElementById('todo');
    boardSection.innerHTML += templateCard(task)
}