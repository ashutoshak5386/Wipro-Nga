// src/userstory3/StatusPanel.js (example consumer)
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from './store/actions';

export default function StatusPanel() {
  const status = useSelector((s) => s.bookingStatus);
  const dispatch = useDispatch();
  return (
    <div className="container my-4">
      <h5>Status: {status}</h5>
      <button className="btn btn-outline-primary me-2" onClick={() => dispatch(setStatus('pending'))}>
        Pending
      </button>
      <button className="btn btn-outline-success me-2" onClick={() => dispatch(setStatus('confirmed'))}>
        Confirmed
      </button>
      <button className="btn btn-outline-danger" onClick={() => dispatch(setStatus('canceled'))}>
        Canceled
      </button>
    </div>
  );
}
