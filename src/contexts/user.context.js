import { createContext, useEffect, useReducer } from "react";

import createAction from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// actual value you want to access(전달하려는 context값)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default: 
      throw new Error('Unhandled type ${type} in userReducer')
  }
}

const INITIAL_STATE = {
  currentUser: null
}

// actual Component that warps everything
//userProvider는 자기 자식 component들이 자신의 useState안에 있는 값에 접근할 수 있도록 해준다
export const UserProvider = ({ children }) => {
  const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);
  //const { currentUser } = state 를 그냥 생략

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};