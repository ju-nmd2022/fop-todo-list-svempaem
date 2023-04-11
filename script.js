const taskContainer = document.getElementById('taskContainer');
const addTaskTextbox = document.getElementById('addTaskTextbox');
const addTaskButton = document.getElementById('addTaskButton');

let tasks = [];

addTaskButton.addEventListener('click', function() {
    tasks.push(addTaskTextbox.value);
    addTaskTextbox.value = '';
    localStorage.tasks = JSON.stringify(tasks);

    addTask();
})

function removeThisTask() {
    console.log(this.parentElement.firstChild.innerText);
}

function addTask() {
        for (let task of JSON.parse(localStorage.tasks)) {
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
    


addTask();

