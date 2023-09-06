import React from 'react'

export default function Footer({ children }) {
  return (
    <footer className='bg-[#0b0e32] dark:bg-[#fffaf0]'>
      <div
        style={{ borderRadius: '60px / 100%', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
        className='flex-auto bg-white dark:bg-black border-none p-4 pb-6'
      ></div>
      <div className='p-8'>
        { children }
      </div>
    </footer>
  )
}
