"use client";
import { LogoutResponseInterface } from '@/interfaces/LogoutResponseInterface';
import axiosClient from '@/lib/axiosClient';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { toast } from 'react-toastify';

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<LogoutResponseInterface> =
        await axiosClient.get("/api/logout");
      if (response.data.success) {
        toast.success(response.data.message);
        if(typeof window !== "undefined" && window?.location?.href) {
          window.location.href = "/signin";
        }
      } else {
        const data: LogoutResponseInterface = response.data;
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknow error while Logout...");
      }
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Calendar App</h1>
        <div className="flex items-center space-x-4">
        <button 
          onClick={handleLogout}
          className="text-black hover:text-blue-600 active:scale-75 bg-gray-100 px-4 py-1 rounded-md flex items-center"
        >
            <CiUser className="mr-2 h-5 w-5" />
            {isLoading ? "logging out..." : "Logout"}
        </button>
        <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden bg-gray-300">
            <CiUser className='h-6 w-6 text-black'/>
        </div>
        </div>
    </header>
  )
}

export default Header;
