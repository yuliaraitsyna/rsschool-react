import { fireEvent, render, screen} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Panigation from "../components/pagination/Pagination";

test("Component updates URL query parameter when page changes", async () => {
    const mockOnPageChange = vi.fn();

    render(
        <BrowserRouter>
            <Panigation currentPage={1} totalPages={9} onPageChange={mockOnPageChange}></Panigation>
        </BrowserRouter>
    );

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
});
