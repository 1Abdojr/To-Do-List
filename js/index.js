document.addEventListener("DOMContentLoaded", function () {
  var taskInput = document.querySelector("#taskInput");
  var addTask = document.querySelector("#addTask");
  var filterAll = document.querySelector("#filterAll");
  var filterActive = document.querySelector("#filterActive");
  var filterCompleted = document.querySelector("#filterCompleted");
  var taskList = [];

  if(localStorage.getItem("tasks")) {
    taskList = JSON.parse(localStorage.getItem("tasks"))
    displayTask();
  }

  addTask.addEventListener("click", function () {
    var taskName = taskInput.value.trim();
    if (taskName === "") return;

    var task = { name: taskName, isDone: false };
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList))
    displayTask();
    clearInput();
  });

  filterAll.addEventListener("click", function () {
  displayTask("all");
  updateTabStyles("filterAll");
  });

  filterActive.addEventListener("click", function () {
  displayTask("active");
  updateTabStyles("filterActive");
  });

  filterCompleted.addEventListener("click", function () {
  displayTask("completed");
  updateTabStyles("filterCompleted");
  });


  function displayTask(filter = "all") {
  var container = "";
  var list = [];

  if (filter === "all") {
    list = taskList;
  } else if (filter === "active") {
    list = taskList.filter(task => !task.isDone);
  } else if (filter === "completed") {
    list = taskList.filter(task => task.isDone);
  }

  for (var i = 0; i < list.length; i++) {
    var task = list[i];
    var realIndex = taskList.indexOf(task);

    container += `
      <ul class="card task-list p-2 mt-3 mx-3 list-unstyled">
        <div class="d-flex justify-content-between mx-3">
          <h6 class="${task.isDone ? 'text-decoration-line-through text-success' : ''}">
            ${task.name}
          </h6>
          <div class="icons d-flex align-items-center gap-3">
            ${task.isDone ? `
              <i class="fa-solid fa-circle-check text-success"></i>
            ` : `
              <i class="fa-solid fa-trash text-danger mr-5" onclick="deleteTask(${realIndex})"></i>
              <i class="fa-solid fa-check text-success" onclick="doneTask(${realIndex})"></i>
            `}
          </div>
        </div>
      </ul>
    `;
  }

  document.querySelector(".all").innerHTML = container;
}


  window.deleteTask = function(index) {
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    displayTask();
  }

  window.doneTask = function(index) {
    taskList[index].isDone = true;
    localStorage.setItem("tasks", JSON.stringify(taskList))
    displayTask();
  }

  function updateTabStyles(activeId) {
  [filterAll, filterActive, filterCompleted].forEach(tab => {
    tab.classList.remove("text-primary");
    tab.classList.add("text-muted");
  });

  document.getElementById(activeId).classList.remove("text-muted");
  document.getElementById(activeId).classList.add("text-primary");
  }


  function clearInput() {
    taskInput.value = "";
  }
});
