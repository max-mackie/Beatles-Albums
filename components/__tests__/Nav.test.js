// Nav.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from '../Nav';

// Mocking Next.js Link and Image components
jest.mock('next/link', () => ({ children }) => children);
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

describe('Nav Component', () => {
  it('renders BeatleMania logo text', () => {
    render(<Nav />);
    expect(screen.getByText('BeatleMania')).toBeInTheDocument();
  });
});
