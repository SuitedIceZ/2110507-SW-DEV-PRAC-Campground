import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from "@/contexts/authContext/authContext";
import { useSnackbar } from '@/contexts/snackbarContext';

const useRegisterForm = () => {
  const [name, setFormName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tel, setTel] = useState('')
  const { setName, setToken, setRole, setId} = useAuth();
  const router = useRouter();
  const { displaySnackbar } = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name.trim() === '') {
      displaySnackbar('Please enter name','error')
      return;
    }
    if (email.trim() === '') {
      displaySnackbar('Please enter email','error')
      return;
    }
    if (password.trim() === '') {
      displaySnackbar('Please enter password','error')
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
          const isTelValid = /^[0-9]{10,}$/.test(tel);
          const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          if(password.length < 6){
            displaySnackbar('Password lenght must be atleast 6 character','error')
          }
          else if(!isEmailValid){
            displaySnackbar('Email format is incorrect','error')
          }
          else if(tel.length < 10){
            displaySnackbar('Phone number must be atleast 10 digit','error')
          }
          else if(!isTelValid){
            displaySnackbar('Phone number can only contains 0-9','error')
          }
          else{
            displaySnackbar('Name or email is already used','error')
          }
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