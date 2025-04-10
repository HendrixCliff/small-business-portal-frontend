import LoginComponent from './authorization/LoginComponent';  
import { Link } from "react-router-dom"
import { FaArrowLeftLong} from "react-icons/fa6"


function AuthenticatePage() {

  return (
    <section>
      <Link to="/"><FaArrowLeftLong size={25}/></Link>
      <section className="flex max-[600px]:flex-col">
      <img className="w-[52%] max-[600px]:w-[100%] max-md:m-[.2em] object-cover h-[37em] max-md:h-[20em]"  src="/images/Sunshine.webp" alt="Description" />
        <section className="mt-[7em] max-md:mt-[.5em] max-md:w-[100%] w-[48%] max-sm:ml-[0.01em] max-sm:w-[100%] max-mad:w-[98%]  max-md:ml-[.1em] overflow-hidden "> 
         <h2 className="font-sans font-bold text-center max-md:w-[98%] text-[2.5rem]">Welcome Back!</h2>
         <h4 className="text-[1.3rem] text-center">Enter your email and password to access your account</h4> 
         <section className="ml-[7em] max-md:ml-[2em] max-md:w-[100]">
          <LoginComponent />
          <h3 className="text-[1.3rem] ml-[1em]">Don't have an account?</h3>
          <section className="flex justify-between text-[1.2rem]  mt-[.3em]  max-md:w-[95%]">
          <Link className="ml-[1.4em]" to="/signup">Sign Up</Link>
          <Link className="mr-[1.4em]" to="/forgot-password">Forgot Password</Link>
          {}
        </section>
        </section>
    </section>
  </section>
  </section>
  )
}

export default AuthenticatePage