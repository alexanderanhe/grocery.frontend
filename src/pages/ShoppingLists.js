import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
import { ChevronRightIcon } from '@heroicons/react/24/solid';

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
  console.log(shoppingLists);
    
  return (
    <div className="h-full relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col">
      <caption className="w-full p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        ShoppingList
        {/* <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p> */}
      </caption>
      <div className='flex-auto'>
        { shoppingLists?.map((item, index) => (
          <h2 key={`item-${index}${item._id}`}>
            <Link to={`shopping-lists/${item._id}`} className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border ${index !== shoppingLists.length - 1 ? 'border-b-0' : ''} border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`}>
              <span>{ item.name }</span>
              <ChevronRightIcon className="h-6 w-6 text-blue-500" />
            </Link>
          </h2>
        ))}
      </div>
      <footer className='h-20'>
        <Link to={`new`} class="block w-fit mx-auto my-0 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
          CREATE NEW SHOPPING LIST
        </Link>
      </footer>
    </div>
  )
}
