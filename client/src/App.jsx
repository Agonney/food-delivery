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
import { Items } from './containers/Items'
import ItemDetails from './containers/ItemDetails';
import { Checkout } from './containers/Checkout';
import { Orders } from './containers/Orders'
import SuccessResult from './containers/SuccessResult';
import ScrollToTop from './helpers/ScrollToTop';

function App() {
  return (
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
       <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:itemId" element={<ItemDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/success" element={<SuccessResult />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App 