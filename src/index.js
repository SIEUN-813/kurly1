import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './WrapComponent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import isAddressAPIModal from './reducer/isAddressAPIModal';
import addressAPIModal from './reducer/addressAPIModal';
import confirmModal from './reducer/confirmModal';
import confirmService1Modal from './reducer/confirmService1Modal'
import confirmService2Modal from './reducer/confirmService2Modal'
import confirmService3Modal from './reducer/confirmService3Modal'
import mainModal from './reducer/mainModal';
import topModal from './reducer/topModal'
import quickMenuViewProduct from './reducer/quickMenuViewProduct';
import viewProduct from './reducer/viewProduct';
import viewProductIsFlag from './reducer/viewProductIsFlag';
import signIn from './reducer/signIn';

let store = configureStore({
  reducer: {
    isAddressAPIModal,
    addressAPIModal,
    confirmModal,
    confirmService1Modal,
    confirmService2Modal,
    confirmService3Modal,
    mainModal,
    topModal,
    quickMenuViewProduct,
    viewProduct,
    viewProductIsFlag,
    signIn
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WrapComponent />
    </Provider>
  </React.StrictMode>
);