import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useForm } from '../hooks/useForm';
import Add from '../img/addAvatar.png';
import { Loader } from '../components';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const {
    displayName,
    email,
    password,
    file,
    onInputChange,
    onInputChangeFile,
  } = useForm({
    displayName: '',
    email: '',
    password: '',
    file: '',
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      /* Uploading the image to firebase storage and then getting the download url of the image and
      then updating the user profile with the displayName and photoURL. */
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            /* Updating the user profile with the displayName and photoURL. */
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            /* Creating a new document in the users collection with the uid of the user as the document
           id. */
            await setDoc(doc(db, 'users', response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', response.user.uid), {});
          } catch (err) {
            toast.error('Something went wrong');
            setLoading(false);
          }
        });
      });
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatIn</span>
        <span className="title">Register</span>
        <img src={file} alt="" />
        <form onSubmit={handleSubmit}>
          <input
            required
            onChange={onInputChange}
            name="displayName"
            value={displayName}
            type="text"
            placeholder="Display name"
          />
          <input
            required
            type="email"
            onChange={onInputChange}
            name="email"
            value={email}
            placeholder="Email"
          />
          <input
            required
            type="password"
            onChange={onInputChange}
            name="password"
            value={password}
            placeholder="Password"
          />
          <input
            required
            style={{ display: 'none' }}
            name="file"
            onChange={onInputChangeFile}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>
            {!loading ? 'Sign up' : <Loader />}
          </button>
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
