// src/userstory3/BookingForm.js
import { useFormik } from "formik";
import * as Yup from "yup";

export default function BookingForm() {
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
      alert(`Booking confirmed for ${values.name} to ${values.destination}!`);
      resetForm();
    },
  });

  return (
    <div className="container my-4">
      <h3 className="mb-3 text-center">Book Your Trip</h3>
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
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
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
            className={`form-control ${
              formik.touched.destination && formik.errors.destination
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

        <button type="submit" className="btn btn-primary w-100">
          Submit Booking
        </button>
      </form>
    </div>
  );
}
