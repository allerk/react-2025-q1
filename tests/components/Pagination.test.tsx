import { describe, expect, it } from 'vitest';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Pagination from '../../src/components/results/pagination/Pagination';
import { pageInfo } from '../mocks/mocks';

describe('Pagination Component', () => {
  function setup(jsx: ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it('should update url when page is changed calling next page', async () => {
    const { user } = setup(
      <MemoryRouter initialEntries={[`/?page=${1}`]}>
        <Pagination pageInfo={pageInfo} />
      </MemoryRouter>
    );
    const nextButton = screen.getByTestId('next');

    const currentPage = screen.getByTestId('currentPage');

    expect(currentPage).toHaveTextContent('1');

    await user.click(nextButton);

    expect(currentPage).toHaveTextContent('2');
  });

  it('should update url when page is changed calling prev page', async () => {
    const { user } = setup(
      <MemoryRouter initialEntries={[`/?page=${9}`]}>
        <Pagination pageInfo={pageInfo} />
      </MemoryRouter>
    );
    const prevButton = screen.getByTestId('prev');

    const currentPage = screen.getByTestId('currentPage');

    expect(currentPage).toHaveTextContent('9');

    await user.click(prevButton);

    expect(currentPage).toHaveTextContent('8');
  });

  it('should display current page', () => {
    setup(
      <MemoryRouter initialEntries={[`/?page=${5}`]}>
        <Pagination pageInfo={pageInfo} />
      </MemoryRouter>
    );

    const currentPage = screen.getByTestId('currentPage');

    expect(currentPage).toHaveTextContent('5');
  });

  it('should disable next button on last page', () => {
    setup(
      <MemoryRouter initialEntries={[`/?page=${9}`]}>
        <Pagination pageInfo={pageInfo} />
      </MemoryRouter>
    );

    const nextButton = screen.getByTestId('next');

    expect(nextButton).toBeDisabled();
  });

  it('should disable prev button on first page', () => {
    setup(
      <MemoryRouter initialEntries={[`/?page=${1}`]}>
        <Pagination pageInfo={pageInfo} />
      </MemoryRouter>
    );

    const prevButton = screen.getByTestId('prev');

    expect(prevButton).toBeDisabled();
  });
});
