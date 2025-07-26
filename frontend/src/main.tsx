import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import LogoutPage from "./pages/LogoutPage/LogoutPage.tsx";
import Layout from "./layouts/Layout.tsx";
import {userState} from "./store/store.ts";
import { Toaster } from 'react-hot-toast';

const user = userState.getState().user

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<App />}/>
                {!user ?
                    (
                        <>
                            <Route path={'/register'} element={<RegisterPage/>}/>
                            <Route path={'/login'} element={<LoginPage/>}/>
                        </>
                    ): (
                        <Route path={'/logout'} element={<LogoutPage/>}/>
                    )
                }
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  </StrictMode>,
)
