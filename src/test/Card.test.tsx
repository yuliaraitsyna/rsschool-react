import { BrowserRouter } from "react-router-dom";
import extractIdFromUrl from "../models/extractIdFromUrl";
import Card from "../components/card/Card";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockPeople } from "../mocks/mockPeople";
import { Provider } from "react-redux";
import store from "../components/redux/store";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "src/mocks/mockRouter";
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockPerson = mockPeople[0];

beforeEach(() => {
    fetchMock.resetMocks();
});

test("Card component renders the relevant card data", () => {
    render(
        <RouterContext.Provider value={mockRouter}>
            <Provider store={store}>
                <Card key={extractIdFromUrl(mockPerson.url)} data={mockPerson} onClick={() => {}} isSelected={false} />
            </Provider>
        </RouterContext.Provider>
    );

    const element = screen.getByText("Luke Skywalker");
    expect(element).toBeInTheDocument();
});

test("Clicking on a card opens a detailed card component", async () => {
    const handleClick = jest.fn();

    render(
        <RouterContext.Provider value={mockRouter}>
            {mockPeople.map(person => (
                <Provider store={store}>
                    <Card key={extractIdFromUrl(person.url)} data={person} onClick={handleClick} isSelected={false}/>
                </Provider>
            ))}
        </RouterContext.Provider>
    );

    const cardElement = screen.getByText("Darth Vader");

    fireEvent.click(cardElement);

    expect(handleClick).toHaveBeenCalledWith(extractIdFromUrl(mockPeople[1].url));
});

test("Clicking triggers an additional API call to fetch detailed information", async () => {
    const handleClick = jest.fn();

    render(
        <RouterContext.Provider value={mockRouter}>
            {mockPeople.map((person) => (
                <Provider store={store}>
                    <Card key={extractIdFromUrl(person.url)} data={person} onClick={handleClick} isSelected={false}/>
                </Provider>
            ))}
        </RouterContext.Provider>
    );

    const cardElement = screen.getByText(mockPerson.name);

    fireEvent.click(cardElement);

    await waitFor(() => {
        expect(handleClick).toHaveBeenCalledWith(extractIdFromUrl(mockPerson.url));
    });

    fetchMock.mockResponseOnce(JSON.stringify({ 
        ok: true,
        status: 200,
        json: async () => ({ status: 200 })
    }));

    const response = await fetch(mockPerson.url);
    expect(response.status).toEqual(200);
});