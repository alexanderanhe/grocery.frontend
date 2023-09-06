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
    <div
      className='absolute inset-0 flex flex-col'
      // className="h-full relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col"
    >
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
      <div>
        <Link to={`new`} className="block w-fit mx-auto my-0 bg-[#3cb9b0] text-white py-3 px-4 rounded-full">
          Create new shopping list
        </Link>
      </div>
    </div>
  )
}
