// import React from 'react';
// import { useLoaderData, Link } from "react-router-dom";
// import { ChevronRightIcon } from '@heroicons/react/24/solid';

const getCategories = async () => {
  try {
    const req = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category/`);
    return await req.json();
  } catch (e) {
    console.error(e.message);
  }
};

export async function loader() {
  const categories = await getCategories();
  return { categories };
}