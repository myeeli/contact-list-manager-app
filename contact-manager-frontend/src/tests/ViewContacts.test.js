
import { render, screen, fireEvent } from '@testing-library/react';
import ViewContacts from '../Components/ViewContacts/ViewContacts';

jest.mock('axios');

describe('ViewContacts component', () => {
  const setContacts = jest.fn();
  const setSearch = jest.fn();
  const setForm = jest.fn();
  const setEditId = jest.fn();
  const deleteContact = jest.fn();
  const contacts = [
    { _id: '1', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
  ];

  it('displays contact info correctly', () => {
    render(
      <ViewContacts
        contacts={contacts}
        setContacts={setContacts}
        search=""
        setSearch={setSearch}
        setForm={setForm}
        setEditId={setEditId}
      />
    );

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('calls setSearch on typing in search bar', () => {
    render(
      <ViewContacts
        contacts={contacts}
        setContacts={setContacts}
        search=""
        setSearch={setSearch}
        setForm={setForm}
        setEditId={setEditId}
      />
    );

    const input = screen.getByPlaceholderText(/Search by name or email/i);
    fireEvent.change(input, { target: { value: 'Jane' } });
    expect(setSearch).toHaveBeenCalledWith('Jane');
  });

  it('clicks edit icon and populates form', () => {
    render(
      <ViewContacts
        contacts={contacts}
        setContacts={setContacts}
        search=""
        setSearch={setSearch}
        setForm={setForm}
        setEditId={setEditId}
      />
    );

    const buttons = screen.getAllByRole('button');
    const editButton = buttons[0]; 
    fireEvent.click(editButton);

    expect(setForm).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
    });
    expect(setEditId).toHaveBeenCalledWith('1');
  });

  it('clicks delete icon and opens confirmation dialog', () => {
    render(
      <ViewContacts
        contacts={contacts}
        setContacts={jest.fn()}
        search=""
        setSearch={setSearch}
        setForm={setForm}
        setEditId={setEditId}
      />
    );

    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons[1]; 
    fireEvent.click(deleteButton);

    expect(screen.getByText(/delete contact/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });
});
