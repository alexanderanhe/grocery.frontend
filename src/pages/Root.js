import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Root() {
  const location = useLocation();
  const path = location.pathname.substring(1);
  const pageTitle = path.search("/") >= 0
    ? path.substring(0, path.search("/")).replaceAll('-', ' ')
    : path;

  return (
    <div
      className='flex flex-col min-h-screen bg-white dark:bg-black'
    >
      <header
        className='flex-none bg-[#3cb9af] text-[#dbfaf5] pt-2'
      >
        <ul
          className='flex p-2'
          // className='p-4 bg-white dark:text-white dark:bg-gray-800 flex'
        >
          <li className='w-9 flex-none bg-[#41c0b6] rounded-full p-2'>
            { location.pathname !== '/' ? (
              <Link to={"/"} className="font-medium">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
            ) : (
              <Link to={"/help"} className="font-medium">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </Link>
            )}
          </li>
          <li className='flex-auto flex items-center justify-center uppercase text-[12px]'>
            { pageTitle || 'Shopping Lists' }
          </li>
          <li className='w-9 flex-none bg-[#41c0b6] rounded-full p-2'>
            <Link to={"/profile"} className="font-medium">
              <UserIcon className="h-5 w-5" />
            </Link>
          </li>
        </ul>
      </header>
      <div className='flex-auto flex flex-col h-full'>
        <Outlet />
      </div>
    </div>
  )
}
