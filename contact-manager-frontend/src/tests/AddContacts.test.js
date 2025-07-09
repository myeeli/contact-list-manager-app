import { render, screen, fireEvent } from '@testing-library/react';
import AddContacts from '../Components/AddContacts/AddContacts';

jest.mock('axios');

describe('AddContacts component', () => {
  const mockSetForm = jest.fn();
  const mockSetErrors = jest.fn();
  const mockOnAddContact = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());


  beforeEach(() => {
    mockSetForm.mockReset();
    mockSetErrors.mockReset();
    mockOnAddContact.mockReset();
  });

 it('Display input fields and submit button', () => {
    render(
      <AddContacts
        form={{ firstName: '', lastName: '', email: '' }}
        setForm={mockSetForm}
        handleSubmit={mockHandleSubmit}
        errorMessage=""
        editId={null}
      />
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', () => {
    render(
      <AddContacts
        form={{ firstName: '', lastName: '', email: '' }}
        setForm={mockSetForm}
        handleSubmit={mockHandleSubmit}
        errorMessage=""
        editId={null}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });
});
