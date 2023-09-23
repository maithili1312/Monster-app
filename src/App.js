import React, { Component } from 'react';
import SearchBox from './components/search-box/search-box.jsx';
import CardList from './components/card-list/card-list.jsx';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        this.setState({ monsters: users });
      });
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
  });
};

render() {
  const { monsters, searchField } = this.state;

  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(searchField)
  );

    return (
      <div className="App">

        <h1 className="App-title">Monsters Rolodex</h1>
        <SearchBox 
        className='monsters-search-box'
        onChangeHandler={this.onSearchChange} placeholder='search monsters' />
        <CardList monsters={filteredMonsters} />

        {filteredMonsters.map((monster) => (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;