import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLoginPage from './Pages/AdminLoginPage';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from './Pages/RegisterPage';
import UserHomePage from './Pages/UserHomePage';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
