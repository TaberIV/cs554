import React from "react";
import ApiService from "../ApiService";

class TodoEdit extends React.Component {
  constructor(props) {
    super(props);

    this.userId = parseInt(this.props.match.params.userId, 10);
    this.taskId = String(this.props.match.params.taskId);

    this.state = {
      title: "",
      completed: false
    };
  }

  async componentDidMount() {
    const task = await ApiService.getTodos({
      id: this.taskId
    });

    if (task[0]) {
      const [{ title, completed }] = task;
      this.setState({ title, completed });
    } else {
      console.log(task);
    }
  }

  handleChange = event => {
    if (event.target.name === "completed") {
      this.setState(prevState => {
        return {
          completed: !prevState.completed
        };
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { title, completed } = this.state;

    if (title.trim() === "") {
      return;
    }

    const newTodo = {
      id: this.taskId,
      user: parseInt(this.userId, 10),
      title,
      completed
    };

    await ApiService.updateTodo(newTodo);
    // this.props.history.back();
  };

  render() {
    return (
      <form className="user__form" onSubmit={this.handleSubmit}>
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
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={this.state.completed}
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
export default TodoEdit;
