import { render, screen } from '@testing-library/react';
import App from '../App';

it('should render <App />', () => {
  const { getByText } = render(<App />);
  expect(getByText('Ellevator')).toBeInTheDocument();
});
