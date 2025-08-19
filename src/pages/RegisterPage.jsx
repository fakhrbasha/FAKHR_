import React from 'react'
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/react";
import { registerApi } from '../services/AuthServices';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from "../schema/registerSchema"
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [errMsg, setErrMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: ""
    },
    resolver: zodResolver(registerSchema),
    mode: 'onBlur'
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['registerApi'],
    mutationFn: (formData) => registerApi(formData),
    onSuccess: (data) => {
      reset();
      setSuccessMsg(data.message);
      toast.success("Account created successfully 🎉");
      setTimeout(() => navigate("/login"), 1000);
    },
    onError: (error) => {
      const msg = error.response?.data?.error || error.message || "Something went wrong";
      setErrMsg(msg);
      toast.error(msg);
    }
  });

  function handleRegister(formData) {
    setErrMsg('');
    setSuccessMsg('');
    mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className='flex flex-col gap-6'>
        <h1 className='text-blue-500 text-center'>Register Page</h1>

        <Input isInvalid={Boolean(errors?.name?.message)} errorMessage={errors?.name?.message} variant='bordered' label="Name" {...register('name')} />
        <Input isInvalid={Boolean(errors?.email?.message)} errorMessage={errors?.email?.message} variant='bordered' label="Email" type="email" {...register('email')} />
        <Input isInvalid={Boolean(errors?.password?.message)} errorMessage={errors?.password?.message} variant='bordered' label="Password" type="password" {...register('password')} />
        <Input isInvalid={Boolean(errors?.rePassword?.message)} errorMessage={errors?.rePassword?.message} variant='bordered' label="Confirm Password" type="password" {...register('rePassword')} />
        <Input isInvalid={Boolean(errors?.dateOfBirth?.message)} errorMessage={errors?.dateOfBirth?.message} variant='bordered' label="Date Of Birth" type="date" {...register('dateOfBirth')} />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isInvalid={Boolean(errors?.gender?.message)}
              errorMessage={errors?.gender?.message}
              variant="bordered"
              label="Gender"
            >
              <SelectItem key="male" value="male">Male</SelectItem>
              <SelectItem key="female" value="female">Female</SelectItem>
            </Select>
          )}
        />

        <Button type='submit' isLoading={isPending} color="primary" variant="bordered">
          Register
        </Button>

        <p>Already Have Account? <Link to='/login' className='text-blue-500 font-bold cursor-pointer'>Login now</Link></p>

        {errMsg && <p className='p-2 bg-red-200 text-red-700 text-sm text-center capitalize rounded'>{errMsg}</p>}
        {successMsg && <p className='p-2 bg-green-200 text-green-700 text-sm text-center capitalize rounded'>{successMsg}</p>}
      </div>
    </form>
  )
}
