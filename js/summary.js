let urgentDates = [];

async function renderSummeryTasks() {
    await testfunc();
    logedInUser = await getItemContacts("logedInUser");
    tasksInBoard();
    tasksInProgress();
    tasksToDo();
    tasksAwaitingFeedback()
    tasksDone();
    tasksUrgent();
    renderLogedUser();
    userGreetings();
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
    let b = 0;
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i][0];
        if (element.prio == "urgent") {
            count++;
            rightDate = element.date.replace(/[/]/g, "-");
            urgentDates.push(rightDate);
            sortDates(urgentDates);
        }
        urgentTasks.innerHTML = count;
    }
    nextUrgentDate.innerHTML = showDateInRightFormat(urgentDates[0]);
}

function showDateInRightFormat(date) {

    let arr = Array.from(date);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let rightMonth = arr[3] + arr[4];
    if (rightMonth[0] == 0) {
        rightMonth = months[rightMonth[1] - 1];
    }
    else {
        rightMonth = months[rightMonth - 1];
    }
    return `${rightMonth} ${arr[0]}${arr[1]}, ${arr[6]}${arr[7]}${arr[8]}${arr[9]}`
}

function sortDates(urgentDates) {
    return urgentDates.sort((a, b) => {
        const dateA = a.split('-').reverse().join('-');
        const dateB = b.split('-').reverse().join('-');
        return new Date(dateA) - new Date(dateB);
    });
};

function renderLogedUser() {
    let userInitials = document.getElementById('logedUserInitials');
    let firstName = document.getElementById('logedInName');
    let lastname = document.getElementById('logedInLastname');
    userInitials.innerHTML = logedInUser[0].initials;
    firstName.innerHTML = logedInUser[0].name;
    lastname.innerHTML = logedInUser[0].lastname;
}

// render greetings for mobile phones


function userGreetings() {
    let greeting = document.getElementById('greetings-resposive-user');
    if (logedInUser[0].name == "Guest")
        greeting.innerHTML += `Good morning!`;
    else 
    greeting.innerHTML = `Good morning, <br> <span class="greetingNameMobile"> ${logedInUser[0].name} ${logedInUser[0].lastname} </span>`
}

