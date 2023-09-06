import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

export default function Layout({ TitleContent, FooterContent, children }) {
  const roundedTopRight = { borderRadius: '0 60px / 50px', borderBottomLeftRadius: '0' };
  return (
    <>
      <Header><TitleContent/></Header>
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
