import React from 'react'

export default function Header({ children }) {
  return (
    <div
      style={{ borderRadius: '0 140px / 100%', borderTopRightRadius: 0}}
      className='flex-none bg-[#3cb9af] text-[#dbfaf5] flex items-center justify-center font-bold text-lg p-5'
    >
      { children }
    </div>
  )
}
