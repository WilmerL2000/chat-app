import { useContext, useReducer, useState } from 'react';
import { AuthContext, ChatContext } from './';

export const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const [isInChat, setIsInChat] = useState(false);

  /**
   * It takes in a state and an action and returns a new state based on the action.type.
   * @param state - The current state of the reducer.
   * @param action - An object that contains the type of action and the payload.
   * @returns The state is being returned.
   */
  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{ data: state, dispatch, isInChat, setIsInChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
