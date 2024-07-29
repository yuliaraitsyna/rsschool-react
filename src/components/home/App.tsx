import React, { useContext, useEffect } from 'react';
import ThemeContext from "../theme/ThemeContext"
import { useDispatch, useSelector } from 'react-redux';
import ErrorButton from '../error_handling/ErrorButton'
import ThemeToggleButton from '../theme/ThemeToggleButton'
import Search from "../search/Search"
import Details from "../details/Details"
import List from "../list/List"
import Flyout from "../flyout/Flyout"
import { RootState } from '../redux/store'
import { setTotalPages } from '../redux/pageSlice';
import { setCards } from '../redux/cardsSlice';
import { useGetDataByPageQuery } from '../redux/starWarsAPI';


const App: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null);
  const themeContext = useContext(ThemeContext);

  const currentPage = useSelector((state: RootState) => state.pages.currentPage);
  const cards = useSelector((state: RootState) => state.cards.displayedCards);

  const dispatch = useDispatch();

  const query = new URLSearchParams();
  const pageParam = query.get('page');
  const detailsParam = query.get('details');

  const { data, error, isLoading } = useGetDataByPageQuery(currentPage);

  useEffect(() => {
    if (!pageParam) {
    }
  }, [pageParam]);

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(Math.ceil(data.count / 10)));
      dispatch(setCards(data.results));
    }
    else if(error) {
      throw error;
    }

  }, [data, error, currentPage, dispatch, isLoading]);

  useEffect(() => {
    if (detailsParam) {
      setSelectedItemId(parseInt(detailsParam, 10));
    } else {
      setSelectedItemId(null);
    }
  }, [detailsParam]);

  const handleItemClick = (newItemId: number) => {
    
  };

  const handleCloseDetails = () => {
    
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

