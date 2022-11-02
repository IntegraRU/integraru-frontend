
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserAccess from './pages/UserAccess';
import { AdminRoute, UserRoute } from './util/Auth';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user_access' element={<UserAccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
