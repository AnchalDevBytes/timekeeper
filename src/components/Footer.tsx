import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-purple-700 to-blue-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-purple-500 pb-6 mb-6">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Timekeeper</h2>
            <p className="text-purple-200 mt-2">
              Your time, beautifully organized. Experience smarter scheduling and analytics.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/AnchalDevBytes/"
                target="_blank"
                className="text-purple-200 hover:text-purple-100"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anchaldevbytes/"
                target="_blank"
                className="text-purple-200 hover:text-purple-100"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </Link>
              <Link
                href="https://x.com/AnchalTwt"
                target="_blank"
                className="text-purple-200 hover:text-purple-100"
              >
                <FaTwitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center text-purple-200 text-sm mt-6">
          <p>&copy; {new Date().getFullYear()} Timekeeper. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
