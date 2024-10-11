import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import EmployeeListView from './views/EmployeeListView';
import EmployeeDetailView from './views/EmployeeDetailView';
import ProfileView from './views/ProfileView';
import NotFoundView from './views/NotFoundView';
import AuthRoute from './utils/AuthRoute'; 

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />

        <Route element={<AuthRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<EmployeeListView />} />
            <Route path="/employees/:id" element={<EmployeeDetailView />} />
            <Route path="/profile" element={<ProfileView />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
