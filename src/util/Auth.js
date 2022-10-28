import {Route, Navigate} from 'react-router-dom';

export class PrivateRoute extends Route {
  render() {
    // TODO: Auth function
    const isAuthenticated = true;
    
    if (isAuthenticated) {
      return super.render();
    } else {
      return <Navigate to='/login' />;
    }
  }
};