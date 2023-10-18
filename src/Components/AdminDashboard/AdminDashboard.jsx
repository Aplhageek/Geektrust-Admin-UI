import { useEffect, useState } from "react";
import SelectRowsPerPage from "../SelectRowsPerPage/SelectRowsPerPage";
import axios from "axios";
import Pagination from "../Paginaition/Pagination";
import TableHead from "../TableHead/TableHead";
import TableRow from "../TableRow/TableRow";
import EditModal from "../Modal/EditModal";
import ConfirmationModal from "../Modal/ConfirmationModal";
import Search from "../Search/Search";
import { enqueueSnackbar } from "notistack";
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    // ------------------------------------------------------------------------------------------------------
    // states
    // ------------------------------------------------------------------------------------------------------
    const [userList, setUserList] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);



    // ------------------------------------------------------------------------------------------------------
    // fetch data
    // ------------------------------------------------------------------------------------------------------
    const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    const fetchUserList = async (URL, stateUpdater) => {
        try {
            const result = await axios.get(URL);
            stateUpdater(prev => result.data);
        } catch (error) {
            enqueueSnackbar("Error while fetching user list", { variant: "error" });
        }
    }


    // ------------------------------------------------------------------------------------------------------
    // static calculation
    // ------------------------------------------------------------------------------------------------------
    let totalPages = Math.ceil(filteredUsersList.length / usersPerPage)
    let endIndex = currentPage * usersPerPage;
    let startIndex = endIndex - usersPerPage;
    let displayUsers = filteredUsersList.slice(startIndex, endIndex);


    // ------------------------------------------------------------------------------------------------------
    // filter functions
    // ------------------------------------------------------------------------------------------------------
    const performSearch = (searchQuery) => {
        const query = searchQuery.trim().toLowerCase();

        if (query.length > 0) {
            const updatedUsers = userList.filter((user) => (
                user.role.toLowerCase().includes(query) ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            ));
            setFilteredUsersList(updatedUsers);
        } else {
            setFilteredUsersList([...userList]);
        }
    }


    // ------------------------------------------------------------------------------------------------------
    // checkbox functions
    // ------------------------------------------------------------------------------------------------------
    let isAllSelected = displayUsers.length !== 0 && (selectedUsers.length === displayUsers.length);

    const HandleSelectAll = (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            const selectedRows = displayUsers.map(user => user.id);
            setSelectedUsers(selectedRows);
        } else {
            setSelectedUsers([]);
        }
    }

    const handleCheckBoxChange = (event, id) => {
        event.target.checked ?
            setSelectedUsers(prev => [...prev, id])
            : setSelectedUsers(prev => prev.filter(item => item !== id));
    }


    // ------------------------------------------------------------------------------------------------------
    // deleting functions
    // ------------------------------------------------------------------------------------------------------
    const deleteUser = (userToDelete) => {
        const updatedUsers = userList.filter((user) => user.id !== userToDelete.id);
        setUserList([...updatedUsers]);
        // to remove user from selected users list
        const updatedSelectedUsers = selectedUsers.filter((userID) => userID !== userToDelete.id);
        setSelectedUsers([...updatedSelectedUsers]);
        enqueueSnackbar(`${userToDelete.name} has been removed`, { variant: "success" });
    }

    const deleteSelectedUsers = () => {
        if (selectedUsers.length === 0) {
            return;
        }
        const updatedUsers = userList.filter((user) => !selectedUsers.includes(user.id));
        setUserList([...updatedUsers]);
        let numberOfUsers = selectedUsers.length;
        enqueueSnackbar(`${numberOfUsers} ${numberOfUsers < 2 ? "user" : "users"} has been removed`, { variant: "success" });
        setSelectedUsers([]);
    }

    // ------------------------------------------------------------------------------------------------------
    //   confirmation logic
    // ------------------------------------------------------------------------------------------------------
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const handleConfirmation = (confirmed) => {
        if (confirmed) {
            if (userToDelete) {
                deleteUser(userToDelete);
                closeConfirmationModal();
            } else {
                deleteSelectedUsers();
                closeConfirmationModal();
            }
        } else {
            closeConfirmationModal();
        }
    }

    const openConfirmationModal = (user) => {
        if (user) {
            setConfirmationMessage(`Are you sure you want to remove ${user.name} ?`)
            setUserToDelete(user);
        } else {
            setConfirmationMessage("Are you sure you want to remove all selected users ?");
            setUserToDelete(null);
        }
        setIsConfirmationModalOpen(true);
    }

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    }


    // ------------------------------------------------------------------------------------------------------
    // editing functions
    // ------------------------------------------------------------------------------------------------------
    const openEditModal = (user) => {
        setIsModalOpen(true);
        setUserToEdit({ ...user })
    }

    const onSave = (editedUser) => {
        setUserList((previous) => {
            return previous.map((user) => (user.id === editedUser.id ? editedUser : user));
        });
        enqueueSnackbar(`${editedUser.name} has been updated`, { variant: "success" });
    };

    const onClose = () => {
        setIsModalOpen(false);
        setUserToEdit(null);
    }

    // ------------------------------------------------------------------------------------------------------
    useEffect(() => {
        fetchUserList(URL, setUserList);
    }, []);

    useEffect(() => {
        setFilteredUsersList(prev => userList);
    }, [userList]);

    useEffect(() => {
        setSelectedUsers([]);
    }, [currentPage, usersPerPage]);
    // ------------------------------------------------------------------------------------------------------


    return (
        <div>
            {/* Search Bar */}
            <div className={styles.input_wrapper} >
                <Search performSearch={performSearch} />
                <SelectRowsPerPage rowsPerPage={usersPerPage} setUsersPerPage={setUsersPerPage} setCurrentPage={setCurrentPage} />
            </div>
            <div className={styles.table_wrapper} >
                <table  >
                    <TableHead isDisabled={!displayUsers.length} isAllSelected={isAllSelected} HandleSelectAll={HandleSelectAll} />
                    <TableRow
                        displayUsers={displayUsers}
                        selectedUsers={selectedUsers}
                        handleCheckBoxChange={handleCheckBoxChange}
                        openConfirmationModal={openConfirmationModal}
                        openEditModal={openEditModal}
                    />
                </table>
            </div>

            {
                displayUsers.length === 0 && 
                (
                <div className={styles.no_data_messege}>
                    <p>No users found !</p>
                </div>
                )
            }


            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                openConfirmationModal={openConfirmationModal}
                isDisabled={selectedUsers.length === 0}
            />


            {isModalOpen && (<EditModal userToEdit={userToEdit} onClose={onClose} onSave={onSave} />)}
            {isConfirmationModalOpen && <ConfirmationModal message={confirmationMessage} onConfirm={handleConfirmation} />}
        </div>
    )
}

export default AdminDashboard;


