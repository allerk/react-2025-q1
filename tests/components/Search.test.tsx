import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Search from '../../src/components/top-controls/search/Search';
import { MemoryRouter } from 'react-router';
import { ReactElement } from 'react';

describe('Search Component', () => {
  function setup(jsx: ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it('should call handleChange function when submit button is clicked', async () => {
    const mockChange = vi.fn();
    const { user } = setup(
      <MemoryRouter>
        <Search handleChange={mockChange} storedValue={''} />
      </MemoryRouter>
    );
    const submitButton = screen.getByTestId('submitButton');

    await user.click(submitButton);
    expect(mockChange).toBeCalled();
  });

  it('should searchForm input be changed when typing', async () => {
    const mockChange = vi.fn();
    localStorage.clear();
    const { user } = setup(
      <MemoryRouter>
        <Search handleChange={mockChange} storedValue={''} />
      </MemoryRouter>
    );
    const input = screen.getByTestId('searchFormInput');
    await user.type(input, 'luke');

    expect(input).toHaveValue('luke');
  });

  it('should get local storage search query on mount', () => {
    localStorage.clear();
    localStorage.setItem('searchTerm_allerk', 'luke');
    const getLsValue = localStorage.getItem('searchTerm_allerk');
    const mockChange = vi.fn();
    setup(
      <MemoryRouter>
        <Search handleChange={mockChange} storedValue={getLsValue} />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId('searchFormInput');
    expect(searchInput).toHaveValue('luke');
  });

  it('should set local storage search query when button is clicked', async () => {
    const mockChange = vi.fn();
    localStorage.clear();
    const { user } = setup(
      <MemoryRouter>
        <Search handleChange={mockChange} storedValue={''} />
      </MemoryRouter>
    );
    const input = screen.getByTestId('searchFormInput');
    await user.type(input, 'luke');

    const submitButton = screen.getByTestId('submitButton');

    await user.click(submitButton);
    expect(mockChange).toBeCalled();
    expect(localStorage.getItem('searchTerm_allerk'), 'luke');
  });
});
