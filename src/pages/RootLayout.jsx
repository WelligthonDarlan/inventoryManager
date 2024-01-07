import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <Link to="/" className="logo">Furniture Inventory Manager</Link>
        <nav>
          <Link to="/inventoryManager">Início</Link>
          <Link to="/inventoryManager/items">Items</Link>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
      <footer>
        Copyright © Welligthon Darlan.
      </footer>
    </>
  )
}