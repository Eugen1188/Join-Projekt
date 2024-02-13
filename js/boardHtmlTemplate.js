function templateCard(task) {
    return `
            <div id="card${task.id}"  onclick="renderTaskOverlay(${task.id})" draggable="true" ondragstart="startDragging(${task.id}); rotateCard(${task.id})" class="board-card">
                <div class="board-card-topic" style="background-color:${checkCategory(task.category)}">
                    <span>${task.category}</span>
                </div>
                <div class="board-card-content">
                    <div class="board-card-content-title">
                        <span>${task.title}</span>
                    </div>
                    <div class="max-lines">
                        <span>${task.taskDescription}</span>
                    </div>
                </div>
                <div class="board-progress">
                    ${renderProgressBar(task)}
                    <div>
                        <span>${renderProgressAmount(task)} Subtasks</span>
                    </div>
                </div>
                <div class="board-card-status">
                    <div class="board-card-assignee">
                        ${renderCardAssignee(task.initials)}
                    </div>
                    <div>
                        <img src="./assets/img/${task.prio}.png" alt="prio-low">
                    </div>
                </div>

            </div>
    `
}

function templateNoTask() {
    return `
        <div class="board-no-task">
            <span>No tasks To do</span>
        </div>
    `
}

function templateCardAssignee(assignee) {
    return `
    <div class="assignee" style="background-color: #42526E">${assignee}</div>
    `
}

function templateTaskOverlay(task) {
    return `
        <div class="task-overlay-top">
            <div class="board-card-topic">
                <span>${task.category}</span>
            </div>
            <img src="./assets/img/Close.png" alt="close" onclick="closeOverlay()">
        </div>
        <span class="task-overlay-title">${task.title}</span>
        <span class="task-overlay-text">${task.taskDescription}</span>
        <div class="task-overlay-section">
            <span class="task-overlay-text task-overlay-text-fix">Due date:</span>
            <span class="task-overlay-text">${task.date}</span>
        </div>
        <div class="task-overlay-section">
            <span class="task-overlay-text task-overlay-text-fix">Priority:</span>
            <span class="task-overlay-text board-prio-pad">${task.prio} <img src="./assets/img/${task.prio}.png" alt=""></span>
        </div>
        <div class="task-overlay-assigned">
            <span class="task-overlay-text task-overlay-text-fix">Assigned to:</span>
            ${renderOverlayAssignee(task)}
        </div>
        <div class="task-overlay-subtasks">
            <span class="task-overlay-text task-overlay-text-fix">Subtasks</span>
            <div id="overlay-subtask-container">
                ${renderSubtask(task)}
            </div>
        </div>
        <div class="overlay-menu">
            <div class="overlay-menu-content">
                <img src="./assets/img/icons/delete.png" alt="delete">
                <span>Delete</span>
            </div>
            <img src="./assets/img/divider.png" alt="divider">
            <div class="overlay-menu-content">
                <img src="./assets/img/icons/edit.png" alt="edit">
                <span>Edit</span>
            </div>     
        </div> 
    `
}

function templateOverlayAssignee(assignee, name) {
    return `
        <div class="task-overlay-assignee">
            <div class="assignee" style="background-color: #42526E">${assignee}</div>
            <span>${name}</span>
        </div>
    `
}

function templateOverlaySubtask(index, subtask, task, source) {
    return `
            <div class="task-subtask">
                <img id="sub${index}" onclick="checkedSubtask(${index}, ${task.id})" src="${source}">
                <span>${subtask}</span>
            </div>
    `
}

function templateProgressBar(progress) {
    return `
        <div class="task-progress-blank">
          <div class="task-progress" style="width:${progress}%"></div>
        </div>
    `
}

function templateGhostCard(){
    return `
        <div id="ghostcard" class="ghost-card"></div>
    `
}