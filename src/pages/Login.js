import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useForm } from '../hooks/useForm';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*It is a function that takes in the auth
      object, email and password. It then signs in the user with the email and password. */
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatIn</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={onInputChange}
            name="email"
            value={email}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={onInputChange}
            name="password"
            value={password}
            placeholder="Password"
          />
          <button>Sign in</button>
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
