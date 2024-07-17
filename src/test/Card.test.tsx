import { BrowserRouter } from "react-router-dom";
import extractIdFromUrl from "../models/extractIdFromUrl";
import Card from "../components/card/Card";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockPeople } from "../mocks/mockPeople";
import { vi } from "vitest";
import { Provider } from "react-redux";
import store from "../redux/store";

const mockPerson = mockPeople[0];

test("Card component renders the relevant card data", () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Card key={extractIdFromUrl(mockPerson.url)} data={mockPerson} onClick={() => {}} />
            </Provider>
        </BrowserRouter>
    );

    const element = screen.getByText("Luke Skywalker");
    expect(element).toBeInTheDocument();
});

test("Clicking on a card opens a detailed card component", async () => {
    const handleClick = vi.fn();

    render(
        <BrowserRouter>
            {mockPeople.map(person => (
                <Provider store={store}>
                    <Card key={extractIdFromUrl(person.url)} data={person} onClick={handleClick} />
                </Provider>
            ))}
        </BrowserRouter>
    );

    const cardElement = screen.getByText("Darth Vader");

    fireEvent.click(cardElement);

    expect(handleClick).toHaveBeenCalledWith(extractIdFromUrl(mockPeople[1].url));
});

test("Clicking triggers an additional API call to fetch detailed information", async () => {
    const handleClick = vi.fn();

    render(
        <BrowserRouter>
            {mockPeople.map((person) => (
                <Provider store={store}>
                    <Card key={extractIdFromUrl(person.url)} data={person} onClick={handleClick} />
                </Provider>
            ))}
        </BrowserRouter>
    );

    const cardElement = screen.getByText(mockPerson.name);

    fireEvent.click(cardElement);

    await waitFor(() => {
        expect(handleClick).toHaveBeenCalledWith(extractIdFromUrl(mockPerson.url));
    });

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ status: 200 }),
    } as Response);

    const response = await fetch(mockPerson.url);
    expect(response.status).toEqual(200);
});