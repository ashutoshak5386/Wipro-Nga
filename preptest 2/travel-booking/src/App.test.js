import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './userstory3/store/store';

test('renders travel booking title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getAllByText(/Travel Booking/i)[0];
  expect(titleElement).toBeInTheDocument();
});
