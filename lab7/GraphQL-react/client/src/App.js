import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import ApiService from "./ApiService";
import UserListContainer from "./containers/UserListContainer";
import TodoListContainer from "./containers/TodoListContainer";
import TodoForm from "./forms/TodoForm";
import TodoEdit from "./forms/TodoEdit";
import "./styles/style.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = { users: [], mounted: false };
  }

  async componentDidMount() {
    const users = await ApiService.getUsers({
      first_name: "",
      last_name: ""
    });

    this.setState({ users, mounted: true });
  }

  render() {
    return (
      <main>
        <header>
          <Link to="/">
            <h1>Todo Application</h1>
          </Link>
        </header>

        <div className="todos">
          <Switch>
            <Route exact path="/" component={UserListContainer} />
            <Route path="/todos/:userId" component={TodoListContainer} />
            <Route path="/edit/:userId/:taskId" component={TodoEdit} />
          </Switch>
        </div>

        <div className="newTodo">
          <h2>New Todo</h2>
          {this.state.mounted && (
            <TodoForm
              submitHandler={this.createTodo}
              users={this.state.users}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
