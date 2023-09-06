import { useCallback, useEffect } from 'react';
import 'react-swipeable-list/dist/styles.css';
import './App.css';
import Root from "./pages/Root";
import ShoppingLists, {loader as shoppingListsLoader } from './pages/ShoppingLists';
import ShoppingList, {loader as shoppingListLoader } from './pages/ShoppingList';
import Profile, {loader as profileLoader } from './pages/Profile';
import NewShoppingList from './pages/NewShoppingList';
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
        path: "new-shopping-list",
        element: <NewShoppingList />,
        loader: CategoriesLoader,
      },
    ]
  },
]);


function App() {
  const theme = localStorage.theme;
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const onWindowMatch = useCallback(() => {
    if (
      theme === 'dark' ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }, [ element.classList, darkQuery.matches, theme ]);

  useEffect(() => onWindowMatch(), [ onWindowMatch ]);

  return (  
    <RouterProvider router={router} />
  );
}

export default App;
