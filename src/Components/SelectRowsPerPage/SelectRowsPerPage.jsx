import { enqueueSnackbar } from "notistack";
import styles from "./SelectRowsPerPage.module.css";

const SelectRowsPerPage = ({ rowsPerPage, setUsersPerPage, setCurrentPage }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    setUsersPerPage((prev) => Number(value));
    setCurrentPage(1);
  };
  const preventTyping = (event) => {
    event.preventDefault();
    enqueueSnackbar("Use arrows to change value" , {variant : "warning"});
  };

  return (
      <input
        className={styles.rows_perpage_input}
        type="number"
        min={5}
        max={40}
        name="rowsperpage"
        id="rowsperpage"
        value={rowsPerPage}
        onChange={handleInputChange}
        // to avoid letting user enter negative or zero values
        onKeyDown={preventTyping}
        />
  );
};

export default SelectRowsPerPage;