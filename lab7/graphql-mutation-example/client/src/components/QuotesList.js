import React from "react";
import Quote from "./Quote";
import NewQuoteForm from "./NewQuoteForm";

const QuotesList = ({ quotes }) => (
  <div className="quoteList">
    {quotes.map(quote => (
      <Quote key={quote.id} quote={quote} />
    ))}

    <NewQuoteForm />
  </div>
);

export default QuotesList;
