function dragMenu(id){
    let task = allTasks[id][0].status;
    currentDraggedElement = id;

    document.getElementById(`drop-menu${id}`).classList.toggle('d-none');
    if (task.inProgress === true) {
        document.getElementById(`drop-inprogress${id}`).classList.toggle('drop-menu-disabled');
    }else if(task.awaitFeedback === true){
        document.getElementById(`drop-awaitfeedback${id}`).classList.toggle('drop-menu-disabled');
    }else if(task.done === true){
        document.getElementById(`drop-done${id}`).classList.toggle('drop-menu-disabled');
    }else{
        document.getElementById(`drop-todo${id}`).classList.toggle('drop-menu-disabled');
    }
}