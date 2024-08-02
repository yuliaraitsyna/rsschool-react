'use client'

import React, { useContext, useEffect, useMemo } from 'react';
import ThemeContext from '../theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import ErrorButton from '../error_handling/ErrorButton';
import ThemeToggleButton from '../theme/ThemeToggleButton';
import Search from '../search/Search';
import Details from '../details/Details';
import List from '../list/List';
import Flyout from '../flyout/Flyout';
import { RootState } from '../redux/store';
import { setTotalPages } from '../redux/pageSlice';
import { setCards } from '../redux/cardsSlice';
import { useGetDataByPageQuery } from '../redux/starWarsAPI';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Person } from '@models/Person';

interface AppProps {
  initialData: Person[],
}

const App: React.FC<AppProps> = ({initialData}) => {
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null);
  const themeContext = useContext(ThemeContext);
  const router = useRouter();

  const currentPage = useSelector((state: RootState) => state.pages.currentPage);
  const cards = useSelector((state: RootState) => state.cards.displayedCards);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const pageParam = params.get('page') || '1';
  const detailsParam = params.get('details');

  const { data, error, isLoading } = useGetDataByPageQuery(Number(pageParam));

  useEffect(() => {
    if (!params.has('page')) {
      router.replace(`/?page=${currentPage}`, undefined);
    }
  }, [params, router, currentPage]);

  useEffect(() => {
    if (detailsParam) {
      setSelectedItemId(parseInt(detailsParam));
    } else {
      setSelectedItemId(null);
    }
  }, [detailsParam]);

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(Math.ceil(data.count / 10)));
      dispatch(setCards(data.results));
    } else if (error) {
      console.error("Error fetching data:", error);
    }
    router.replace(`/?page=${currentPage}`);
  }, [data, error, currentPage, dispatch, isLoading, router]);

  const handleItemClick = (newItemId: number) => {
    setSelectedItemId(newItemId);
    router.replace(`/?page=${currentPage}&details=${newItemId}`, undefined );
  };

  const handleCloseDetails = () => {
    setSelectedItemId(null);
    router.replace(`/?page=${currentPage}`, undefined );
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
        <h1>Star Wars Search</h1>
        <Search />
      </div>
      <main>
        <section className='left-section'>
          <h3>Search Results</h3>
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
};

export default App;
