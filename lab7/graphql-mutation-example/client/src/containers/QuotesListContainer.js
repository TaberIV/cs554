import React, { Component } from "react";
import QuotesList from "../components/QuotesList";
import ApiService from "../ApiService";

class QuotesListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { quotes: [] };
  }

  async componentDidMount() {
    try {
      const quotes = await ApiService.getQuotes();
      this.setState({ quotes });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return <QuotesList quotes={this.state.quotes} />;
  }
}

export default QuotesListContainer;
