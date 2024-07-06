import React from 'react'
import './App.css'
import Search from './search/Search';
import { Person } from "./models/Person";

interface Props {

}

interface State {
  result: Person[],
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  handleSearchResults = (result: Person[]) => {
    this.setState({ result });
  };

  render() {
    const {result} = this.state;
    console.log(result);
    return (
      <div className='app'>
        <Search onSearchResult={this.handleSearchResults}></Search>
      </div>
    )
  }
}

export default App
