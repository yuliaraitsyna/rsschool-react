import React from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { Person } from "./models/Person";
import ErrorButton from './error_handling/ErrorButton';

interface Props {}

const App: React.FC<Props> = () => {
  const [result, setResult] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then(data => {
          setTimeout(() => {
            setResult(data.results);
            setLoading(false);
          }, 1000)
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
  }, []);

  const handleSearchResults = (result: Person[]) => {
    setResult(result);
  };

  const handleLoadingState = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <div className='app'>
      <div className='upper-component'>
        <ErrorButton></ErrorButton>
        <h1>Star Wars search</h1>
        <Search onSearchResult={handleSearchResults} setLoading={handleLoadingState}></Search>
      </div>
      {loading ? <div>Loading...</div> : <List result={result}></List>}
    </div>
  );
}

export default App;
