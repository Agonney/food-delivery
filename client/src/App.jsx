import { Login } from './components/Login'
import { Navbar } from './components/Navbar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SignUp } from './components/SignUp';
import { Footer } from './components/Footer';
import { HomePage } from './containers/HomePage';
import { AuthProvider } from 'react-auth-kit'
import { Restaurants } from './containers/Restaurants'

function App() {
  return (
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
       <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App 