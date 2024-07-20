import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Details from "../components/details/Details"
import { mockPeople } from "../mocks/mockPeople";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

const mockPerson = mockPeople[0];

test("Loading indicator is displayed while fetching data", async () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Details id={1} onClose={() => {}}></Details>
            </Provider>
        </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("Detailed card component correctly displays the detailed card data", async () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Details id={1} onClose={() => {}}></Details>
            </Provider>
        </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(`${mockPerson.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Height: ${mockPerson.height}`)).toBeInTheDocument();
        expect(screen.getByText(`Mass: ${mockPerson.mass}`)).toBeInTheDocument();
        expect(screen.getByText(`Hair Color: ${mockPerson.hair_color}`)).toBeInTheDocument();
        expect(screen.getByText(`Skin Color: ${mockPerson.skin_color}`)).toBeInTheDocument();
        expect(screen.getByText(`Eye Color: ${mockPerson.eye_color}`)).toBeInTheDocument();
        expect(screen.getByText(`Birth Year: ${mockPerson.birth_year}`)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${mockPerson.gender}`)).toBeInTheDocument();
    });
});

test("Clicking the close button hides the component", async () => {
    const mockOnClose = vi.fn();

    render(
        <BrowserRouter>
            <Provider store={store}>
                <Details id={1} onClose={mockOnClose}></Details>
            </Provider>
        </BrowserRouter>
    );

    await waitFor(() => {
        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
