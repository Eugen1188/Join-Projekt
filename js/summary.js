
async function renderSummeryTasks(){
    await testfunc();
    tasksInBoard();
    tasksInProgress();
    tasksToDo();
    tasksAwaitingFeedback()
    tasksDone();
    tasksUrgent();
}

function tasksInBoard() {

    let tasksInBoard = document.getElementById('amount_of_tasks_in_board');

    tasksInBoard.innerHTML = allTasks.length;
    console.log(allTasks.length);
}

function tasksInProgress() {

    let tasksInProgress = document.getElementById('tasks_in_progress');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if(element.status.inProgress == true)
        count++
    tasksInProgress.innerHTML = count;
    }
}

function tasksAwaitingFeedback() {
    let tasksAwaitingFeedback = document.getElementById('tasks_awaiting_feedback');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if(element.status.awaitFeedback == true)
        count++
    tasksAwaitingFeedback.innerHTML = count;
    }
}

function tasksToDo() {
    let tasksToDo = document.getElementById('tasks_number_to_do');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if(!element.status.inProgress && !element.status.done && !element.status.awaitFeedback)
        count++
    tasksToDo.innerHTML = count;
    }
}

function tasksDone() {
    let tasksDone = document.getElementById('tasks_number_done');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if(element.status.done == true)
        count++
    tasksDone.innerHTML = count;
    }
}

function tasksUrgent() {
    let urgentTasks = document.getElementById('tasks_number_urgent');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if(element.prio == "urgent"){
            count++
        }
        
    urgentTasks.innerHTML = count;
    }
}