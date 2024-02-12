function templateCard(task) {
    return `
            <div onclick="renderTaskOverlay(${task.id})" draggable="true" ondragstart="startDragging(${task.id})" class="board-card">
                <div class="board-card-topic">
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
                    <div class="task-progress-blank">
                      <div class="task-progress"></div>
                    </div>
                    <div>
                        <span>1/2 Subtasks</span>
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
                <div class="task-subtask">
                    <img id="sub0" onclick="checkedSubtask(0)" src="./assets/img/checkbuttonchecked.png" alt="checked">
                    <span>This is a subtask thats completed</span>
                </div>
                <div class="task-subtask">
                    <img id="sub1" onclick="checkedSubtask(1)" src="./assets/img/checkbuttonempty.png" alt="unchecked">
                    <span>This is a subtask thats not completed</span>
                </div>   
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

function templateOverlayAssignee(assignee, name){
    return `
        <div class="task-overlay-assignee">
            <div class="assignee" style="background-color: #42526E">${assignee}</div>
            <span>${name}</span>
        </div>
    `
}