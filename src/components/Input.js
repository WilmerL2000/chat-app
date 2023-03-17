import React, { useContext, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import Img from '../img/img.png';
import { db, storage } from '../firebase';
import { AuthContext, ChatContext } from '../context';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      /* Creating a reference to the storage. */
      const storageRef = ref(storage, uuid());

      /* Uploading the image to the storage. */
      const uploadTask = uploadBytesResumable(storageRef, img);

      /* Uploading the image to the storage. */
      uploadTask.on(
        (error) => {
          console.error(error);
        },
        () => {
          /* Getting the download URL of the image that was uploaded to the storage. */
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text) {
        /* Adding a new message to the chat. */
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      /* Updating the userChats collection with the last message and date. */
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });

      /* Updating the userChats collection with the last message and date. */
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }

    setText('');
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>
          <PaperAirplaneIcon style={{ height: '24px', width: '22px' }} />
        </button>
      </div>
    </div>
  );
};

export default Input;
