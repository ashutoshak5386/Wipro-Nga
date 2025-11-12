// src/userstory3/context/BookingContext.js
import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SAVE_BOOKING':
      return { ...state, lastBooking: action.payload };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { lastBooking: null });
  const value = { state, dispatch };
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  return useContext(BookingContext);
}
