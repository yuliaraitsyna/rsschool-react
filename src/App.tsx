import React from 'react';
import './App.css';
import Search from './search/Search';
import List from './list/List';
import { Person } from "./models/Person";

interface Props {}

interface State {
  result: Person[],
  loading: boolean
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      result: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchInitialData();
  }

  fetchInitialData = () => {
    this.setState({ loading: true });
    fetch(`https://swapi.dev/api/people/`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ result: data.results, loading: false });
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        this.setState({ loading: false });
      });
  };

  handleSearchResults = (result: Person[]) => {
    this.setState({ result });
  };

  handleLoadingState = (loading: boolean) => {
    this.setState({ loading });
  };

  render() {
    const { result, loading } = this.state;
    return (
      <div className='app'>
        <h1>Star Wars search</h1>
        <Search onSearchResult={this.handleSearchResults} setLoading={this.handleLoadingState}></Search>
        {loading ? <div>Loading...</div> : <List result={result}></List>}
      </div>
    );
  }
}

export default App;
