import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectNameFilter);

  const handleSearch = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBoxContainer}>
      <label className={css.searchLabel} htmlFor="search">
        Find contacts by name
      </label>
      <input
        onChange={handleSearch}
        className={css.searchInput}
        id="search"
        type="search"
        inputMode="search"
        value={searchQuery}
      />
    </div>
  );
};

export default SearchBox;
