import { fireEvent, render, screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Panigation from "../components/pagination/Pagination";
import { Provider } from "react-redux";
import store from "../redux/store";

test.skip("Component updates URL query parameter when page changes", async () => {
    const mockOnPageChange = vi.fn();

    render(
        <BrowserRouter>
            <Provider store={store}>
                <Panigation></Panigation>
            </Provider>
        </BrowserRouter>
    );

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
});
