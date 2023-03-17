import React, { useContext } from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">ChatIn</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="UserPhoto" />
        <span>{currentUser.displayName}</span>
      </div>
      <button onClick={() => signOut(auth)}>
        <ArrowLeftOnRectangleIcon style={{ height: '30px', width: '30px' }} />
      </button>
    </div>
  );
};

export default Navbar;
