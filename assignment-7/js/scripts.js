// Array to hold tasks
var tasks = [];

// Task status 'enum'
var taskStatus = {
    active: 'active',
    completed: 'completed'
}

// Task constructor function
function Task (id, name, status) {
    this.id = id;
    this.name = name;
    this.status = status;
}

// Creates a new task element and adds it to the DOM
function addTaskElement (task) {
    // Create elements
    var listEl = document.getElementById('active-list');
    var taskEl = document.createElement('li');
    var textEl = document.createTextNode(task.name);

    // Set attributes
    taskEl.setAttribute('id', task.id);

    // Add text to task element
    taskEl.appendChild(textEl);

    // Add task element to list
    listEl.appendChild(taskEl);
}

// Click handler to add a new tasks
function addTask(event) {
    // Get input
    var inputEl = document.getElementById('input-task');
    if (inputEl.value != "") {
      // Create a unique id
      var id = 'task-' + tasks.length;

      // Create a new task
      var task = new Task(id, inputEl.value, taskStatus.active);
      tasks.push(task);

      // Add the task to the DOM
      addTaskElement(task);

      // Reset input
      inputEl.value = "";
    }
}

// Click handler to reset all tasks
function resetTask(event) {
  //Clear tasks array.
  tasks.length = 0;
  //Clear active & completed DOM elements
  var activeTasks = document.getElementById("active-list");
  while (activeTasks.firstChild) {
    activeTasks.removeChild(activeTasks.firstChild);
  }
  var completedTasks = document.getElementById("completed-list");
  while (completedTasks.firstChild) {
    completedTasks.removeChild(completedTasks.firstChild);
  }
  //Clear input field.
  document.getElementById('input-task').value = "";
}

// Click handler to complete a task
function completeTask (event) {
    // Get the task element
    var taskEl = event.target;
    var id = taskEl.id;

    // Find corresponding task in tasks array and update status
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].status = taskStatus.completed;
        break;
      }
    }

    // Move task element from active list to completed list
    taskEl.remove();
    document.getElementById('completed-list').appendChild(taskEl);
}

function init() {
  // Wire up the add task button click handler
  document.getElementById('add-task-button').onclick = addTask;

  // Wire up the reset button click handler
  document.getElementById('reset-button').onclick = resetTask;

  // Wire up the task completed list item click handler
  document.getElementById('active-list').onclick = completeTask;

  document.getElementById('input-task')
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById('add-task-button').click();
          document.getElementById('input-task').value = "";
      }
  });

}

init();
