import { render, screen, waitFor } from "@testing-library/react";

import App from "../components/home/App";
import '@testing-library/jest-dom';
import { mockPeople } from "src/mocks/mockPeople";
import { Providers } from "@components/redux/providers";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

test('renders App component', async () => {
    render(
        <Providers>
            <App initialData={mockPeople} />
        </Providers>
    );

    await waitFor(() => {
        expect(screen.getByText(/Star Wars Search/i)).toBeInTheDocument();
    });
});
