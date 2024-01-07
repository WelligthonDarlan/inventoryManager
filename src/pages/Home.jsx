import { BarChart } from "../components/BarChart";
import useStock from "../hooks/useStock"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const { items } = useStock()

  const [sortTypeRecent, setSortTypeRecent] = useState(null);
  const [sortDirectionRecent, setSortDirectionRecent] = useState("▲");

  const [sortTypeLow, setSortTypeLow] = useState(null);
  const [sortDirectionLow, setSortDirectionLow] = useState("▲");

  const handleSortRecentItems = (type) => {
    if (sortTypeRecent === type) {
      setSortDirectionRecent((prevDirection) =>
        prevDirection === "▲" ? "▼" : "▲"
      );
    } else {
      setSortTypeRecent(type);
      setSortDirectionRecent("▲");
    }
  };
  const handleSortlowQuantityItems = (type) => {
    if (sortTypeLow === type) {
      setSortDirectionLow((prevDirection) =>
        prevDirection === "▲" ? "▼" : "▲"
      );
    } else {
      setSortTypeLow(type);
      setSortDirectionLow("▲");
    }
  };

  const diversity = items.length
  const inventoryTotal = items.reduce((sum, item) => +sum + +item.quantity, 0)
  const today = new Date()
  const limitDate = new Date()
  limitDate.setDate(limitDate.getDate() - 2)
  const recentItems = items.filter((item) => item.createdAt >= limitDate && item.createdAt <= today)
  const recentTotal = recentItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const sortedItemsRecent = [...recentItems].sort((a, b) => {
    if (sortTypeRecent === "quantity") {
      return sortDirectionRecent === "▲" ? a.quantity - b.quantity : b.quantity - a.quantity;
    } else if (sortTypeRecent === "category" || sortTypeRecent === "name") {
      return sortDirectionRecent === "▲" ? a[sortTypeRecent].localeCompare(b[sortTypeRecent]) : b[sortTypeRecent].localeCompare(a[sortTypeRecent]);
    }
    return 0;
  });

  const lowQuantityItems = items.filter((item) => item.quantity < 10)
  const lowQuantityTotal = lowQuantityItems.reduce((total, item) => {
    return total + item.quantity;

  }, 0);
  const sortedItemsloW = [...lowQuantityItems].sort((a, b) => {
    if (sortTypeLow === "quantity") {
      return sortDirectionLow === "▲" ? a.quantity - b.quantity : b.quantity - a.quantity;
    } else if (sortTypeLow === "category" || sortTypeLow === "name") {
      return sortDirectionLow === "▲" ? a[sortTypeLow].localeCompare(b[sortTypeLow]) : b[sortTypeLow].localeCompare(a[sortTypeLow]);
    }
    return 0;
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="dashboard-card">
          Diversidade de itens
          <span>{diversity}</span>
        </div>
        <div className="dashboard-card">
          Inventário total
          <span>{inventoryTotal}</span>
        </div>
        <div className="dashboard-card recentt">
          Itens recentes
          <span>{recentTotal}</span>
        </div>
        <div className="dashboard-card ending">
          Itens acabando
          <span>{lowQuantityTotal}</span>
        </div>
      </div>

      <div className="chartContainer">
        <BarChart />
      </div>
      
      <div className="row">
        <div className="recent">
          <table>
            <thead>
              <tr>
                <th>
                  Itens Recentes
                  <button 
                  className="btnSort"
                  onClick={() => handleSortRecentItems("name")}
                  >
                  {sortTypeRecent === "name" && `${sortDirectionRecent === "▲" ? "▲" : "▼"}`}
                  </button>
                </th>

                <th>
                  Quantidade
                  <button 
                  className="btnSort"
                  onClick={() => handleSortRecentItems("quantity")}
                  >
                  {sortTypeRecent === "quantity" && `${sortDirectionRecent === "▲" ? "▲" : "▼"}`}
                  </button>
                </th>

                <th>
                  Categoria
                  <button 
                  className="btnSort"
                  onClick={() => handleSortRecentItems("category")}
                  >
                  {sortTypeRecent === "category" && `${sortDirectionRecent === "▲" ? "▲" : "▼"}`}
                  </button>
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
            {sortedItemsRecent.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity} unid.</td>
                  <td>{item.category}</td>
                  <td><Link to={`/inventoryManager/items/${item.id}`} className="button is-small">Ver</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="low">
          <table>
            <thead>
              <tr>
                <th>
                  Itens Acabando
                  <button 
                  className="btnSort"
                  onClick={() => handleSortlowQuantityItems("name")}
                  >
                  {sortTypeLow === "name" && `${sortDirectionLow === "▲" ? "▲" : "▼"}`}
                  </button>
                </th>
                
                <th>
                  Quantidade
                  <button 
                  className="btnSort"
                  onClick={() => handleSortlowQuantityItems("quantity")}
                  >
                  {sortTypeLow === "quantity" && `${sortDirectionLow === "▲" ? "▲" : "▼"}`}
                  </button>
                </th>

                <th>
                  Categoria
                  <button 
                  className="btnSort"
                  onClick={() => handleSortlowQuantityItems("category")}
                  >
                  {sortTypeLow === "category" && `${sortDirectionLow === "▲" ? "▲" : "▼"}`}
                  </button>
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedItemsloW.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity} unid.</td>
                  <td>{item.category}</td>
                  <td><Link to={`/inventoryManager/items/${item.id}`} className="button is-small">Ver</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </main>
  )
}