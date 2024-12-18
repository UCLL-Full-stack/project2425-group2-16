import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import Language from '../components/Language';

jest.mock('next/router', () => ({
    useRouter: () => ({
      locale: 'en',
      push: jest.fn(),
      pathname: '/',
      asPath: '/',
      query: {},
    }),
  }));
  

describe('Language Component', () => {
    test('renders Language component', () => {
        render(<Language />);
        const languageElement = screen.getByText('nav.Language');
        expect(languageElement).toBeInTheDocument();
    });

    test('changes language on selection', () => {
        render(<Language />);
        const selectElement = screen.getByText('English') as HTMLSelectElement;
        fireEvent.change(selectElement, { target: { value: 'es' } });
        expect(selectElement.value).toBe('es');
    });

    test('displays correct text for selected language', () => {
        render(<Language />);
        const selectElement = screen.getByText('English');
        fireEvent.change(selectElement, { target: { value: 'es' } });
        const textElement = screen.getByText('nav.Language');
        expect(textElement).toHaveTextContent('nav.Language');
    });
});