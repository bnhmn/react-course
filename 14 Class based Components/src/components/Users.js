import { Component, useState } from 'react';
import { User } from './User';

export class Users extends Component {
  state = {
    showUsers: true,
  };

  toggleShowUsers = () => {
    this.setState((prevState) => ({
      showUsers: !prevState.showUsers,
    }));
  };

  render() {
    return (
      <div className="users">
        <button onClick={this.toggleShowUsers}>{this.state.showUsers ? 'Hide' : 'Show'} Users</button>
        {this.state.showUsers && (
          <ul>
            {this.props.users.map((user) => (
              <User key={user.id} name={user.name} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

// Equivalent function component
export function Users2({ users }) {
  const [showUsers, setShowUsers] = useState(true);

  const toggleShowUsers = () => {
    setShowUsers((prevState) => !prevState);
  };

  return (
    <div className="users">
      <button onClick={toggleShowUsers}>{showUsers ? 'Hide' : 'Show'} Users</button>
      {showUsers && (
        <ul>
          {users.map((user) => (
            <User key={user.id} name={user.name} />
          ))}
        </ul>
      )}
    </div>
  );
}
