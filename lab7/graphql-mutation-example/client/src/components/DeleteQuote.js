import React from "react";
import ApiService from "../ApiService";

const DeleteQuote = ({ id }) => (
  <button onClick={() => ApiService.deleteQuote({ input: { id } })}>X</button>
);

export default DeleteQuote;
