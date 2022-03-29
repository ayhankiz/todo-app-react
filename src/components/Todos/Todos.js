import { useReducer } from "react";

import Input from "../../UI/Input";
import TodoItem from "./TodoItem";

import styles from "./Todos.module.css";

const ACTIONS = {
  ADD_TODO: "add-todo",
  CLEAR_TODO: "clear-todo",
  SWITCH_TODO_TYPE: "switch-todo-type",
};

const todosInitalState = {
  todos: [
    {todoValue: "test", completed: false, id: 3.123123}
  ],
};
const todosReducer = function (todosState, action) {
  switch (action.type) {
    // 1.) When user adds a todo
    case ACTIONS.ADD_TODO: {
      // 2.) return a new state
      return {
        ...todosState,
        todos: [
          {
            // 3.) with the users input, a completed state (if the todo is clicked or not), and a random id
            todoValue: action.value,
            completed: action.completed,
            id: Math.random(),
          },
          // 4.) add the previous todos to the todos array
          ...todosState.todos,
        ],
      };
    }
    // 1.) switches completed property
    case ACTIONS.SWITCH_TODO_TYPE: {
      // 2.) gets index in array of clicked todo
      const checkedTodoIndex = todosState.todos.findIndex(
        (todo) => todo.id === action.id
      );

      // 3.) get the clicked todo
      const existingTodo = todosState.todos[checkedTodoIndex];

      // 4.) update existingTodo and change completed property
      const updatedTodo = {
        ...existingTodo,
        completed: existingTodo.completed === true ? false : true,
      };

      // 5.) initialize variable "updatedTodos" which contains the previous todos
      const updatedTodos = [...todosState.todos];

      // 6.) replace the clicked todo with the updatedTodo
      updatedTodos[checkedTodoIndex] = updatedTodo;

      return {
        todos: updatedTodos,
      };
    }

    // 1.) delete the completed todos
    case ACTIONS.CLEAR_TODO: {
      const updatedTodos = todosState.todos.filter(
        (todo) => todo.completed === false
      );
      return {
        todos: updatedTodos,
        // TODO -> Add active and completed todos
      };
    }
    default:
      return todosState;
  }
};

export default function TodosState() {
  const [todosState, dispatchTodos] = useReducer(
    todosReducer,
    todosInitalState
  );

  const storeTodoValue = function (value) {
    dispatchTodos({ type: ACTIONS.ADD_TODO, value: value, completed: false });
  };

  const deleteCheckedTodos = function () {
    dispatchTodos({ type: ACTIONS.CLEAR_TODO });
  };

  const saveCheckedValues = function (id) {
    dispatchTodos({ type: ACTIONS.SWITCH_TODO_TYPE, id: id });
  };

  const uncheckedTodos = todosState.todos.filter(
    (todo) => todo.completed === false
  );

  return (
    <div className={styles["todos-container"]}>
      <h1>Todo</h1>
      <Input onAddTodo={storeTodoValue}></Input>
      <ul>
        {todosState.todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.todoValue}
              onCheck={saveCheckedValues}
            ></TodoItem>
          );
        })}
      </ul>
      <div className={styles["todos-container__bottom"]}>
        <span>{uncheckedTodos.length} tasks left</span>
        <div className={styles.buttons}>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <button onClick={deleteCheckedTodos}>Clear Completed</button>
      </div>
    </div>
  );
}
