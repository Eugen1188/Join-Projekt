let urgentDates = [];

async function renderSummeryTasks() {
    await testfunc();
    tasksInBoard();
    tasksInProgress();
    tasksToDo();
    tasksAwaitingFeedback()
    tasksDone();
    tasksUrgent();
    logedInUser = await getItemContacts("logedInUser");
    renderLogedUser();
}


function tasksInBoard() {

    let tasksInBoard = document.getElementById('amount_of_tasks_in_board');

    tasksInBoard.innerHTML = allTasks.length;
}

function tasksInProgress() {

    let tasksInProgress = document.getElementById('tasks_in_progress');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if (element.status.inProgress == true)
            count++
        tasksInProgress.innerHTML = count;
    }
}

function tasksAwaitingFeedback() {
    let tasksAwaitingFeedback = document.getElementById('tasks_awaiting_feedback');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if (element.status.awaitFeedback == true)
            count++
        tasksAwaitingFeedback.innerHTML = count;
    }
}

function tasksToDo() {
    let tasksToDo = document.getElementById('tasks_number_to_do');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if (!element.status.inProgress && !element.status.done && !element.status.awaitFeedback)
            count++
        tasksToDo.innerHTML = count;
    }
}

function tasksDone() {
    let tasksDone = document.getElementById('tasks_number_done');
    let count = 0;

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if (element.status.done == true)
            count++
        tasksDone.innerHTML = count;
    }
}

function tasksUrgent() {
    let urgentTasks = document.getElementById('tasks_number_urgent');
    let nextUrgentDate = document.getElementById('next_urgent_task_date');
    let count = 0;
    let urgentDate = 0;


    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if (element.prio == "urgent") {

            count++;
            rightDate = element.date.replace(/[/]/g, "-");
            urgentDates.push(rightDate);
            console.log(urgentDates);
        }

        urgentTasks.innerHTML = count;
        nextUrgentDate.innerHTML = showDateInRightFormat();
    }
}

function showDateInRightFormat() {

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let rightMonth = rightDate[3] + rightDate[4];

    if (rightMonth[0] == 0) {
        rightMonth = months[rightMonth[1] - 1];

    }

    return `${rightMonth} ${rightDate[0]}${rightDate[1]}, ${rightDate[6]}${rightDate[7]}${rightDate[8]}${rightDate[9]}`

}

function sortDates(dates) {
    return urgentDates.sort((a, b) => {
      const dateA = a.split('-').reverse().join('-');
      const dateB = b.split('-').reverse().join('-');
      return new Date(dateA) - new Date(dateB);
    });
  };

