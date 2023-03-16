import React from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          // onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={() => {}}>
          <PaperAirplaneIcon style={{ height: '24px', width: '22px' }} />
        </button>
      </div>
    </div>
  );
};

export default Input;
