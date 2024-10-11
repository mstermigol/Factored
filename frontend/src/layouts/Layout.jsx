import { Outlet} from 'react-router-dom';
import AppBar from '../components/AppBar';
import '../assets/global.css'

const Layout = () => {


  return (
    <div>
      <AppBar />
      <main className='layout-main'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
