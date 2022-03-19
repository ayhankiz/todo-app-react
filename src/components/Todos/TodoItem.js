import styles from "./TodoItem.module.css";

export default function TodoItem(props) {
  const saveCheckedValue = function () {
    props.onCheck(props.id);
  };

  return (
    <li className={styles.item}>
      <div className={styles.round}>
        <input type="checkbox" id={props.id} className="checkbox" />
        <label htmlFor={props.id} onClick={saveCheckedValue}></label>
      </div>
      <span>{props.text}</span>
    </li>
  );
}
