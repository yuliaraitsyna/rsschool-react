import React, { useContext, useEffect } from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { Person } from "./models/Person";
import ErrorButton from './error_handling/ErrorButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Details from './details/Details';
import ThemeToggleButton from './components/theme/ThemeToggleButton';
import ThemeContext from './components/theme/ThemeContext';
import Flyout from './components/flyout/Flyout';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPages } from './redux/pageSlice';
import { RootState } from './redux/store';

const App: React.FC = () => {
  const [result, setResult] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedItemId, setSelectedItemId] = React.useState(0);
  const themeContext = useContext(ThemeContext);

  const currentPage = useSelector((state: RootState) => state.pages.currentPage);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageParam = query.get('page');
  const detailsParam = query.get('details');

  useEffect(() => {
    if (!pageParam) {
      navigate(`/rsschool-react/?page=1`, { replace: true });
    }
  }, [pageParam, navigate]);

  useEffect(() => {
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
        dispatch(setTotalPages(Math.ceil(data.count / 10)));
        navigate(`/rsschool-react/?page=${currentPage}`);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [currentPage, dispatch, navigate, pageParam]);

  useEffect(() => {
    if (detailsParam) {
      setSelectedItemId(parseInt(detailsParam, 10));
    } else {
      setSelectedItemId(0);
    }
  }, [detailsParam]);

  const handleSearchResults = (result: Person[]) => {
    setResult(result);
  };

  const handleLoadingState = (loading: boolean) => {
    setLoading(loading);
  };

  const handleItemClick = (newItemId: number) => {
    navigate(`/rsschool-react/?page=${currentPage}&details=${newItemId}`);
  };

  const handleCloseDetails = () => {
    navigate(`/rsschool-react/?page=${currentPage}`);
  };

  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;

  return (
    <div className={`app ${theme}`}>
      <div className='upper-component'>
        <ErrorButton />
        <ThemeToggleButton />
        <h1>Star Wars search</h1>
        <Search onSearchResult={handleSearchResults} setLoading={handleLoadingState} />
      </div>
      <main>
        <section className='left-section'>
          <h3>Search results</h3>
          {loading ? <div>Loading...</div> : (
            <List result={result} onItemClick={handleItemClick} />
          )}
        </section>
        <section className='right-section'>
          {
            selectedItemId ? 
            <>
              <h3>Details</h3>
              <Details id={selectedItemId} onClose={handleCloseDetails}/>
            </> : 
            null
          }
        </section>
        <Flyout></Flyout>
      </main>
    </div>
  );  
}

export default App;
