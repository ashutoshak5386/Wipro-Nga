// src/userstory3/BookingForm.js
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "./store/actions";

export default function BookingForm() {
  const dispatch = useDispatch();
  const bookingStatus = useSelector((state) => state.bookingStatus);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      destination: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      destination: Yup.string().required("Destination is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(setStatus("submitting"));
      fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Booking failed");
          return res.json();
        })
        .then(() => {
          dispatch(setStatus("success"));
          alert(`Booking confirmed for ${values.name} to ${values.destination}!`);
          resetForm();
          setTimeout(() => dispatch(setStatus("idle")), 3000);
        })
        .catch((err) => {
          console.error(err);
          dispatch(setStatus("error"));
        });
    },
  });

  return (
    <div className="container my-4">
      <h3 className="mb-3 text-center">Book Your Trip</h3>
      {bookingStatus === "submitting" && <div className="alert alert-info">Submitting booking...</div>}
      {bookingStatus === "success" && <div className="alert alert-success">Booking successful!</div>}
      {bookingStatus === "error" && <div className="alert alert-danger">Something went wrong. Please try again.</div>}

      <form
        onSubmit={formik.handleSubmit}
        className="col-12 col-md-6 mx-auto p-4 border rounded shadow-sm bg-light"
      >
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        {/* Destination */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Destination</label>
          <input
            type="text"
            name="destination"
            className={`form-control ${formik.touched.destination && formik.errors.destination
                ? "is-invalid"
                : ""
              }`}
            {...formik.getFieldProps("destination")}
          />
          {formik.touched.destination && formik.errors.destination && (
            <div className="invalid-feedback">
              {formik.errors.destination}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={bookingStatus === 'submitting'}>
          {bookingStatus === 'submitting' ? 'Booking...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
}
