import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "../components/search/Search";

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
      <Search  />
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
      <Search />
    );

    await waitFor(() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('saved value');
    });
});

