import { BrowserRouter } from "react-router-dom"
import List from "../components/list/List"
import { render, screen } from "@testing-library/react";
import { mockPeople } from "../mocks/mockPeople";
import { Provider } from "react-redux";
import store from "../redux/store";

test('Renders specified number of cards', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <List result={mockPeople} onItemClick={() => {}}></List>
            </Provider>
        </BrowserRouter>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockPeople.length);
});

test('An appropriate message is displayed if no cards are present', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <List result={[]} onItemClick={() => {}}></List>
            </Provider>
        </BrowserRouter>
    );

    expect(screen.getByText("No results found.")).toBeInTheDocument();
})