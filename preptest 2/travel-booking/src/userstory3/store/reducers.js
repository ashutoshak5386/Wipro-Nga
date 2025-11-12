// src/userstory3/store/reducers.js
const initial = { bookingStatus: 'idle' };
export function rootReducer(state = initial, action) {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, bookingStatus: action.payload };
    default:
      return state;
  }
}
