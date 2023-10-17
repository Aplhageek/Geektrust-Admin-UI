import { SnackbarProvider } from 'notistack'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import Header from './Components/Header/Header'

// import TableRow from './Components/TableRow/TableRow'
// import EditModal from './Components/EditModal/EditModal'

function App() {

  return (
    <>
    <SnackbarProvider  anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }} 
        className="snackbar"
        fullWidth={true}
        autoHideDuration = {2000} 
        maxSnack={2}>

    <Header/>
    <AdminDashboard />

    </SnackbarProvider>
    </>
  )
}

export default App
