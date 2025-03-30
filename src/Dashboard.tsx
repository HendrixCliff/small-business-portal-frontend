import FetchProducts from './ProtectedRoutes/FetchProducts';
import UploadProduct from './ProtectedRoutes/UploadProduct';
import VideoList from './ProtectedRoutes/VideoList';
import Chat from "./ProtectedRoutes/Chat"
import VideoUpload from './ProtectedRoutes/VideoUpload';
import { Link } from "react-router-dom";
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { logout } from './redux/authSlice';

const ADMIN_ID = "67bf75c3fec31bb6f9f068fd"; 

function Dashboard() {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth); 
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());
  const userId = user?._id || "";
  const isAdmin = userId === ADMIN_ID; // Replace with actual user ID from authentication
 
  
  return (
    <>
      <header className="mb-[.5em]">
        {!isLoggedIn ? (
          <section className="flex gap-[3em] max-md:mt-[1em] w-[20%] max-md:w-[60%] max-md:gap-[.5em] ml-auto">
            <Link to="/authenticate" className="btn">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </section>
        ) : (
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        )}
      </header>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* ✅ Only render Chat if `userId` exists */}
        <Chat userId={userId} isAdmin={isAdmin} /> {/* ✅ Pass isAdmin */}
      </div>

      <FetchProducts />
      <UploadProduct />
      <VideoUpload/>
      <VideoList />
    </>
  );
}

export default Dashboard;


