import { useFormik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContacts } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      number: Yup.string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in format 123-45-67")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.number,
      };

      if (
        contacts.some(
          (contact) =>
            contact.name.toLowerCase() === newContact.name.toLowerCase()
        )
      ) {
        iziToast.error({
          title: "Error",
          message: `${newContact.name} is already in contacts.`,
          position: "topCenter",
          timeout: 5000,
          backgroundColor: "#F44336",
          titleColor: "#FFFFFF",
          messageColor: "#FFFFFF",
          titleSize: "24px",
          messageSize: "22px",
          class: css.customToast,
        });
        return;
      }
      dispatch(addContact(newContact));
      resetForm();
    },
  });

  return (
    <form className={css.formContact} onSubmit={formik.handleSubmit}>
      <div className={css.formDiv}>
        <label className={css.formLabel} htmlFor="name">
          Name
        </label>
        <input
          className={css.formInput}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
      <div>
        <label htmlFor="number">Number</label>
        <input
          className={css.formInput}
          id="number"
          name="number"
          type="text"
          autoComplete="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
        />
      </div>
      {formik.touched.number && formik.errors.number ? (
        <div className={css.formError}>{formik.errors.number}</div>
      ) : null}

      <button className={css.formButton} type="submit">
        Add Contact
      </button>
    </form>
  );
};
export default ContactForm;
