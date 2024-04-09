import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './components/home/Login';

test('renders login renders ', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  const linkElement = screen.getByText('LOGIN');
  expect(linkElement).toBeInTheDocument();
});
