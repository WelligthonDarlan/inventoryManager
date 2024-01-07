import { Link, useParams } from "react-router-dom";
import useStock from "../../hooks/useStock";
import DeleteButton from "../../components/DeleteButton";

export default function ShowItem() {
  const { getItem } = useStock();
  const { id } = useParams();
  const item = getItem(id);

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false // Para usar formato de 24 horas
    }).format(date);
  };

  return (
    <div className="item">
      <h2 className="titleItem">{item.name}</h2>
      
      <div className="itemInformation">
        <hr />
        <p><b>Descrição:</b><div className="spanDescription">{item.description}</div></p>
        <hr />
        <p><b>Id:</b> {item.id}</p>
        <p><b>Preço:</b> R$ {item.price}</p>
        <p><b>Categoria:</b> {item.category}</p>
        <p><b>Quantidade em estoque:</b> {item.quantity}</p>
        <p><b>Cadastrado em:</b> {formatDateTime(item.createdAt)}</p>
        <p><b>Atualizado em:</b> {formatDateTime(item.updatedAt)}</p>
      </div>
      <div className="showItemBtn">
        <Link to={`/inventoryManager/items/${item.id}/update`} className="button is-small">
          Atualizar
        </Link>
        <DeleteButton itemId={item.id} itemName={item.name} />
      </div>
    </div>
  );
}

