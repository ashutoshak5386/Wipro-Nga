// src/userstory3/BookingForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useSubmitBooking from './hooks/useSubmitBooking';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid').required('Required'),
  packageId: Yup.number().required('Required'),
  travelers: Yup.number().min(1).required('Required'),
});

export default function BookingForm() {
  const { status, submit } = useSubmitBooking();
  return (
    <div className="container my-4">
      <h4>Book a Package</h4>
      <Formik
        initialValues={{ name: '', email: '', packageId: '', travelers: 1 }}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          await submit(values);
          resetForm();
        }}
      >
        <Form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <Field name="name" className="form-control" />
            <div className="text-danger"><ErrorMessage name="name" /></div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <Field name="email" type="email" className="form-control" />
            <div className="text-danger"><ErrorMessage name="email" /></div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Package ID</label>
            <Field name="packageId" type="number" className="form-control" />
            <div className="text-danger"><ErrorMessage name="packageId" /></div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Travelers</label>
            <Field name="travelers" type="number" className="form-control" />
            <div className="text-danger"><ErrorMessage name="travelers" /></div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : 'Submit Booking'}
            </button>
            {status === 'success' && <span className="ms-2 text-success">Saved!</span>}
            {status === 'error' && <span className="ms-2 text-danger">Error</span>}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
