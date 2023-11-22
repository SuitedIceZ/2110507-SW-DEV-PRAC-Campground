import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from "@/contexts/authContext";

const useLoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setName, setToken, setRole } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim() === '') {
      return;
    }
    if (password.trim() === '') {
      return;
    }
    try {
      const req = {
        email: email,
        password: password,
      }
      const res = await fetch(process.env["NEXT_PUBLIC_GATEWAY_URL"] + '/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
      })

      const data = await res.json();
      window.alert(data.success)
      if (!data.success) {

      } else {
        localStorage.setItem('token', data.token)
       setName(data.name)
       setToken(data.token)
       //setRole(data.data.role)
        router.push('/campgrounds')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return {
    email,
    password,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  }

}

export default useLoginForm