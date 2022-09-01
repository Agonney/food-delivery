import './App.css'
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
  </BrowserRouter>
  )
}

export default App 