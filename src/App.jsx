import { SnackbarProvider } from 'notistack'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import Header from './Components/Header/Header'
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
