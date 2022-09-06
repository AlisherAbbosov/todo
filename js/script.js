let elLoginForm = document.querySelector(".login__form");
let elLoginInput = document.querySelector(".login__input");
let elOverlay = document.querySelector(".overlay");
let elWelcomeText = document.querySelector(".welcome");
let elContainer = document.querySelector(".todo__container");
let elAllResult = document.querySelector(".all__result");
let elComplatedResult = document.querySelector(".complated__result");
let elUncomplatedResult = document.querySelector(".uncomplated__result");
let elButtonsBox = document.querySelector(".buttons__box");
let elAddTodoBtn = document.querySelector(".addtodo__btn");
let elUserName = document.querySelector(".user__name");
let elTodoList = document.querySelector(".todo__list");

// modal
let elTodoForm = document.querySelector(".todo__form");
let elModal = document.querySelector(".add__todo-modal");
let elCloseModal = document.querySelector(".close-modal");
let elInput = document.querySelector(".todo__input");
let elSelectPriority = document.querySelector(".select__priority");
let elSelectCategory = document.querySelector(".select__category");
// user left
let elPriorityList = document.querySelector(".priority__list");
let elCategories = document.querySelector(".categories");

//FUNCTIONS
let closeModal = () => {
  elOverlay.classList.add("hidden");
  elModal.classList.add("hidden");
};

let localBookmarkedMovies = JSON.parse(window.localStorage.getItem("todos"));
const todos = localBookmarkedMovies || [];

// LOGIN
elLoginForm.addEventListener("submit", evt => {
  evt.preventDefault();
  let loginInput = elLoginInput.value;

  elUserName.textContent = loginInput;
  elWelcomeText.textContent = `Hello ${loginInput} `;
});

// ADD TODO BUTTON & SHOW MODAL
elAddTodoBtn.addEventListener("click", () => {
  elOverlay.classList.remove("hidden");
  elModal.classList.remove("hidden");
});

// RENDER TODOS
const renderTodos = function (arr, element) {
  elAllResult.textContent = todos.length;
  elComplatedResult.textContent = todos.filter(todo => todo.isCompleted).length;
  elUncomplatedResult.textContent = todos.filter(
    todo => !todo.isCompleted
  ).length;

  arr.forEach(todo => {
    //CREATE NEW TODO
    let newTodo = document.createElement("li");
    let newTodoText = document.createElement("p");
    let elCheck = document.createElement("input");

    let elClear = document.createElement("button");
    let elIcon = document.createElement("i");

    element.appendChild(newTodo);
    newTodo.appendChild(newTodoText);
    newTodo.appendChild(elCheck);
    newTodo.appendChild(elClear);
    elClear.appendChild(elIcon);

    newTodo.setAttribute("class", "todo__item d-flex");
    newTodoText.setAttribute("class", "todo__text m-0");
    elCheck.setAttribute("class", "checkbox__btn  form-check-input");
    elCheck.setAttribute("type", "checkbox");
    elClear.setAttribute("class", "clear__button");
    elIcon.setAttribute("class", "delete__icon fa fa-trash-alt");

    elCheck.dataset.checkId = todo.id;
    elClear.dataset.todoId = todo.id;
    elIcon.dataset.todoId = todo.id;

    newTodoText.textContent = todo.title;

    if (todo.isCompleted) {
      elCheck.checked = true;
      newTodoText.style.textDecoration = "line-through";
    }
  });
};

// TODO BUTTONS CHECK & DELETE
elTodoList.addEventListener("click", evt => {
  if (
    evt.target.matches(".delete__icon") ||
    evt.target.matches(".clear__button")
  ) {
    let todoBtnId = evt.target.dataset.todoId * 1;

    const foundTodoIndex = todos.findIndex(todo => {
      return todo.id == todoBtnId;
    });
    console.log(foundTodoIndex);
    todos.splice(foundTodoIndex, 1);

    window.localStorage.setItem("todos", JSON.stringify(todos));

    if (todos.length === 0) {
      window.localStorage.removeItem("todos");
    }

    elTodoList.innerHTML = null;

    renderTodos(todos, elTodoList);
  } else if (evt.target.matches(".checkbox__btn")) {
    let todoCheckId = evt.target.dataset.checkId * 1;

    const foundCheckbox = todos.find(function (todo) {
      return todo.id === todoCheckId;
    });
    console.log(todoCheckId);
    foundCheckbox.isCompleted = !foundCheckbox.isCompleted;

    elTodoList.innerHTML = null;

    window.localStorage.setItem("todos", JSON.stringify(todos));

    renderTodos(todos, elTodoList);
  }
});

// ALL & COMPLATED BUTTONS
elButtonsBox.addEventListener("click", evt => {
  if (evt.target.matches("#button__all")) {
    elTodoList.innerHTML = null;

    renderTodos(todos, elTodoList);
  } else if (evt.target.matches("#button__complated")) {
    let compaltedTodos = todos.filter(todo => todo.isCompleted);
    elTodoList.innerHTML = null;

    renderTodos(compaltedTodos, elTodoList);
  } else if (evt.target.matches("#button__uncomplated")) {
    let uncomplatedTodos = todos.filter(todo => !todo.isCompleted);

    elTodoList.innerHTML = null;

    renderTodos(uncomplatedTodos, elTodoList);
  }
});

elTodoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let inputValue = elInput.value.trim();
  let priorityValue = elSelectPriority.value;
  let categoryValue = elSelectCategory.value;

  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
    priority: priorityValue,
    category: categoryValue,
  };
  elTodoList.innerHTML = null;

  todos.push(newTodo);

  window.localStorage.setItem("todos", JSON.stringify(todos));

  elInput.value = null;

  renderTodos(todos, elTodoList);
  console.log(todos);
  closeModal();
});

// CLOSE MODAL
elCloseModal.addEventListener("click", () => closeModal());

document.addEventListener("keydown", evt => {
  if (evt.key === "Escape") {
    closeModal();
  }
});

elOverlay.addEventListener("click", () => closeModal());

renderTodos(todos, elTodoList);

// CHOISE PRIORITY
elPriorityList.addEventListener("click", evt => {
  if (evt.target.matches("#low-btn")) {
    let filteredPriority = todos.filter(todo => todo.priority === "low");

    elTodoList.innerHTML = null;

    renderTodos(filteredPriority, elTodoList);
  } else if (evt.target.matches("#hight-btn")) {
    let filteredPriority = todos.filter(todo => todo.priority === "hight");

    elTodoList.innerHTML = null;

    renderTodos(filteredPriority, elTodoList);
  }
  if (evt.target.matches("#medium-btn")) {
    let filteredPriority = todos.filter(todo => todo.priority === "medium");

    elTodoList.innerHTML = null;

    renderTodos(filteredPriority, elTodoList);
  }
});

// CHOISE CATEGORY
elCategories.addEventListener("click", evt => {
  if (evt.target.matches("#work-btn")) {
    let forWorkTodos = todos.filter(todo => todo.category === "work");
    elTodoList.innerHTML = null;

    renderTodos(forWorkTodos, elTodoList);
  } else if (evt.target.matches("#study-btn")) {
    let forWorkTodos = todos.filter(todo => todo.category === "study");
    elTodoList.innerHTML = null;

    renderTodos(forWorkTodos, elTodoList);
  } else if (evt.target.matches("#home-btn")) {
    let forWorkTodos = todos.filter(todo => todo.category === "home");

    elTodoList.innerHTML = null;

    renderTodos(forWorkTodos, elTodoList);
  }
});
