import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ItemsLayout from "./pages/items/Layout";
import ListItems from "./pages/items/ListItems";
import CreateItem from "./pages/items/CreateItem";
import ShowItem from "./pages/items/ShowItem";
import UpdateItem from "./pages/items/UpdateItem";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: `/inventoryManager/`, 
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: `/inventoryManager/items/`,
        element: <ItemsLayout />,
        children: [
          { index: true, element: <ListItems /> },
          { path: `/inventoryManager/items/new/`, element: <CreateItem /> },
          { path: `/inventoryManager/items/:id/`, element: <ShowItem /> },
          { path: `/inventoryManager/items/:id/update/`, element: <UpdateItem /> },
        ],
      },
    ],
  },
]);

export default router;
