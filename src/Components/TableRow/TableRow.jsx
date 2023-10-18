/* eslint-disable react/prop-types */
import styles from './TableRow.module.css';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete.svg';

const TableRow = ({ displayUsers, selectedUsers, handleCheckBoxChange, openConfirmationModal, openEditModal }) => {
    
    


    return (
        <tbody className={styles.table_body} >
            {
                displayUsers?.map((user) => {
                    return (
                        <tr className={ `${selectedUsers.includes(user.id) ? styles.selectedRow : "" }`} key={user.id} >
                            <td><input name="checkuser" type="checkbox" checked={selectedUsers.includes((user.id))} onChange={(event) => handleCheckBoxChange(event, user.id)} /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td> {user.role} </td>
                            <td className={styles.action_icons}>
                                <img src={EditIcon} alt="EditIcon" onClick={() => openEditModal(user)} />
                                <img src={DeleteIcon} alt="DeleteIcon" onClick={() => openConfirmationModal(user)} />
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default TableRow;