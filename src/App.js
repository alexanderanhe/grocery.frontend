import 'react-swipeable-list/dist/styles.css';
import './App.css';
import Root from "./pages/Root";
import ShoppingLists, {loader as shoppingListsLoader } from './pages/ShoppingLists';
import ShoppingList, {loader as shoppingListLoader } from './pages/ShoppingList';
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
  return (
    <div className='h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-screen-xl mx-auto w-full'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
