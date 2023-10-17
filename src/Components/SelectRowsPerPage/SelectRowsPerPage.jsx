import styles from "./SelectRowsPerPage.module.css";

const SelectRowsPerPage = ({ rowsPerPage, setUsersPerPage, setCurrentPage }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    setUsersPerPage((prev) => Number(value));
    setCurrentPage(1);
  };

  return (
    <div>
      <input
        className={styles.rows_perpage_input}
        type="number"
        min={5}
        max={40}
        name="rowsperpage"
        id="rowsperpage"
        value={rowsPerPage}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SelectRowsPerPage;