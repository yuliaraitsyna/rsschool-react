import { BrowserRouter } from "react-router-dom"
import List from "../components/list/List"
import { render, screen } from "@testing-library/react";
import { mockPeople } from "../mocks/mockPeople";

test('Renders specified number of cards', () => {
    render(
        <BrowserRouter>
            <List result={mockPeople} currentPage={1} totalPages={9} onPageChange={() => {}} onItemClick={() => {}}></List>
        </BrowserRouter>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockPeople.length);
});

test('An appropriate message is displayed if no cards are present', () => {
    render(
        <BrowserRouter>
            <List result={[]} currentPage={0} totalPages={0} onPageChange={() => {}} onItemClick={() => {}}></List>
        </BrowserRouter>
    );

    expect(screen.getByText("No results found.")).toBeInTheDocument();
})