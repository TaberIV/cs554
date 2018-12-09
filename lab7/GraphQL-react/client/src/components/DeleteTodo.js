import React from "react";
import ApiService from "../ApiService";

const DeleteTodo = props => {
  const id = props.id;

  return <button onClick={() => ApiService.deleteTodo({ id })}>X</button>;
};

export default DeleteTodo;
