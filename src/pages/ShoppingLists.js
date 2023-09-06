import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Layout from '../components/Layout';

const getShoppingList = async () => {
  try {
    const req = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/shopping/`);
    return await req.json();
  } catch (e) {
    console.error(e.message);
  }
};

export async function loader() {
  const shoppingLists = await getShoppingList();
  return { shoppingLists };
}

export default function ShoppingLists() {
  const { shoppingLists } = useLoaderData();

  const roundedTopRight = { borderRadius: '0 60px / 50px', borderBottomLeftRadius: '0' };

  const FooterContentContainer = () => (
    <Link to={`new-shopping-list`} className="block w-fit mx-auto my-0 bg-[#3cb9b0] text-white py-3 px-4 rounded-full">
      Create new shopping list
    </Link>
  );

  return (
    <Layout
      TitleContent={() => `${shoppingLists.length} items`}
      FooterContent={FooterContentContainer}
    >
      <div
        className='absolute inset-0 flex flex-col'
      >
        <div className='flex-auto'>
          { shoppingLists?.map((item, index) => (
            <h2 key={`item-${index}${item._id}`}>
              <Link
                to={`shopping-lists/${item._id}`}
                style={roundedTopRight}
                className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 ${index ? 'border-t' : ''}  border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400`}
              >
                <span>{ item.name }</span>
                <ChevronRightIcon className="h-6 w-6 text-blue-500" />
              </Link>
            </h2>
          ))}
        </div>
      </div>
    </Layout>
  )
}
