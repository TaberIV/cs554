import React from "react";
import { Link } from "react-router-dom";
import UserName from "./UserName";
import DeleteTodo from "./DeleteTodo";

const TodoItem = props => {
  const completedClass = props.completed ? "todo__item--completed" : "";

  return (
    <div className={`todo__item ${completedClass}`}>
      <p className="todo__title">{props.title}</p>
      <div className="todo__assignee">
        <div className="todo__ulabel">Assigned To:</div>
        <UserName {...props.user} />
      </div>
      <Link to={`/edit/${props.user.id}/${props.id}`}>Edit</Link>
      {props.completed ? "Completed" : "Incomplete"}
      <DeleteTodo id={props.id} />
    </div>
  );
};

export default TodoItem;
