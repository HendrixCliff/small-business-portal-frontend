import FetchProducts from './ProtectedRoutes/FetchProducts';
import UploadProduct from './ProtectedRoutes/UploadProduct';
import VideoList from './ProtectedRoutes/VideoList';
import VideoUpload from './ProtectedRoutes/VideoUpload';
import { Link } from "react-router-dom";
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { logout } from './redux/authSlice';


function Dashboard() {
  const { isLoggedIn } = useAppSelector((state) => state.auth); 
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());
//  const userId = user?._id || "";
  //const isAdmin = userId === ADMIN_ID; // Replace with actual user ID from authentication
 
  
  return (
    <>
      <header className="mb-[.5em]">
        {!isLoggedIn ? (
          <section className="flex gap-[3em] max-[600px]:gap-[.5em] max-md:mt-[1em] max-[600px]:mr-[5.5em]  w-[20%] max-md:w-[60%] max-md:gap-[.5em] ml-auto">
            <Link to="/authenticate" className="btn text-center bg-[#ffed2f] text-[1rem] text-[#2f42ff] rounded-full w-[60%] px-[.6em] py-[1em]">Login</Link>
            <Link to="/signup" className="btn px-[.6em] text-center text-[1rem]  rounded-full text-[#ffed2f] bg-[#2f42ff]  w-[70%] py-[1em]">Signup</Link>
          </section>
        ) : (
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        )}
      </header>
   

      <FetchProducts />
      <UploadProduct />
      <VideoUpload/>
      <VideoList />
    </>
  );
}

export default Dashboard;


