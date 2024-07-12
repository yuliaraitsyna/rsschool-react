import React, { useEffect } from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { Person } from "./models/Person";
import ErrorButton from './error_handling/ErrorButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Details from './details/Details';

const App: React.FC = () => {
  const [result, setResult] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [selectedItemId, setSelectedItemId] = React.useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pageParam = query.get('page');
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    setPage(currentPage);

    setLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then(data => {
          setResult(data.results);
          setTotalPages(Math.ceil(data.count / 10));
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
        
  }, [location.search]);

  const handleSearchResults = (result: Person[]) => {
    setResult(result);
  };

  const handleLoadingState = (loading: boolean) => {
    setLoading(loading);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };

  const handleItemClick = (newItemId: number) => {
    setSelectedItemId(newItemId);
    navigate(`/?page=${page}/details/${newItemId}`);
  };

  return (
    <div className='app'>
      <div className='upper-component'>
        <ErrorButton />
        <h1>Star Wars search</h1>
        <Search onSearchResult={handleSearchResults} setLoading={handleLoadingState} />
      </div>
      <main>
        <section className='left-section'>
          <h3>Search results</h3>
          {loading ? <div>Loading...</div> : (
            <List result={result} currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} onItemClick={handleItemClick}/>
          )}
        </section>
        <section className='right-section'>
          <h3>Details</h3>
          {selectedItemId ? <Details id={selectedItemId} /> : <div>Select an item to view details</div>}
        </section>
      </main>
    </div>
  );  
}

export default App;
