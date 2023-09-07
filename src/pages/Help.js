import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'

export default function Help() {
  return (
    <>
      <Header></Header>
      <Layout
      TitleContent={() => (<></>)}
      FooterContent={() => (<></>)}
    >
      <div>Help</div>
    </Layout>
    </>
  )
}
