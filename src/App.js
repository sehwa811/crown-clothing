import { Routes, Route } from 'react-router-dom';

import { useEffect } from "react";
import { useDispatch } from 'react-redux';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import Nav from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component'
import CheckoutPage from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  //user 정보는 very top level에서 관리해야하므로 App.js에서 useEffect hook으로 정의한다
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);
  //dispatch가 절대 변하지 않기 때문에 dependency로 넣으나 마나 차이가 없다.
  //다만 리액트는 이를 모르기 때문에 dispatch를 넣으라고 경고메세지를 띄우는 것

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};  

export default App; 