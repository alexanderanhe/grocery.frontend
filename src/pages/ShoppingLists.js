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
      <section className="flex-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 flex flex-col">
        { shoppingLists?.map((item, index) => (
          <div
            key={`item-${index}${item._id}`}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex">
              <div className="flex-auto px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  { item.name }
              </div>
              <div className="w-20 px-6 py-4 text-right">
                <Link to={`shopping-lists/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <ChevronRightIcon className="h-6 w-6 text-blue-500" />
                </Link>
              </div>
          </div>
        ))}
      </section>
      <footer className='h-20'>
        <button class="d-block mx-auto my-0 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          CREATE NEW SHOPPING LIST
        </button>
      </footer>
    </div>
  )
}
