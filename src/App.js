import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import UserAccess from './pages/UserAccess';
import { AdminRoute, UserRoute } from './util/Auth';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/acesso_usuario" element={<UserAccess />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
