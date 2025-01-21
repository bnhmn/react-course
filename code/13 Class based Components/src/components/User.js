import { Component } from 'react';

export class User extends Component {
  render() {
    return <li className="user">{this.props.name}</li>;
  }
}

// Equivalent function component
export function User2(props) {
  return <li className="user">{props.name}</li>;
}
