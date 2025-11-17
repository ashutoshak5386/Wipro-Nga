import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { BookingContext } from "./context";
import useSubmit from "./useSubmit";

export default function BookingForm() {
  const { setBooking } = useContext(BookingContext);
  const submit = useSubmit();

  const schema = Yup.object({
    name: Yup.string().required("Required"),
    mobile: Yup.string().required("Required"),
    destination: Yup.string().required("Required")
  });

  return (
    <div className="container mt-3">
      <h3>Book Package</h3>

      <Formik
        initialValues={{ name: "", mobile: "", destination: "" }}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          const res = await submit(values);
          if (res === "success") {
            setBooking(values);
            actions.resetForm();
            alert("Booked Successfully!");
          }
        }}
      >
        <Form className="mt-3">
          <label>Name</label>
          <Field className="form-control" name="name" />
          <ErrorMessage name="name" className="text-danger" component="div" />

          <label className="mt-2">Mobile</label>
          <Field className="form-control" name="mobile" />
          <ErrorMessage name="mobile" className="text-danger" component="div" />

          <label className="mt-2">Destination</label>
          <Field className="form-control" name="destination" />
          <ErrorMessage
            name="destination"
            className="text-danger"
            component="div"
          />

          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
