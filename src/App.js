
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserAccess from './pages/UserAccess';
import ChangeMenu from './pages/ChangeMenu';
import ViewMenus from './pages/ViewMenus';
import { AdminRoute, UserRoute } from './util/Auth';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/acesso_usuario' element={<UserAccess />} />
        <Route path='/' element={<UserRoute />}>
        </Route>
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='cardapio' element={<ViewMenus />} />
          <Route path='cardapio/novo' element={<ChangeMenu />} />
          <Route path='cardapio/editar' element={<ChangeMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
