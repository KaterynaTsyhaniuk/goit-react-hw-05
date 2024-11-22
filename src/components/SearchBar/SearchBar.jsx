import { Field, Form, Formik } from "formik";

const SearchBar = ({ onSearch }) => {
  return (
    <div>
      <Formik
        onSubmit={(values) => onSearch(values.query)}
        initialValues={{ query: "" }}
      >
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
