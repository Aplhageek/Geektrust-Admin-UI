import styles from './Modal.module.css';


const ConfirmationModal = ({message, onConfirm}) => {

    return (
        <div className={styles.modal} >
            <div className={styles.confirmationModal_wrapper}>
                <p className={styles.message} >{message}</p>
                <div className={styles.modal_buttons}>
                    <button className={styles.btn} onClick={() => onConfirm(true) } >Save</button>
                    <button className={styles.btn} onClick={() => onConfirm(false) }>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;