import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };
  return (
    <div>
      <li>
        <div>
          <p>
            <span>{contact.name}</span>
          </p>
          <p>{contact.number}</p>
        </div>
        <button onClick={handleDelete}>Delete</button>
      </li>
    </div>
  );
};

export default Contact;
