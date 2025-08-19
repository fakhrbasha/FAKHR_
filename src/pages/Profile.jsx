import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getDataProfile, updatePhotoProfile } from '../services/AuthServices';
import Loader from './Loader';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import { is } from 'zod/v4/locales';

export default function Profile() {
  const queryClient = useQueryClient();
const token = localStorage.getItem("token");
  const { data, isLoading } = useQuery({
    queryKey: ['Profile'],
    queryFn: getDataProfile,
    enabled: !!token,
    select: (data) => data.data.user,
  });

  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);

  function handleUpdateImage(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imgUrl);
    }
  }

  const {mutate , isPending} = useMutation({
    mutationKey: ['updatePhoto'],
    mutationFn: (formData)=>{updatePhotoProfile(formData)},
    onSuccess:()=>{
      toast.success("Profile photo updated successfully 🎉");
      queryClient.invalidateQueries(["Profile"]);
      setImage(null);
    },
    onError:(error)=>{
      console.log(error);
    }
  });

  async function handleSubmit(e) {
  e.preventDefault();
  if (!Image) return;

  const formData = new FormData();
  formData.append("photo", Image);
  mutate(formData);
}

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto my-5 p-5">
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:space-x-4">
          {/* Left Side */}
          <div className="w-full md:w-3/12">
            <div className="bg-white p-3 border-t-4 border-green-400 relative">
              <div className="image overflow-hidden relative">
                <img
                  className="h-auto w-full mx-auto rounded"
                  src={ImagePreview || data.photo}
                  alt="profile"
                />
                <label
                  htmlFor="fakhr"
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
                >
                  <Pencil size={16} className="text-gray-700" />
                </label>
                <input
                  onChange={handleUpdateImage}
                  id="fakhr"
                  type="file"
                  className="hidden"
                />
              </div>

              {Image && (
                <Button isLoading={isPending}
                  type="submit"
                  className="mt-3 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Update Photo
                </Button>
              )}

              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {data.name}
              </h1>
              <h3 className="text-gray-600 font-semibold">Email : {data.email}</h3>
              <ul className="bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-9/12  ">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Name</div>
                    <div className="px-4 py-2">{data.name.toUpperCase()}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{data.gender.toUpperCase()}</div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href={`mailto:${data.email}`}>
                        {data.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">
                      {data.dateOfBirth
                        ? new Date(data.dateOfBirth).toISOString().split('T')[0]
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
      </div>
    </div>
  );
}
