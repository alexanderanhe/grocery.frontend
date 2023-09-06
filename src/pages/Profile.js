import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

export function loader() {
  const theme = localStorage.getItem('theme') ?? 'system';
  return { theme };
}

const themeOptions = [
  {
    name: 'light',
    Icon: SunIcon,
  },
  {
    name: 'dark',
    Icon: MoonIcon,
  },
  {
    name: 'system',
    Icon: ComputerDesktopIcon,
  },
]

export default function Profile() {
  const [ theme, setTheme ] = useState(localStorage.getItem('theme') ?? 'system');
  const element = document.documentElement;
  
  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
    }
  }, [ theme, element ]);

  return (
    <div className='text-[#0b0e32] dark:text-white p-3'>
      <h2 className='uppercase text-xs pb-3'>Theme</h2>
      <div className='flex gap-2 justify-center'>
        { themeOptions.map(({name, Icon}) => (
          <button
            key={name}
            type='button'
            onClick={ () => setTheme(name)}
            className={`flex gap-2 rounded-full p-2 px-4 ${
              theme === name ? 'text-[#dbfaf5] bg-[#3cb9af]' : 'text-[#0b0e32] bg-[#f7f7f5]'
            }`}
          >
            <Icon className='h-6 w-6' /> { name }
          </button>
        ))}
      </div>
    </div>
  )
}
