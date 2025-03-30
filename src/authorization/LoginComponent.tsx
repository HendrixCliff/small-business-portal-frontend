import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { login } from '../redux/fetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface LoginPayload {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, loading, error } = useAppSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      console.error('Email or password is missing');
      return;
    }

    const payload: LoginPayload = { email, password };

    console.log('Logging in with:', payload);

    try {
      await dispatch(login(payload)).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <section className="overflow-hidden max-md:w-[99%] mr-[1em]">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoggedIn ? (
        <form className="flex flex-col gap-[1em] max-md:gap-[.3em]" onSubmit={handleLogin}>
          {/* Email Input */}
          <label className="text-[1.3rem] mt-[1.1em] flex flex-col gap-[.7em]">
            Email
            <input
              className="w-[100%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc]"
              type="email"
              name="email"
              placeholder="Enter your Email"
              required
            />
          </label>

          {/* Password Input */}
          <label className="text-[1.3rem] relative flex flex-col gap-[.7em]">
            Password
            <input
              className="w-[100%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc]"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your Password"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="absolute right-[1em] top-[50%] transform -translate-y-1/2 cursor-pointer"
            />
          </label>

          {/* Submit Button */}
          <button
            className="ml-auto mr-auto mt-[1.5em] text-center font-bold rounded-[1em] p-[.4em] text-[1.7rem] text-[#f1fffc] bg-[#1f1915] w-[50%] max-md:w-[70%]"
            type="submit"
          >
            Login
          </button>
        </form>
      ) : (
        <h3 className="text-[2rem] text-green-600">You are logged in</h3>
      )}
    </section>
  );
};

export default LoginComponent;
