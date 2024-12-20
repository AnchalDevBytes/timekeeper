"use client";
import { LogoutResponseInterface } from '@/interfaces/LogoutResponseInterface';
import axiosClient from '@/lib/axiosClient';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaCalendarAlt } from 'react-icons/fa';
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
          window.location.href = "/";
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
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-white text-3xl" />
        <h1 className="text-2xl font-bold text-white tracking-wide">Timekeeper</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLogout}
          className="text-white bg-purple-500 hover:bg-purple-600 active:scale-95 px-6 py-2 rounded-full flex items-center transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          <CiUser className="mr-2 h-5 w-5" />
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  )
}

export default Header;
