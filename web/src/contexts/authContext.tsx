'use client'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState, useEffect , ReactNode } from 'react';
import {IAuthContext} from './types'
import { Router } from 'next/router';

type User = {
  id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
};
  
const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  const router = useRouter();

  useEffect(() => {
    //const token = localStorage.getItem('token');
    setToken(localStorage.getItem('token') || "");
    console.log("use effect set Token : ",localStorage.getItem('token'))
    const validateToken = async () => {
        console.log("validating Token")
      try {
        const res = await fetch(process.env['NEXT_PUBLIC_GATEWAY_URL'] + '/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await res.json();
        if(data.success) {
            console.log("data.success data.name : ",data.data.name)
            setName(data.data.name);
            setRole(data.data.role);
            setToken(data.data.token);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    const currentPath = window.location.pathname;
    if(token){
      validateToken();
    }
    else if(currentPath !== '/register' && currentPath !== '/login'){
      router.push('/register')
    }

  }, [])

  const logout = () => {
    setName("");
    setRole("");
    setToken("");
    localStorage.removeItem('token');   
    router.push('/register')
  };

  return (
    <AuthContext.Provider value={{name, setName, role, setRole, token, setToken, logout}}>
      {children}
    </AuthContext.Provider>
  );
};