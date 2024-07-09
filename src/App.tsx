import React from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { Person } from "./models/Person";
import ErrorButton from './error_handling/ErrorButton';

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
        setTimeout(() => {
          this.setState({ result: data.results, loading: false });
        }, 1000)
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
        <ErrorButton></ErrorButton>
        <h1>Star Wars search</h1>
        <Search onSearchResult={this.handleSearchResults} setLoading={this.handleLoadingState}></Search>
        {loading ? <div>Loading...</div> : <List result={result}></List>}
      </div>
    );
  }
}

export default App;
