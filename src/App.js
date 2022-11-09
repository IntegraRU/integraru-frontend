
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserAccess from './pages/UserAccess';
import AddMenu from './pages/AddMenu';
import { AdminRoute, UserRoute } from './util/Auth';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user_access' element={<UserAccess />} />
        <Route path='/' element={<UserAccess />}>
        </Route>
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='cardapio' element={<AddMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
