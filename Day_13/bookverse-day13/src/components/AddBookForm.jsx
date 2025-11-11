import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BookActions } from "../actions/BookActions";

const AddBookForm = () => {
  const formik = useFormik({
    initialValues: { title: "", author: "", price: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      price: Yup.number().typeError("Must be a number").required("Price is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      BookActions.addBook(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2>Add a New Book</h2>

      <input
        name="title"
        placeholder="Book Title"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      {formik.errors.title && <p className="error">{formik.errors.title}</p>}

      <input
        name="author"
        placeholder="Author"
        onChange={formik.handleChange}
        value={formik.values.author}
      />
      {formik.errors.author && <p className="error">{formik.errors.author}</p>}

      <input
        name="price"
        placeholder="Price"
        onChange={formik.handleChange}
        value={formik.values.price}
      />
      {formik.errors.price && <p className="error">{formik.errors.price}</p>}

      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
