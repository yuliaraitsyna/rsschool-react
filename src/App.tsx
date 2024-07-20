import React, { useContext, useEffect } from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import ErrorButton from './error_handling/ErrorButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Details from './components/details/Details';
import ThemeToggleButton from './components/theme/ThemeToggleButton';
import ThemeContext from './components/theme/ThemeContext';
import Flyout from './components/flyout/Flyout';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPages } from './redux/pageSlice';
import { RootState } from './redux/store';
import { useGetDataByPageQuery } from './redux/starWarsAPI';
import { setCards } from './redux/cardsSlice';

const App: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null);
  const themeContext = useContext(ThemeContext);

  const currentPage = useSelector((state: RootState) => state.pages.currentPage);
  const cards = useSelector((state: RootState) => state.cards.displayedCards);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageParam = query.get('page');
  const detailsParam = query.get('details');

  const { data, error, isLoading } = useGetDataByPageQuery(currentPage);

  useEffect(() => {
    if (!pageParam) {
      navigate(`/rsschool-react/?page=1`, { replace: true });
    }
  }, [pageParam, navigate]);

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(Math.ceil(data.count / 10)));
      dispatch(setCards(data.results));
    }
    else if(error) {
      throw error;
    }

    navigate(`/rsschool-react/?page=${currentPage}`);
  }, [data, error, currentPage, dispatch, navigate, isLoading]);

  useEffect(() => {
    if (detailsParam) {
      setSelectedItemId(parseInt(detailsParam, 10));
    } else {
      setSelectedItemId(null);
    }
  }, [detailsParam]);

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
        <Search />
      </div>
      <main>
        <section className='left-section'>
          <h3>Search results</h3>
          {isLoading ? <div>Loading...</div> : (
            <List result={cards} onItemClick={handleItemClick} />
          )}
          {error && <div>Error fetching data</div>}
        </section>
        <section className='right-section'>
          {selectedItemId !== null && (
            <>
              <h3>Details</h3>
              <Details id={selectedItemId} onClose={handleCloseDetails} />
            </>
          )}
        </section>
        <Flyout />
      </main>
    </div>
  );
}

export default App;