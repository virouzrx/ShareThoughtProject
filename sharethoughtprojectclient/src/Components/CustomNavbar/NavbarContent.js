import React from 'react';
import axios from 'axios';

export default class NavbarContent extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://locahost:5001/api/v1/user/9ecac069-8cfc-4cac-8056-87093fb9c57c`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(this.state.persons);
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.name}</li>
            )
        }
      </ul>
    )
  }
}