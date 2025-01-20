import { Component } from 'react';
import { User } from './User';

import classes from './Users.module.css';

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

export class Users extends Component {
  // Initialize a class component's state like this
  state = {
    showUsers: true,
  };

  toggleShowUsers = () => {
    // Update the state using this.setState
    this.setState((prevState) => ({
      // ...prevState,  <-- You don't need this because React will merge your old state with the new state by default.
      showUsers: !prevState.showUsers,
    }));
  };

  render() {
    return (
      <div className={classes.users}>
        <button onClick={this.toggleShowUsers}>{this.state.showUsers ? 'Hide' : 'Show'} Users</button>
        {this.state.showUsers && (
          <ul>
            {USERS.map((user) => (
              <User key={user.id} name={user.name} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

// export function Users() {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleShowUsers = () => {
//     setShowUsers((prevState) => !prevState);
//   };

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleShowUsers}>{showUsers ? 'Hide' : 'Show'} Users</button>
//       {showUsers && (
//         <ul>
//           {USERS.map((user) => (
//             <User key={user.id} name={user.name} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
