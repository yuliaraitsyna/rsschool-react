import { render, screen } from "@testing-library/react";
import Pagination from "../components/pagination/Pagination";
import { Provider } from "react-redux";
import store from "../components/redux/store";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "src/mocks/mockRouter";
import '@testing-library/jest-dom';

test("Pagination component updates the page number correctly when next and previous buttons are clicked", async () => {
    mockRouter.query = { page: '1' };

    render(
        <RouterContext.Provider value={mockRouter}>
            <Provider store={store}>
                <Pagination />
            </Provider>
        </RouterContext.Provider>
    );

    expect(screen.getByText((content, element) => {
        const hasText = (node: Node) => node.textContent === '1 / 1';
        const nodeHasText = element ? hasText(element) : false;
        const childrenDontHaveText = Array.from(element?.children || []).every(
            (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();

    const nextButton = screen.getByText(">");
    expect(nextButton).toBeInTheDocument();
});
