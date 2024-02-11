let currentDraggedElement;

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
    document.getElementById('overlay').classList.add('d-none');
}