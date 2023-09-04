import React, { Fragment, useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router-dom';
import Search from '../components/Search';

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

  return (
    <>
      <Search />
      <div id="accordion-collapse" data-accordion="collapse">
        {categories?.map((category) => (
          <Fragment key={`${category._id}`}>
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                onClick={() => setShow({...show, [category._id]: !show[category._id]})}
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>{ category.name }</span>
                { show[category._id] ? (
                    <ChevronDownIcon className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ChevronUpIcon className="w-6 h-6 text-blue-500" />
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
