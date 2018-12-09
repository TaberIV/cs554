import React from "react";
import { Link } from "react-router-dom";
import DeleteQuote from "./DeleteQuote";

const Quote = ({ quote: { id, quote } }) => (
  <div className="quoteList__quote">
    <p>{quote}</p>
    <Link to={`edit/${id}`}>Edit</Link>
    <DeleteQuote id={id} />
  </div>
);

export default Quote;
