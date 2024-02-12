let currentDraggedElement;
let checkedSubtasks = [];

function testfunction() {
    console.log(allTasks[0][0]);
    console.log(allTasks[1]);
}

async function initBoard() {
    await testfunc();
    renderCheckState(allTasks);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

async function moveTo(id) {
    allTasks[currentDraggedElement][0].status.inProgress = false;
    allTasks[currentDraggedElement][0].status.awaitFeedback = false;
    allTasks[currentDraggedElement][0].status.done = false;


    if (id == 'in-progress') {
        allTasks[currentDraggedElement][0].status.inProgress = true;
        await setItem("test_board", allTasks);
        initBoard();
    } else if (id == 'await-feedback') {
        allTasks[currentDraggedElement][0].status.awaitFeedback = true;
        await setItem("test_board", allTasks);
        initBoard();
    } else if (id == 'done') {
        allTasks[currentDraggedElement][0].status.done = true;
        await setItem("test_board", allTasks);
        initBoard();
    } else if (id == 'todo') {
        await setItem("test_board", allTasks);
        initBoard();
    }

}

function closeOverlay() {
    document.getElementById('overlay-card').classList.remove('task-overlay-translate-in')
    document.getElementById('overlay-card').classList.add('task-overlay-translate-out')
    setTimeout(displayCloseOverlay,250)
}

function openOverlay(index){
    displayOpenOverlay();
    setTimeout(slideInOverlay, 250)
}

function slideInOverlay(){
    document.getElementById('overlay-card').classList.add('task-overlay-translate-in')
}

function displayOpenOverlay(){
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-card').classList.remove('task-overlay-translate-out')
}

function displayCloseOverlay(){
    document.getElementById('overlay').classList.add('d-none');
}

function checkedSubtask(subtask){

    //Subtasks brauch ein object für die task und den jeweiligen wert ob diese ausgeführt wurde
    let subtaskDom = document.getElementById(`sub${subtask}`);

    if (subtaskDom.alt == 'checked'){
        subtaskDom.src = `./assets/img/checkbuttonempty.png`;
        subtaskDom.alt = 'unchecked';
    }else if(subtaskDom.alt == 'unchecked'){
        subtaskDom.src = `./assets/img/checkbuttonchecked.png`;
        subtaskDom.alt = 'checked';
    }
}