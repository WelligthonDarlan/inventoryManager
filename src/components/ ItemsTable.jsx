import { useState } from "react";
import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import DeleteButton from "./DeleteButton";

export default function ItemsTable() {
  const { items } = useStock();

  // Estado local para rastrear tipo de ordenação e direção
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("▲");

  // Função para manipular a ordenação
  const handleSort = (type) => {
    // Se o tipo de ordenação for o mesmo, inverter a direção
    if (sortType === type) {
      setSortDirection((prevDirection) =>
        prevDirection === "▲" ? "▼" : "▲"
      );
    } else {
      // Se o tipo de ordenação for diferente, definir novo tipo e direção ascendente
      setSortType(type);
      setSortDirection("▲");
    }
  };

  // Função para ordenar os itens com base no tipo e direção
  const sortedItems = [...items].sort((a, b) => {
    if (sortType === "quantity") {
      return sortDirection === "▲" ? a.quantity - b.quantity : b.quantity - a.quantity;
    } else if (sortType === "category" || sortType === "name") {
      return sortDirection === "▲" ? a[sortType].localeCompare(b[sortType]) : b[sortType].localeCompare(a[sortType]);
    }
    // Se nenhum tipo de ordenação for especificado, não alterar a ordem
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>

          <th>
            Nome
            <button 
            className="btnSort"
            onClick={() => handleSort("name")}
            >
            {sortType === "name" && `${sortDirection === "▲" ? "▲" : "▼"}`}
            </button>
          </th>

          <th>
            Quantidade
            <button 
            className="btnSort"
            onClick={() => handleSort("quantity")}
            >
            {sortType === "quantity" && `${sortDirection === "▲" ? "▲" : "▼"}`}
            </button>
          </th>

          <th>
            Categoria
            <button 
            className="btnSort"
            onClick={() => handleSort("category")}
            >
            {sortType === "category" && `${sortDirection === "▲" ? "▲" : "▼"}`}
            </button>
          </th>
          <th>Ações</th>
        </tr>

      </thead>
      <tbody>
        {sortedItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity} unid.</td>
            <td>{item.category}</td>
            <td>
              <Link to={`/items/${item.id}`} className="button is-primary is-small">
                Ver
              </Link>
              <Link to={`/items/${item.id}/update`} className="button is-small">
                Atualizar
              </Link>
              <DeleteButton itemId={item.id} itemName={item.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
