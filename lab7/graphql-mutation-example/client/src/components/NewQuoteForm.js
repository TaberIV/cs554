import React, { Component } from "react";
import ApiService from "../ApiService";

class NewQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = { quote: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { quote } = this.state;

    if (quote.trim() === "") {
      return;
    }

    const input = { quote };

    try {
      await ApiService.createQuote({ input });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { quote } = this.state;

    return (
      <form className="newQuoteForm" onSubmit={this.handleSubmit}>
        <label>
          New Quote:
          <input
            type="text"
            name="quote"
            value={quote}
            onChange={this.handleChange}
          />
        </label>

        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    );
  }
}

export default NewQuoteForm;
