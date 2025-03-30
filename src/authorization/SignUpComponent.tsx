import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch'; 
import { useAppSelector } from '../hooks/useAppSelector';
import { signup } from './../redux/fetchData';  
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeftLong } from "react-icons/fa6";

export const SignUpComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useAppSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: '',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordVisibilityAgain = () => setShowPasswordAgain(!showPasswordAgain);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <section>
      <Link to="/">
        <FaArrowLeftLong size={25} />
      </Link>

      <section className="overflow-hidden flex max-md:flex-col gap-8 max-md:gap-2">
        <img 
          className="w-1/2 max-md:w-full max-md:m-1 object-cover h-96 max-md:h-52" 
          src="/images/wild.webp" 
          alt="Signup" 
        />
        <section className="w-1/2 max-md:w-full ml-16">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!token ? (
            <form 
              className="w-4/5 mt-1 flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              {/* Username */}
              <label className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Username</h3>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </label>

              {/* Email */}
              <label className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Email</h3>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@gmail.com"
                  required
                />
              </label>

              {/* Password */}
              <label className="flex flex-col gap-2 relative">
                <h3 className="text-lg font-semibold">Password</h3>
                <input
                  className="input-field"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-icon"
                />
              </label>

              {/* Confirm Password */}
              <label className="flex flex-col gap-2 relative">
                <h3 className="text-lg font-semibold">Confirm Password</h3>
                <input
                  className="input-field"
                  type={showPasswordAgain ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
                <FontAwesomeIcon
                  icon={showPasswordAgain ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibilityAgain}
                  className="password-icon"
                />
              </label>

              {/* Phone Number */}
              <label className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Phone Number</h3>
                <input
                  className="input-field"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
              </label>

              {/* Country */}
              <label className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Country</h3>
                <input
                  className="input-field"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
              </label>

              {/* Submit Button */}
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </form>
          ) : (
            <h3>You are logged in</h3>
          )}

          {/* Login Redirect */}
          <section className="flex justify-between mt-2 text-lg">
            <h3>Have an account?</h3>
            <Link className="mr-24" to="/authenticate">Login</Link>
          </section>
        </section>
      </section>
    </section>
  );
};
