import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ResponsiveDrawer from './components/Drawer'; // الـ drawer الثابت
import UsersEmails from './pages/UsersEmails';
import CompaniesEmails from './pages/CompaniesEmails';
import UsersShippments from './pages/UsersShippments';
import CompainesShippments from './pages/CompainesShippments';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  

  useEffect(() => {
    // إذا لم يكن هناك رمز (token)، قم بالتوجيه إلى صفحة تسجيل الدخول
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <>
      <ToastContainer/>
    <Routes>
      {/* صفحة تسجيل الدخول */}
      <Route
        path="/login"
        element={
          <Login
            onLogin={(newToken) => {
              localStorage.setItem('token', newToken); // حفظ الرمز بعد تسجيل الدخول
              setToken(newToken); // تحديث حالة الرمز
              navigate('/usersEmails'); // التوجيه إلى لوحة التحكم
            }}
            url={backendUrl}
            token={token}
            setToken={setToken}
          />
        }
      />

      {/* عرض لوحة التحكم */}
      {token && (
        <Route path="/" element={<ResponsiveDrawer />}>
          {/* المحتويات تظهر داخل الـ Outlet داخل ResponsiveDrawer */}
          <Route path="usersEmails" element={<UsersEmails token={token} url={backendUrl}/>} />
          <Route path="compEmails" element={<CompaniesEmails token={token} url={backendUrl}/>} />
          <Route path="usersShips" element={<UsersShippments token={token} url={backendUrl}/>} />
          <Route path="compShips" element={<CompainesShippments token={token} url={backendUrl}/>} />
          <Route path="contacts" element={<Contacts token={token} url={backendUrl}/>} />
        </Route>
      )}
    </Routes>
    </>
  );
};

export default App;
