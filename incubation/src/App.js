import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminApplication from './Pages/AdminApplication';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminRecordings from './Pages/AdminRecordings';
import LoginPage from "./Pages/LoginPage";
import Processing from './Pages/Processing';
import RegisterPage from './Pages/RegisterPage';
import UserHomePage from './Pages/UserHomePage';
import Application from './Store/ApplicationContext'


function App() {
  return (
    <div >
      <Application>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/home" element={<UserHomePage />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/applicationList" element={<AdminApplication />} />
            <Route path="/admin/recordtrack" element={<AdminRecordings />} />



          </Routes>
        </BrowserRouter>
      </Application>

    </div>
  );
}

export default App;
