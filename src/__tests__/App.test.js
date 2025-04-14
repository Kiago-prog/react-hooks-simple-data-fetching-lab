import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('displays the dog image after fetching', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ message: 'https://images.dog.ceo/breeds/bulldog-english/mami.jpg' }),
    });

    render(<App />);
    await waitFor(() => expect(screen.getByAltText('A Random Dog')).toBeInTheDocument());
    expect(screen.getByAltText('A Random Dog')).toHaveAttribute(
      'src',
      'https://images.dog.ceo/breeds/bulldog-english/mami.jpg'
    );
  });

  test('displays a loading message before fetching', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ message: 'https://images.dog.ceo/breeds/bulldog-english/mami.jpg' }),
    });

    render(<App />);
    expect(screen.queryByText(/Loading/)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByAltText('A Random Dog')).toBeInTheDocument());
    expect(screen.getByAltText('A Random Dog')).toHaveAttribute(
      'src',
      'https://images.dog.ceo/breeds/bulldog-english/mami.jpg'
    );
  });
});