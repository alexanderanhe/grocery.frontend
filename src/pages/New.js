import React, { Fragment, useMemo, useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useLoaderData } from 'react-router-dom';

export default function New() {
  const { categories } = useLoaderData();
  const [ show, setShow ] = useState({});
  const [ shoppingList, setShoppingList ] = useState([]);
  const handleCreate = (categoryId, type) => (event) => {
    setShoppingList((current) => {
      const found = current.find(({ category }) => category === categoryId);
      const filtered = current.filter(({ category }) => category !== categoryId);
      if (found?.count + type < 1) return filtered;
      return [
        ...filtered,
        {
          category: categoryId,
          count: (found?.count ?? 0) + type
        }
      ]
    })
  };

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = useMemo(
    () => categories.map((category) => {
      const children = category.children.filter((child) => 
        child.name.toLowerCase().includes(search.toLowerCase())
      );
      return children.length ? {...category, children} : null;
    }).filter((child) => child),
    [search]
  );

  return (
    <>
      <div className="">
        <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input type="text" value={search} onChange={handleSearch} className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                </div>
              </form>
            </div>
            <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <button type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <PlusIcon className="h-3.5 w-3.5 mr-2" />
                Add category
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="accordion-collapse" data-accordion="collapse">
        {filteredUsers?.map((category) => (
          <Fragment key={`${category._id}`}>
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                onClick={() => setShow({...show, [category._id]: !show[category._id]})}
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>{ category.name }</span>
                { show[category._id] ? (
                    <ChevronDownIcon className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5 text-blue-500" />
                ) }
              </button>
            </h2>
            <div className={show[category._id] ? '' : 'hidden' }>
              <div className="px-5 py-3 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                { category?.children?.map((sbcategory) => (
                  <div key={sbcategory._id} className='flex text-gray-900 dark:text-white gap-2'>
                    { shoppingList.some(({ category, count }) => category?.localeCompare(sbcategory._id) === 0 && count ) && (
                      <>
                        <button type="button" onClick={handleCreate(sbcategory._id, -1)} className="mb-2 text-gray-500 dark:text-gray-400 flex gap-2">
                          <MinusCircleIcon className="w-6 h-6" />
                        </button>
                        { shoppingList.find(({ category, count }) => category?.localeCompare(sbcategory._id) === 0 && count )?.count || 0 }
                      </>
                    )}
                    <button type="button" onClick={handleCreate(sbcategory._id, 1)} className="mb-2 text-gray-500 dark:text-gray-400 flex gap-2">
                      <PlusCircleIcon className="w-6 h-6" />
                    </button>
                    { sbcategory.name }
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  )
}
