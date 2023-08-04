import "./styles.css";

function ToDoList() {
  var TODOLIST = [];
  var InputElm;
  var TodoListElm;

  this.getInputBox = function () {
    var inputBox = document.createElement("div");
    inputBox.classList = "inputBox";
    InputElm = document.createElement("input");
    InputElm.setAttribute("type", "text");
    InputElm.classList = "input";
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.innerHTML = "Add";
    btn.classList = "btnAddTodo";
    btn.addEventListener("click", this.addTodo);
    inputBox.appendChild(InputElm);
    inputBox.appendChild(btn);
    return inputBox;
  };

  this.getTodoListBox = function () {
    var tabs = document.createElement("div");
    tabs.classList = "tabs";
    var tab1 = document.createElement("div");
    tab1.classList = "tab";
    var title1 = document.createElement("h4");
    title1.classList = "tabHeader";
    title1.innerHTML = "Todo List";
    tab1.appendChild(title1);

    TodoListElm = document.createElement("ul");
    TodoListElm.classList = "todoList";
    var li = this.getDefaultItem();
    TodoListElm.appendChild(li);
    tab1.appendChild(TodoListElm);
    tabs.appendChild(tab1);
    return tabs;
  };
  this.getDefaultItem = function () {
    var li = document.createElement("li");
    li.classList = "itemDefault";
    var text = document.createElement("span");
    text.classList = "text";
    text.innerHTML = "No List Item yet!";
    li.appendChild(text);
    return li;
  };

  this.init = function () {
    var app = document.getElementById("app");
    var todoBox = document.createElement("div");
    todoBox.classList = "todoBox";
    var inputBox = this.getInputBox();
    var todoListBox = this.getTodoListBox();
    todoBox.appendChild(inputBox);
    todoBox.appendChild(todoListBox);
    app.append(todoBox);
  };

  this.addTodo = function () {
    var self = this;
    var title = InputElm.value;
    var li = document.createElement("li");
    li.classList = "item";
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList = "checkbox";
    checkbox.addEventListener(
      "click",
      () => {
        li.classList.toggle("done");
      },
      false
    );
    li.appendChild(checkbox);
    var text = document.createElement("span");
    text.classList = "text";
    text.innerHTML = title;
    var editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.classList = "editInput hide";
    var btnContainer = document.createElement("span");
    btnContainer.classList = "btnActions";
    var btn1 = document.createElement("button");
    btn1.classList = "btnItem";
    btn1.innerHTML = "Edit";
    btn1.addEventListener(
      "click",
      function () {
        text.classList.add("hide");
        editInput.classList.remove("hide");
        editInput.value = text.innerHTML;
        btn1.classList.add("hide");
        btn3.classList.remove("hide");
      },
      false
    );
    var btn3 = document.createElement("button");
    btn3.classList = "btnItem hide";
    btn3.innerHTML = "Save";
    btn3.addEventListener(
      "click",
      function () {
        editInput.classList.add("hide");
        text.classList.remove("hide");
        text.innerHTML = editInput.value;
        btn3.classList.add("hide");
        btn1.classList.remove("hide");
      },
      false
    );
    var btn2 = document.createElement("button");
    btn2.classList = "btnItem";
    btn2.innerHTML = "Delete";
    btn2.addEventListener(
      "click",
      function () {
        var item = this.parentNode.parentNode;
        TodoListElm.removeChild(item);
        var listItems = document.getElementsByClassName("item");
        if (!listItems.length) {
          console.log(self);
          var liDefault = self.getDefaultItem();
          TodoListElm.appendChild(liDefault);
        }
      },
      false
    );
    btnContainer.appendChild(btn1);
    btnContainer.appendChild(btn3);
    btnContainer.appendChild(document.createTextNode(" | "));
    btnContainer.appendChild(btn2);
    btnContainer.classList = "btnActions";
    li.appendChild(text);
    li.appendChild(editInput);
    li.appendChild(btnContainer);
    li.addEventListener(
      "click",
      function (evt) {
        if (evt.target.tagName === "LI" && text.classList.contains("hide")) {
          text.innerText = editInput.value;
          editInput.value = "";
          editInput.classList.add("hide");
          text.classList.remove("hide");
           btn3.classList.add("hide");
           btn1.classList.remove("hide");
        }
      },
      false
    );
    var liDefault = document.getElementsByClassName("itemDefault");
    if (liDefault.length) {
      TodoListElm.removeChild(liDefault[0]);
    }
    TodoListElm.appendChild(li);
    InputElm.value = "";
  }.bind(this);
}

var todo = new ToDoList();
todo.init();
