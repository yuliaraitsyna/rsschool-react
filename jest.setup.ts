import '@testing-library/jest-dom';

jest.mock('next/router', () => require('./src/mocks/mockRouter'));