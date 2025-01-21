import { Component, Fragment, useEffect, useState } from 'react';

import { Users } from './Users';

const USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

// You can also define components using classes instead of functions.
// It's not that common anymore and React recommends to use function components nowadays,
// but it's good to know this is possible, because some existing projects use them.
// https://react.dev/reference/react/Component#defining-a-class-component
// Note that hooks (like useState) are not supported inside class components.

export class UserFinder extends Component {
  // Initialize a class component's state like this
  state = {
    searchTerm: '',
    filteredUsers: [],
  };

  // You can add lifecycle methods to handle side effects (e.g. fetch data from a backend or a database)
  // https://react.dev/reference/react/Component#adding-lifecycle-methods-to-a-class-component

  componentDidMount() {
    // The componentDidMound method can be used to setup server connections and fetch initial data from the backend.
    this.setState({ filteredUsers: USERS });
  }

  componentDidUpdate(prevProps, prevState) {
    // The componentDidUpdate method can be used to fetch new data from the backend when the state has changed.
    if (this.state.searchTerm !== prevState.searchTerm) {
      this.setState({
        filteredUsers: USERS.filter((user) => user.name.includes(this.state.searchTerm)),
      });
    }
  }

  componentWillUnmount() {
    // The componentWillUnmount method can be used to execute cleanup logic, e.g. to close server connections.
  }

  // Define event handlers using the arrow function syntax to avoid issues with 'this'
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

  handleChangeSearchTerm = (event) => {
    // Update the state using this.setState
    this.setState((prevState) => ({
      // ...prevState,  <-- You don't need this because React will merge your old state with the new state by default.
      searchTerm: event.target.value,
    }));
  };

  render() {
    return (
      <Fragment>
        <div>
          <input type="search" placeholder="Filter users..." onChange={this.handleChangeSearchTerm} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// Equivalent function component
export function UserFinder2() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // This could also be a request to the backend
    const filteredUsers = USERS.filter((user) => user.name.includes(searchTerm));
    setFilteredUsers(filteredUsers);
  }, [searchTerm]);

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div>
        <input type="search" placeholder="Filter users..." onChange={handleChangeSearchTerm} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
}
