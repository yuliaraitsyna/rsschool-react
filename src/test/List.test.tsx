import List from "../components/list/List"
import { render, screen } from "@testing-library/react";
import { mockPeople } from "../mocks/mockPeople";
import { Provider } from "react-redux";
import store from "../components/redux/store";
import '@testing-library/jest-dom';
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "src/mocks/mockRouter";

test('Renders specified number of cards', () => {
    const mockOnItemClick = jest.fn();
    render(
        <RouterContext.Provider value={mockRouter}>
            <Provider store={store}>
                <List result={mockPeople} onItemClick={mockOnItemClick}></List>
            </Provider>
        </RouterContext.Provider>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockPeople.length);
});

test('An appropriate message is displayed if no cards are present', () => {
    const mockOnItemClick = jest.fn();
    render(
        <RouterContext.Provider value={mockRouter}>
            <Provider store={store}>
                <List result={[]} onItemClick={mockOnItemClick}></List>
            </Provider>
        </RouterContext.Provider>
    );

    expect(screen.getByText("No results found.")).toBeInTheDocument();
})