import React from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { Person } from "./models/Person";
import ErrorButton from './error_handling/ErrorButton';
import { useLocation, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [result, setResult] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
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
          setTimeout(() => {
            setResult(data.results);
            setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 results per page
            setLoading(false);
          }, 1000)
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

  return (
    <div className='app'>
      <div className='upper-component'>
        <ErrorButton />
        <h1>Star Wars search</h1>
        <Search onSearchResult={handleSearchResults} setLoading={handleLoadingState} />
      </div>
      {loading ? <div>Loading...</div> : (
        <>
          <List result={result} currentPage = {page} totalPages={totalPages} onPageChange = {handlePageChange}/>
        </>
      )}
    </div>
  );
}

export default App;
