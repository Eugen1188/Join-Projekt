function templateCard(task) {
    return `
            <div onclick="openOverlay()" draggable="true" ondragstart="startDragging(${task.id})" class="board-card">
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