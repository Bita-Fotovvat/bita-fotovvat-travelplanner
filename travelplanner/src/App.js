import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlacesProvider } from './context/PlacesContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

return (
  <AuthProvider>
    <PlacesProvider>
      <BrowserRouter>
        <ToastContainer />
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<DashboardPage/>} />
          <Route path="/login" element={<LoginPage/>} /> 
        </Routes>
      </BrowserRouter>
    </PlacesProvider>
  </AuthProvider>
);
}