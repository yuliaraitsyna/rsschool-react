'use client'

import React, { useContext, useEffect, useCallback } from 'react';
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

const App: React.FC = () => {
  return (<h1>Hello</h1>)
};

export default App;
