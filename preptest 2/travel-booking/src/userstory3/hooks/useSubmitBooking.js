// src/userstory3/hooks/useSubmitBooking.js
import { useState } from 'react';
import { useBooking } from '../context/BookingContext';

export default function useSubmitBooking() {
  const { dispatch } = useBooking();
  const [status, setStatus] = useState('idle');

  async function submit(values) {
    setStatus('submitting');
    try {
      // Simulate API post
      await new Promise((r) => setTimeout(r, 500));
      dispatch({ type: 'SAVE_BOOKING', payload: values });
      setStatus('success');
    } catch (e) {
      setStatus('error');
      throw e;
    }
  }

  return { status, submit };
}
