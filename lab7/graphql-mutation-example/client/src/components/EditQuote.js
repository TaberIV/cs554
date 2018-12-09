import React, { Component } from "react";
import ApiService from "../ApiService";

class EditQuote extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.quoteId;

    this.state = { quote: "" };
  }

  async componentDidMount() {
    try {
      const id = this.id;
      const quotes = await ApiService.getQuotes();

      const { quote } = quotes.find(quote => quote.id === id);

      this.setState({ quote });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const id = this.id;
    const { quote } = this.state;

    if (quote.trim() === "") {
      return;
    }

    const input = { id, quote };

    try {
      await ApiService.updateQuote({ input });
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { quote } = this.state;

    return (
      <form className="newQuoteForm" onSubmit={this.handleSubmit}>
        <label>
          Edited Quote:
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

export default EditQuote;
