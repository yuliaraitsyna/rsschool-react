import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "../components/search/Search";
import { Provider } from "react-redux";
import store from "../components/redux/store";
import '@testing-library/jest-dom';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

test("Clicking the Search button saves the entered value to the local storage", async () => {
    render(
      <Provider store={store}>
        <Search  />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe('"test value"');
    });
});

test("Component retrieves the value from the local storage upon mounting", async () => {
    localStorage.setItem('searchQuery', '"saved value"');

    render(
      <Provider store={store}>
        <Search  />
      </Provider>
    );

    await waitFor(() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('saved value');
    });
});