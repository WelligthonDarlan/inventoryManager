import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {
  const { pathname } = useLocation()

  return (
    <main>
      <h1>Inventory</h1>
      <div className="tabs">

        <Link 
        to="/inventoryManager/items" 
        className={`tab ${pathname === "/items" ? "active" : ""}`}
        >
          Todos os itens
        </Link>


        <Link 
        to="/inventoryManager/items/new" 
        className={`tab ${pathname === "/items/new" ? "active" : ""}`}
        >
          Novo Item
        </Link>
        
      </div>
      <Outlet />
    </main>
  )
}