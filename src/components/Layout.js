import React from 'react'
import Footer from './Footer'

export default function Layout({ FooterContent, children }) {
  const roundedTopRight = { borderRadius: '0 60px / 50px', borderBottomLeftRadius: '0' };
  return (
    <>
      <div className='flex-auto flex flex-col h-full bg-[#3cb9af]'>
        <div
          style={roundedTopRight}
          className='flex-auto relative bg-white dark:bg-black p-4 pb-6'
        >
          { children }
        </div>
      </div>
      <Footer>
        <FooterContent />
      </Footer>
    </>
  )
}
