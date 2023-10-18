import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, setCurrentPage, openConfirmationModal, isDisabled }) => {

  const getPageNumbers = (totalPages) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  const pageNumbers = getPageNumbers(totalPages);

  
  return (
   
    <div className={styles.pagination_wrapper} >
      <div className={styles.paginatation_controls}>
        <div className={styles.deleteAll_wrapper}>
        <button disabled={isDisabled} className={styles.deleteAll} onClick={() =>  openConfirmationModal(null)} > Delete Selected </button>
        {/* to check when no data is present */}
        <p className={styles.page_display}>Page {totalPages < 1 ? 0 : currentPage} of {totalPages}</p>
        </div>

        <div className={styles.pagination_btns}>
          <button disabled={currentPage <= 1} onClick={() => setCurrentPage(1)}>First</button>
          <button disabled={currentPage <= 1} onClick={() => setCurrentPage(prev => prev - 1)} >Prev</button>
          {
            pageNumbers.map((page) => {
              return (<button className={styles.mobile_pagination_view} key={page} onClick={() => setCurrentPage(page)}> {page}</button>)
            })
          }
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(prev => prev + 1)} >Next</button>
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)} >Last</button>

        </div>
      </div>
    </div>
  )
}

export default Pagination;