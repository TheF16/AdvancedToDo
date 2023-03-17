var numberOfTodos = 3;
var todos = localStorage.getItem("todos");

debugger;
var doneItems = localStorage.getItem("done-items");

if (todos != null) {
  numberOfTodos = localStorage.getItem("numberOfTodos");
  var todosList = $("#sortable");
  todosList.html(todos);
}

if(doneItems != null){
  var doneList = $("#done-items");
  doneList.html(doneItems);
}

// count initial ToDo
countTodos();

// capture click event
document.getElementById("checkAll").addEventListener("click", function () {
  AllDone();
});

var todos = document.querySelectorAll('#sortable li input[type="checkbox"]');
for (var i = 0; i < todos.length; i++) {
  todos[i].addEventListener("change", function () {
    if (this.checked == true) {
      var doneItem = this.parentElement.innerText;
      console.log("done item: " + doneItem);
      done(doneItem);
      countTodos();
    }
  });
}

//capture enter key press
document
  .getElementById("todo-to-add")
  .addEventListener("keypress", function (e) {
    e.preventDefault; // Do not submit form

    if (e.key == "Enter") {
      // check if enter is pressed
      console.log("Enter pressed");
      var todo = document.getElementById("todo-to-add").value;
      console.log(todo);
      addToDo(todo);
    }
  });

// capture click event
document.getElementById("addTODO").addEventListener("click", function () {
  var todo = document.getElementById("todo-to-add").value;
  console.log(todo);
  addToDo(todo);
});

// capture click event on button minus on Already Done
var already_done_elements = document.getElementsByClassName("remove-item");
for (var i = 0; i < already_done_elements.length; i++) {
  already_done_elements[i].addEventListener("click", function () {
    console.log(this.parentElement.innerHTML);
    removeItem(this);
  });
}

// add new todo
function addToDo(todo) {
  createTodo(todo);
  countTodos();
}

// count tasks
function countTodos() {
  $(".count-todos").text(numberOfTodos);
}

//create task
function createTodo(text) {
  var newToDo = (text === "" || text === undefined) ? $("#todo-to-add").val() : text;

  var listOfTodos = $("#sortable");
  var todo = document.createElement("li");
  var toDoDiv = document.createElement("div");
  var toDoLabel = document.createElement("label");
  var toDoInput = document.createElement("input");
  todo.classList.add("ui-state-default");
  toDoDiv.classList.add("checkbox");
  toDoInput.setAttribute("type", "checkbox");
  toDoInput.setAttribute("value", "");
  toDoInput.addEventListener("change", function () {
    if (this.checked == true) {
      var doneItem = this.parentElement.innerText;
      console.log("done item: " + doneItem);
      done(doneItem);
      countTodos();
    }
  });
  toDoLabel.appendChild(toDoInput);
  var textNode = document.createTextNode(newToDo);
  toDoLabel.appendChild(textNode);
  toDoDiv.appendChild(toDoLabel);
  todo.appendChild(toDoDiv);
  listOfTodos.append(todo);

  numberOfTodos++;

  localStorage.setItem("todos", listOfTodos.html());
  localStorage.setItem("numberOfTodos", numberOfTodos);
}

//mark task as done
function done(doneItem) {
  debugger;
  var doneList = $("#done-items");
  var doneLi = document.createElement("li");
  var doneButton = document.createElement("button");
  var doneSpan = document.createElement("span");
  doneSpan.classList.add("fa", "fa-minus-square");
  doneButton.classList.add("remove-item", "btn", "btn-default", "btn-xs", "pull-right");
  doneButton.appendChild(doneSpan);
  doneButton.addEventListener("click", function () {
    console.log(this.parentElement.innerHTML);
    removeItem(this);
  });
  doneLi.appendChild(document.createTextNode(doneItem));
  doneLi.appendChild(doneButton);
  doneList.append(doneLi);

  var toDo = $("#sortable li:contains('" + doneItem + "')");
  toDo.remove();

  numberOfTodos--;

  localStorage.setItem("todos", $("#sortable").html());
  localStorage.setItem("done-items", $("#done-items").html());
  localStorage.setItem("numberOfTodos", numberOfTodos);
}

//mark all tasks as done
function AllDone() {
  var todos = document.querySelectorAll('#sortable li input[type="checkbox"]');
  for (var i = 0; i < todos.length; i++) {
    todos[i].checked = true;
    var doneItem = todos[i].parentElement.innerText;
    done(doneItem);
  }
}

//remove done task from list (To Complete)
function removeItem(element) {
  var toDo = element.parentElement;
  toDo.remove();

  localStorage.setItem("done-items", $("#done-items").html());
}
