import { useEffect } from 'react';
import 'react-swipeable-list/dist/styles.css';
import './App.css';
import Root from "./pages/Root";
import ShoppingLists, {loader as shoppingListsLoader } from './pages/ShoppingLists';
import ShoppingList, {loader as shoppingListLoader } from './pages/ShoppingList';
import Profile, {loader as profileLoader } from './pages/Profile';
import New from './pages/New';
import { loader as CategoriesLoader} from './pages/Categories';
import ErrorPage from "./pages/error/error-page";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ShoppingLists />,
        loader: shoppingListsLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "shopping-lists/:shoppingListId",
        element: <ShoppingList />,
        loader: shoppingListLoader,
      },
      {
        path: "new",
        element: <New />,
        loader: CategoriesLoader,
      },
    ]
  },
]);


function App() {
  const theme = localStorage.theme;
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === 'dark' ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }

  useEffect(() => onWindowMatch(), [theme]);

  return (  
    <RouterProvider router={router} />
  );
}

export default App;
