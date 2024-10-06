import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Details from "../components/details/Details";
import { mockPeople } from "../mocks/mockPeople";
import { Provider } from "react-redux";
import store from "../components/redux/store";
import '@testing-library/jest-dom';
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "src/mocks/mockRouter";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { starWarsAPI } from "../components/redux/starWarsAPI";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockPerson = mockPeople[0];

beforeEach(() => {
    fetchMock.resetMocks();
});

test("Loading indicator is displayed while fetching data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPerson));

    render(
        <RouterContext.Provider value={mockRouter}>
            <ApiProvider api={starWarsAPI}>
                <Provider store={store}>
                    <Details id={1} onClose={() => {}} />
                </Provider>
            </ApiProvider>
        </RouterContext.Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("Detailed card component correctly displays the detailed card data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/'
    }));

    render(
        <RouterContext.Provider value={mockRouter}>
            <ApiProvider api={starWarsAPI}>
                <Provider store={store}>
                    <Details id={1} onClose={() => {}} />
                </Provider>
            </ApiProvider>
        </RouterContext.Provider>
    );

    await waitFor(() => {
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Height: 172')).toBeInTheDocument();
        expect(screen.getByText('Mass: 77')).toBeInTheDocument();
        expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
        expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
        expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
        expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
        expect(screen.getByText('Gender: male')).toBeInTheDocument();
    });
});

test("Clicking the close button hides the component", async () => {
    const mockOnClose = jest.fn();

    fetchMock.mockResponseOnce(JSON.stringify(mockPerson));

    render(
        <RouterContext.Provider value={mockRouter}>
            <ApiProvider api={starWarsAPI}>
                <Provider store={store}>
                    <Details id={1} onClose={mockOnClose} />
                </Provider>
            </ApiProvider>
        </RouterContext.Provider>
    );

    await waitFor(() => {
        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
