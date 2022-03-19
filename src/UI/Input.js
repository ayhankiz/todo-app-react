import { useRef, useState, useEffect } from "react";

import styles from "./Input.module.css";

export default function Input(props) {
  const [error, setError] = useState("");
  const todoValue = useRef("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 4000);
  }, [error]);

  const submitHandler = function (e) {
    e.preventDefault();

    if (todoValue.current.value === "") {
      setError("Field can't be empty");
      return;
    }

    props.onAddTodo(todoValue.current.value);
    todoValue.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {error && <div className={styles.error}>{error}</div>}
      <input
        ref={todoValue}
        type="text"
        placeholder="Create a new todo..."
        aria-placeholder="Create a new todo..."
      />
    </form>
  );
}
