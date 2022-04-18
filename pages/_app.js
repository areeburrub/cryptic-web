import '../styles/globals.css'
import { UserContextProvider } from '../src/context/authContext'
import AuthStateChanged from '../src/AuthState'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
      <>
    <UserContextProvider>
      <AuthStateChanged>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
        <Component {...pageProps} />
      </AuthStateChanged>
    </UserContextProvider>
    </>
    )
}

export default MyApp
