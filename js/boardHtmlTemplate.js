function templateCard(){
    return `
            <div class="board-card">
                <div class="board-card-topic">
                    <span>User Story</span>
                </div>
                <div class="board-card-content">
                    <div class="board-card-content-title">
                        <span>Title</span>
                    </div>
                    <div class="max-lines">
                        <span>Create a contact form and imprint page and so on until there is another text</span>
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
                        <div class="assignee" style="background-color: #42526E">KM</div>
                        <div class="assignee" style="background-color: #b550bb">CF</div>
                        <div class="assignee" style="background-color: #a4e36a">DS</div>
                        <div class="assignee" style="background-color: #e3be6a">EF</div>
                    </div>
                    <div>
                        <img src="./assets/img/prioritylow.png" alt="prio-low">
                    </div>
                </div>

            </div>
    `
}