import React from "react";
import ApiService from "../ApiService";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.users[0],
      title: ""
    };
  }

  handleChange = event => {
    if (event.target.name === "user") {
      const id = event.target.value;
      const user = this.props.users.find(user => user.id === id);

      this.setState({ user });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { user, title } = this.state;

    if (title.trim() === "" || user === "") {
      return;
    }

    const newTodo = {
      user: user.id,
      title
    };

    await ApiService.createTodo(newTodo);
    this.setState({ title: "" });
  };

  render() {
    const usersSelect = this.props.users.map(user => {
      const userName = user.first_name + " " + user.last_name;

      return (
        <option key={`user${user.id}Select`} value={user.id}>
          {userName}
        </option>
      );
    });

    return (
      <form className="user__form" onSubmit={this.handleSubmit}>
        <label>
          User:
          <select
            name="user"
            value={this.state.user}
            onChange={this.handleChange}
          >
            {usersSelect}
          </select>
        </label>

        <label>
          Task Title:
          <input
            type="text"
            name="title"
            value={this.state.title}
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
export default TodoForm;
