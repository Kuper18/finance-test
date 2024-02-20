import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewsCard } from './NewsCard';

describe('NewsCard component', () => {
  const mockArticle = {
    author: 'Some Author',
    content: 'Test content',
    publishedAt: '2024-02-18T12:50:22Z',
    urlToImage: 'https://example.com/image.jpg',
    description: 'This is a test description',
    title: 'Test Title',
    url: 'https://example.com/article',
    source: {
      name: 'Test name',
      id: 'Test id',
    },
  };

  it('renders article title', () => {
    render(<NewsCard article={mockArticle} />);
    const titleElement = screen.getByText('Test Title');

    expect(titleElement).toBeInTheDocument();
  });

  it('renders article description when expanded', () => {
    render(<NewsCard article={mockArticle} />);
    fireEvent.click(screen.getByTestId('expand-icon'));
    const descriptionElement = screen.getByText('This is a test description');

    expect(descriptionElement).toBeInTheDocument();
  });

  it('toggles expanded state when clicked on expand icon', () => {
    render(<NewsCard article={mockArticle} />);

    expect(screen.getByTestId('expand-icon')).toHaveAttribute(
      'aria-expanded',
      'false',
    );

    fireEvent.click(screen.getByTestId('expand-icon'));
    expect(screen.getByTestId('expand-icon')).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    fireEvent.click(screen.getByTestId('expand-icon'));
    expect(screen.getByTestId('expand-icon')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('renders "Read More" button with correct href', () => {
    render(<NewsCard article={mockArticle} />);
    const readMoreButton = screen.getByText('Read More');

    expect(readMoreButton).toHaveAttribute(
      'href',
      'https://example.com/article',
    );
    expect(readMoreButton).toHaveAttribute('target', '_blank');
  });
});
