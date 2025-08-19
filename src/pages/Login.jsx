import React, { useContext } from 'react'
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { loginApi } from '../services/AuthServices';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../schema/LoginSchema';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';

export default function LoginPage() {

  const { setIsLoggedIn } = useContext(AuthContext)
  const [errMsg, setErrMsg] = React.useState('')
  // const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm(
    {
      defaultValues:
      {
        email: "",
        password: "",
      },
      resolver: zodResolver(LoginSchema),
    },
  )


  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (formData) => loginApi(formData),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      setIsLoggedIn(true)
      navigate("/")
    },
    onError: (error) => {
      const msg = error.response?.data?.error || error.message || "Something went wrong"
      setErrMsg(msg)

    }
  })
  async function handleLogin(formData) {
    setErrMsg('');
    mutate(formData);
  };



  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className=' flex flex-col gap-6'>
          <h1 className='text-blue-500 text-center'>Login Page</h1>
          <Input isInvalid={Boolean(errors?.email?.message)} errorMessage={errors?.email?.message} variant='bordered' label="Email" type="email" {...register('email')} />
          <Input isInvalid={Boolean(errors?.password?.message)} errorMessage={errors?.password?.message} variant='bordered' label="password" type="password" {...register('password')} />
          <Button type='submit' isLoading={isPending} color="primary" variant="bordered">
            Login
          </Button>
          <p>Don't Have Account <Link to='/register' className='text-blue-500 font-bold  cursor-pointer'>Create Account now</Link></p>
          {errMsg && <p className='p-3 bg-red-200 text-red-700 text-sm text-center capitalize rounded-2xl' >{errMsg}</p>}
        </div>
      </form>
    </>
  )
}
