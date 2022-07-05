import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import RegisterPage from './Pages/RegisterPage';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
