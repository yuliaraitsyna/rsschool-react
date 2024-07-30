import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockPeople } from "../mocks/mockPeople";
import cardsSlice, { selectCard, setCards, unselectAll, unselectCard } from "../components/redux/cardsSlice";
import pageSlice, { nextPage, prevPage, setTotalPages } from "../components/redux/pageSlice";
import store from "../components/redux/store";
import { Provider } from "react-redux";
import Search from "../components/search/Search";
import List from "../components/list/List";
import '@testing-library/jest-dom';

describe('page slice', () => {
    it('should handle initial state', () => {
        expect(pageSlice.reducer(undefined, { type: 'unknown' })).toEqual({
        currentPage: 1,
        totalPages: 1,
        });
    });

    it('should handle setTotalPages', () => {
        const actual = pageSlice.reducer(undefined, setTotalPages(5));
        expect(actual.totalPages).toEqual(5);
    });

    it('should handle nextPage', () => {
        const actual = pageSlice.reducer({currentPage: 1, totalPages: 10}, nextPage());
        expect(actual.currentPage).toEqual(2);
    });

    it('should handle prevPage', () => {
        const actual = pageSlice.reducer({currentPage: 2, totalPages: 10}, prevPage());
        expect(actual.currentPage).toEqual(1);
    });
});

describe('cards slice', () => {
    it('should handle initial state', () => {
        expect(cardsSlice.reducer(undefined, {type: 'unknown'})).toEqual({
            displayedCards: [],
            selectedCards: [],
        });
    });

    it('should handle selectCard', () => {
        const actual = cardsSlice.reducer(undefined, selectCard(mockPeople[0]));
        expect(actual.selectedCards.length).toEqual(1);
    });

    it('should handle setCards', () => {
        const actual = cardsSlice.reducer(undefined, setCards(mockPeople));
        expect(actual.displayedCards.length).toEqual(mockPeople.length);
    });

    it('should handle unselectCard', () => {
        const actual = cardsSlice.reducer({displayedCards: mockPeople, selectedCards: mockPeople}, unselectCard(1));
        expect(actual.selectedCards.length).toEqual(1);
    });

    it('should handle unselectAll', () => {
        const actual = cardsSlice.reducer({displayedCards: mockPeople, selectedCards: mockPeople}, unselectAll());
        expect(actual.selectedCards.length).toEqual(0);
    });
});


describe('Search Component', () => {
    it('should display search results', async () => {
      render(
        <Provider store={store}>
            <Search/>
            <List result={mockPeople} onItemClick={() => {}}></List>
        </Provider>
      );
  
      fireEvent.change(screen.getByPlaceholderText("Enter your query"), {
        target: { value: 'Luke' },
      });
  
      fireEvent.submit(screen.getByText("Search"));
  
      await waitFor(() => {
        expect(screen.getByText(mockPeople[0].name)).toBeInTheDocument();
        expect(screen.getByText(mockPeople[1].name)).toBeInTheDocument();
      });
    });
});