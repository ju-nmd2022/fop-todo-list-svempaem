const taskContainer = document.getElementById('taskContainer');
const addTaskTextbox = document.getElementById('addTaskTextbox');
const addTaskButton = document.getElementById('addTaskButton');

let tasks;
let checkedTasks;

if (localStorage.tasks !== undefined) {
    tasks = (JSON.parse(localStorage.tasks));
}
else {
    tasks = [];
}

if (localStorage.checkedTasks !== undefined) {
    checkedTasks = (JSON.parse(localStorage.checkedTasks));
}
else {
    checkedTasks = [];
}

function updateChecks() {
    if (this.checked) {
        checkedTasks.splice(tasks.indexOf(this.parentElement.firstChild.innerText),1,true);
        localStorage.checkedTasks = JSON.stringify(checkedTasks);
    }
    else {
        checkedTasks.splice(tasks.indexOf(this.parentElement.firstChild.innerText),1,false);
        localStorage.removeItem(checkedTasks);
        localStorage.checkedTasks = JSON.stringify(checkedTasks);
    }
}

addTaskButton.addEventListener('click', function() {
    submitInput();
})

addTaskTextbox.addEventListener('keypress', function() {
    if (event.key === 'Enter') {
        submitInput();
    }
})

function submitInput() {
    if (addTaskTextbox.value !== '') {
        tasks.push(addTaskTextbox.value);
        updateTaskList(addTaskTextbox.value);
        addTaskTextbox.value = '';
        localStorage.tasks = JSON.stringify(tasks);
    }    
}

function removeThisTask() {
    tasks.splice(tasks.indexOf(this.parentElement.firstChild.innerText),1);
    localStorage.removeItem('tasks');
    localStorage.tasks = JSON.stringify(tasks);
    console.log(this.parentElement);
    taskContainer.removeChild(this.parentElement);
}

function updateTaskList(text) {
    const taskEntry = document.createElement('div');
    taskEntry.classList.add('task');

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.innerText = text;

    const taskCheck = document.createElement('input');
    taskCheck.setAttribute('type','checkbox');
    taskCheck.classList.add('done-task-check');
    taskCheck.setAttribute('id','taskCheck' + tasks.indexOf(text));
    if (checkedTasks[tasks.indexOf(text)] === true) {
        taskCheck.setAttribute('checked','checked');
    }

    const removeTask = document.createElement('button');
    removeTask.classList.add('remove-task-button');
    removeTask.innerText = 'remove';

    taskEntry.appendChild(taskDescription);
    taskEntry.appendChild(taskCheck);
    taskEntry.appendChild(removeTask);
    taskContainer.appendChild(taskEntry);

    removeTask.onclick = removeThisTask;
    taskCheck.onclick = updateChecks;

    checkedTasks.push(false);
}

// function to restore the task list based on local storage
function addTasksOnLoad() {
    for (let task of tasks) {
        updateTaskList(task);
    }
}

addTasksOnLoad();

