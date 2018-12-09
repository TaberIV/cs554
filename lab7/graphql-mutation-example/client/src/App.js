import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import QuotesListContainer from "./containers/QuotesListContainer";
import "./App.css";
import EditQuote from "./components/EditQuote";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Chuck Norris Quotes</h1>
        </header>

        <Switch>
          <Route path="/" exact component={QuotesListContainer} />
          <Route path="/edit/:quoteId" component={EditQuote} />
        </Switch>
      </div>
    );
  }
}

export default App;
