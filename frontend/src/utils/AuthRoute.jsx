import { Navigate, Outlet } from 'react-router-dom';
import employeeService from '../services/EmployeeService';

const AuthRoute = () => {
  const isAuthenticated = employeeService.isAuthenticated(); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
