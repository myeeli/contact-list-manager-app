import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

describe('App component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

 it('Displays the form and Add Contact heading', () => {
    render(<App />);
    expect(screen.getByText(/Add Contact/i)).toBeInTheDocument();
  });

  it('fetches and displays contacts from API', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { _id: '1', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
      ],
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });
});
