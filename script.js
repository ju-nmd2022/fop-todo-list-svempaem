const taskContainer = document.getElementById('taskContainer');
const addTaskTextbox = document.getElementById('addTaskTextbox');
const addTaskButton = document.getElementById('addTaskButton');

let tasks;

if (localStorage.tasks !== undefined) {
    tasks = (JSON.parse(localStorage.tasks));
}
else {
    tasks = [];
}

console.log(tasks)

addTaskButton.addEventListener('click', function() {
    tasks.push(addTaskTextbox.value);
    updateTaskList(addTaskTextbox.value);
    addTaskTextbox.value = '';
    localStorage.tasks = JSON.stringify(tasks);
})

function removeThisTask() {
    tasks.splice(tasks.indexOf(this.parentElement.firstChild.innerText),1);
    localStorage.clear();
    localStorage.tasks = JSON.stringify(tasks);
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

    const removeTask = document.createElement('button');
    removeTask.classList.add('remove-task-button');
    removeTask.innerText = 'remove';

    taskEntry.appendChild(taskDescription);
    taskEntry.appendChild(taskCheck);
    taskEntry.appendChild(removeTask);
    taskContainer.appendChild(taskEntry);

    removeTask.onclick = removeThisTask;
}

function addTasksOnLoad() {
        for (let task of tasks) {
            const taskEntry = document.createElement('div');
            taskEntry.classList.add('task');

            const taskDescription = document.createElement('p');
            taskDescription.classList.add('task-description');
            taskDescription.innerText = task;

            const taskCheck = document.createElement('input');
            taskCheck.setAttribute('type','checkbox');
            taskCheck.classList.add('done-task-check');

            const removeTask = document.createElement('button');
            removeTask.classList.add('remove-task-button');
            removeTask.innerText = 'remove';

            taskEntry.appendChild(taskDescription);
            taskEntry.appendChild(taskCheck);
            taskEntry.appendChild(removeTask);
            taskContainer.appendChild(taskEntry);

            removeTask.onclick = removeThisTask;
    }
}

addTasksOnLoad();

