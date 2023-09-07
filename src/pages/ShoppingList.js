import React from 'react';
import Search from '../components/Search';
import Header from '../components/Header';
import Layout from '../components/Layout';
// import { useLoaderData } from "react-router-dom";

const getShoppingList = async (shoppingListId) => {
  // try {
  //   // const req = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/shopping/${shoppingListId}`);
  //   // return await req.json();
  //   return;
  // } catch (e) {
  //   console.error(e.message);
  // }
};

export async function loader({ params }) {
  const shoppingList = await getShoppingList(params.shoppingListId);
  return { shoppingList };
}

export default function ShoppingList() {
  // const { shoppingList } = useLoaderData();

  return (
    <>
      <Header></Header>
      <Layout FooterContent={() => <></>}>
        <Search />
      </Layout>
    </>
  )
}
