// DOM = Document Object Model, the html hiearchy 
// also known as the DOM tree. The DOM tree is defined 
// by the html file, in this instance the index.html file

// Prep: Understand the problem and think of a solution
// Plan: laying out a possible solution
// Perform: execute the planned solution
// Perfection: Perfect and improve the executed solution

// We're creating a to-do list app
// We should be able to create tasks, 
// delete tasks, add tasks, and complete tasks

// Prep:
  // Problem: We don't have any reaction to user interaction
  // Solution: Add interactivity to perform all four tasks
  
// Plan:
// we want to be able to:

  // add tasks:
    // when 'add' button is pressed, we want to 
    // create a new task from the 'new-task' text box
    // and append it to the todo tasks unordered list 'incomplete-tasks'
    // This part of the Dom creates each task:
    //        <li>
    //          <input type="checkbox">
    //          <label>Pay Bills</label>
    //          <input type="text">
    //          <button class="edit">Edit</button>
    //          <button class="delete">Delete</button>
    //        </li>
  
  // edit tasks:
    // When we click the edit button on any task, we want to
    // be able to change the text on the 'label' tag. We can do
    // this by adding the 'edit-mode' class to the list item
    // for the task.
  
  // mark tasks as complete:
    // When we check the checkbox associated with each task,
    // that task should switch from the todo lis to the 
    // completed unordered list 'completed-tasks', and vice versa.
    
  // mark a task as incomplete:
    // see above.
  
  // delete existing tasks:
    // When we click the delete button on a task, that task
    // should be removed from the DOM tree
    
// Perform:

// Let's capture all the elements we'll need from the DOM
// tree and store them into variables:

var taskInput = document.getElementById('new-task'); // id='new-task'

var addButton = document.getElementsByTagName('button')[0]; // first button

var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // id='incomplete-tasks'

var completedTasksHolder = document.getElementById('completed-tasks'); // id='completed-tasks'

var createNewTaskElement = function(taskString) {
  
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  
  // each element needs modifiying
  
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  label.innerText = taskString;
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  
  
  // each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};

// Now we're going to make all the actions we want to perform
// into seperate functions:

//same thing
//function addtask () {
//  
//}




var addTask = function() {
  console.log('add task...');
  
  // Take the text in the editbox and create the task
  var listItem = createNewTaskElement(taskInput.value);
  
  // Bind our events to the task
  bindTaskEvents(listItem, taskCompleted);
  
  //append list item to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  
  // Clear the input box
  taskInput.value = '';
  
};

var editTask = function() {
  console.log('edit task...');
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text');
  var label = listItem.querySelector('label');
  var containsClass = listItem.classList.contains('editMode');
  
  if(containsClass) {
    label.innerText = editInput.value;
    
  } else {
    editInput.value = label.innerText;
    
  }
  
  listItem.classList.toggle("editMode");
};
  
var deleteTask = function () {
  console.log('delete task...');
  var listItem = this.parentNode;
  listItem.remove();
  // Instead of the remove method, Chalkey used
  // an extra step, referring to the unordered list:
  // var ul = listItem.parentNode;
  // ul.removeChild(listItem);
  // but remove() removes a child from it's parent
};   
  
var taskCompleted = function () {
  console.log('Complete task...');
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  listItem.querySelector('input[type=checkbox]').onchange = taskIncomplete;
  //bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('task incomplete...');
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  listItem.querySelector('input[type=checkbox]').onchange = taskCompleted;
  //bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bindListEvents...');
// select taskList item's children
   var checkBox =  taskListItem.querySelector('input[type=checkbox]');
   var editButton = taskListItem.querySelector('button.edit');
   var deleteButton = taskListItem.querySelector('button.delete');
// bind edit task to edit button
   editButton.onclick = editTask;
// bind deleteTask to delete button
   deleteButton.onclick = deleteTask;
// bind taskCompleted to the checkBoxEventHandler we passed in as an argument
   checkBox.onchange = checkBoxEventHandler;

};


// Set the click handler to the addTask function
  
addButton.onclick = addTask;

// cycle over the incompleteTasksHolder ul items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // bind events to list handler's children (taskIncomplete)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// cycle over the completedTasksHolder ul items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  // bind events to list handler's children (taskComplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




  
  
  
  
  
  
  
  
  
  
  
  
