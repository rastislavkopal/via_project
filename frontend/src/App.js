import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.less';
import Home from './layouts/home';
import Header from './layouts/header';
import Footer from './layouts/footer';
import SignIn from './layouts/authentication/sign-in';
import SignUp from './layouts/authentication/sign-up';
import Logout from './layouts/authentication/logout';
import Dashboard from './layouts/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact target="_blank" path="/docs" element={<Navigate target="_blank" to="/docs" />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
