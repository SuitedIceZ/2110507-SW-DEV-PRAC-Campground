import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from "@/contexts/authContext";

const useRegisterForm = () => {
  const [name, setFormName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tel, setTel] = useState('')
  const { setName, setToken, setRole, setId} = useAuth();
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
        name: name,
        email: email,
        password: password,
        tel: tel,
        role: "user"
      }
      const res = await fetch(process.env["NEXT_PUBLIC_GATEWAY_URL"] + '/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
      })

      const data = await res.json();
      if (!data.success) {

      } else {
        localStorage.setItem('token', data.token)
       setName(data.name)
       setToken(data.token)
       setRole("user")
       setId(data._id)
        router.push('/campgrounds')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value)
  }

  return {
    name,
    email,
    password,
    tel,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleTelChange,
    handleSubmit,
  }

}

export default useRegisterForm