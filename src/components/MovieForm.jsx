import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";



const MovieSchema = Yup.object().shape({
  title: Yup.string().required("El título es obligatorio"),
  year: Yup.number()
    .min(1800, "Año inválido")
    .max(new Date().getFullYear(), "Año futuro no válido")
    .required("El año es obligatorio"),
  director: Yup.string().required("El director es obligatorio"),
  genre: Yup.string().required("El género es obligatorio"),
});

export default function MovieForm({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MovieSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 bg-white p-4 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <Field
              name="title"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Año
            </label>
            <Field
              name="year"
              type="number"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="year"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Director
            </label>
            <Field
              name="director"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="director"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <Field
              name="genre"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="genre"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Guardando..." : "Guardar Película"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
