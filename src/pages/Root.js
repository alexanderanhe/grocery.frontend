import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export default function Root() {
  const location = useLocation();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-col">
      <ul className='p-4 bg-white dark:text-white dark:bg-gray-800 flex'>
        <li>
          { location.pathname !== '/' ? (
            <Link to={"/"} className="font-medium text-blue-600 dark:text-blue-500 flex">
              <ChevronLeftIcon className="h-6 w-6 text-blue-500" /> Back
            </Link>
          ) : (
            <Link to={"/help"} className="font-medium text-blue-600 dark:text-blue-500">
              Help
            </Link>
          )}
        </li>
      </ul>
      <div className='flex-auto mt-4'>
        <Outlet />
      </div>
    </div>
  )
}
