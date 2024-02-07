allTasks = [];

function addTask() {
  let title = document.getElementById("title");
  let taskDescription = document.getElementById("taskDescription");
  let contacts = document.getElementById("contacts");
  let date = document.getElementById("date");
  let prioInputs = document.getElementsByName("priority");
  for (let i = 0; i < prioInputs.length; i++) {
    if (prioInputs[i].checked) {
      prio = prioInputs[i].value;
    }
  }
  let category = document.getElementById("category");
  let subtask = document.getElementById("subtask");

  let task = [
    {
      title: title.value,
      taskDescription: taskDescription.value,
      contacts: contacts.value,
      createdAt: new Date().getTime(),
      date: date.value,
      prio: prio,
      category: category.value,
      subtask: subtask.value,
    },
  ];

  allTasks.push(task);
  setItem(task[0]["title"], task);
  console.log(allTasks);
}

function checkTasks() {
  for (let i = 0; i < allTasks.length; i++) {
    const taskID = allTasks[i];
    let taskTitle = taskID[0]["title"];
    console.log(taskTitle);
  }
}

//substring(0,1) = erster Buchstabe
