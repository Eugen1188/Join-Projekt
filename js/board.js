function testfunction() {
    console.log(allTasks[0][0]);
    console.log(allTasks[1]);
}

async function initBoard(){
    await testfunc();
    renderCheckState(allTasks);
}

function allowDrop(ev) {
    ev.preventDefault();
}
